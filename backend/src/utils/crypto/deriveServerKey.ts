import crypto from "crypto"

const ITERATIONS = 310000
const KEY_LENGTH = 32
const DIGEST = "sha256"


export const deriveServerKey = (masterSecret: string): Buffer => {
    const salt = "peel-talk-@17-june-2025";

    return crypto.pbkdf2Sync(
        masterSecret,
        salt,
        ITERATIONS,
        KEY_LENGTH,
        DIGEST
    )
}
