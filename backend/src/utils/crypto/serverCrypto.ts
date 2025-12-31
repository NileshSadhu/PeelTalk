import crypto from "crypto"
import { deriveServerKey } from "./deriveServerKey"

const ALGO = "aes-256-gcm"

// Derived once, reused everywhere
const SERVER_KEY = deriveServerKey(process.env.SERVER_MASTER_SECRET!)

export const encryptWithServerKey = (data: Buffer) => {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv(ALGO, SERVER_KEY, iv)

    const encrypted = Buffer.concat([
        cipher.update(data),
        cipher.final(),
    ])

    return {
        cipher: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        tag: cipher.getAuthTag().toString("base64"),
    }
}

export const decryptWithServerKey = (payload: {
    cipher: string
    iv: string
    tag: string
}) => {
    const decipher = crypto.createDecipheriv(
        ALGO,
        SERVER_KEY,
        Buffer.from(payload.iv, "base64")
    )

    decipher.setAuthTag(Buffer.from(payload.tag, "base64"))

    return Buffer.concat([
        decipher.update(Buffer.from(payload.cipher, "base64")),
        decipher.final(),
    ])
}
