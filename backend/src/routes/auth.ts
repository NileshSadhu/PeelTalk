import { Router } from 'express';
import { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
        res.status(401).json({ message: 'Invalid Google token' });
        return;
        }

        const { email, name, picture, sub } = payload;

        let user = await User.findOne({ email });

        if (!user) {
        user = await User.create({
            email,
            name,
            googleId: sub,
            avatar: picture,
            provider: 'google',
        });
        }

        const jwtToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
        );

        res.json({ token: jwtToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Google auth failed' });
    }
});

export default router;
