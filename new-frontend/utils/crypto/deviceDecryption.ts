

export async function decryptPrivateKeyDeviceBased(
    encryptedPrivateKey: {
        cipher: string
        iv: string
    },
    localKeyBase64: string
    ): Promise<CryptoKey> {

    const aesKeyRaw = base64ToBuffer(localKeyBase64)
    const aesKey = await crypto.subtle.importKey(
        "raw",
        aesKeyRaw,
        "AES-GCM",
        true,
        ["decrypt"]
    )

    const decryptedPkcs8 = await crypto.subtle.decrypt(
        {
        name: "AES-GCM",
        iv: base64ToBuffer(encryptedPrivateKey.iv),
        },
        aesKey,
        base64ToBuffer(encryptedPrivateKey.cipher)
    )

    return crypto.subtle.importKey(
        "pkcs8",
        decryptedPkcs8,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    )
}

/* helpers */

function base64ToBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
}
