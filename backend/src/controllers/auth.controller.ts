import { OAuth2Client } from "google-auth-library"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model"
import { getUniqueGuestUsername } from "../utils/username/getUniqueGuestUsername"
import { encryptWithServerKey } from "../utils/crypto/serverCrypto"
import { generateKeyPair } from "../utils/crypto/generateKeyPair"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const jwt_secret = process.env.JWT_SECRET!

export const googleAuth: RequestHandler = async (req, res) => {
    try {
        const { id_token } = req.body

        if (!id_token) {
        res.status(400).json({ message: "Missing Google token" })
        return
        }

        const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload()

        if (!payload?.email || !payload.sub) {
        res.status(401).json({ message: "Invalid Google token" })
        return
        }

        let user = await User.findOne({ email: payload.email })

        // ─────────────────────────────────────────────
        // EXISTING USER → SIGN IN
        // ─────────────────────────────────────────────
        if (user) {
        // Security check: prevent account takeover
        if (user.googleId && user.googleId !== payload.sub) {
            res.status(403).json({
            message: "Google account mismatch",
            })
            return
        }

        // First-time Google link
        if (!user.googleId) {
            user.googleId = payload.sub
            user.authProvider = "google"
            await user.save()
        }
        }

        // ─────────────────────────────────────────────
        // NEW USER → REGISTER
        // ─────────────────────────────────────────────
        if (!user) {
        const { publicKeyPem, privateKeyPem } = generateKeyPair()

        const encryptedPrivateKey = encryptWithServerKey(
            Buffer.from(privateKeyPem)
        )

        const username = await getUniqueGuestUsername()

        user = await User.create({
            email: payload.email,
            username,
            googleId: payload.sub,
            authProvider: "google",
            publicKey: publicKeyPem,
            encryptedPrivateKey,
        })
        }

        // ─────────────────────────────────────────────
        // ISSUE JWT
        // ─────────────────────────────────────────────
        const token = jwt.sign(
        { id: user._id, email: user.email },
        jwt_secret,
        { expiresIn: "7d" }
        )

        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
        message: "Authenticated successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.profilePhoto ?? null,
            authProvider: user.authProvider,
        },
        })

    } catch (err) {
        console.error("Google Auth Error:", err)
        res.status(500).json({ message: "Authentication failed" })
    }
}
