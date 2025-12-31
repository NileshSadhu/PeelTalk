

export async function generateKeyPair() {
    const keyPair = await crypto.subtle.generateKey(
        {
        name: "RSA-OAEP",
        modulusLength: 4096, // strong but still practical
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    )

    return {
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
    }
}

/**
 * Exports public key as Base64 string (SPKI).
 * Safe to send to backend.
 */
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
    const spkiBuffer = await crypto.subtle.exportKey("spki", publicKey)
    return bufferToBase64(spkiBuffer)
}

/**
 * (Optional but recommended)
 * Export private key (PKCS8) — usually only used internally.
 */
export async function exportPrivateKey(privateKey: CryptoKey): Promise<string> {
    const pkcs8Buffer = await crypto.subtle.exportKey("pkcs8", privateKey)
    return bufferToBase64(pkcs8Buffer)
}

/* ---------------- helpers ---------------- */

function bufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    let binary = ""
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    return btoa(binary)
}
