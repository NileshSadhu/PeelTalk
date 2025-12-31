

export async function encryptPrivateKeyDeviceBased(privateKey: CryptoKey) {
  // Generate device-bound AES key
    const aesKey = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    )

    // Initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Export private key (PKCS8)
    const exportedPrivateKey = await crypto.subtle.exportKey(
        "pkcs8",
        privateKey
    )

    // Encrypt private key
    const cipherBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        aesKey,
        exportedPrivateKey
    )

    // Export AES key (store locally, NEVER send to backend)
    const exportedAesKey = await crypto.subtle.exportKey("raw", aesKey)

    return {
        cipher: bufferToBase64(cipherBuffer),
        iv: bufferToBase64(iv),
        localKey: bufferToBase64(exportedAesKey), // store in IndexedDB
    }
}

/* ---------------- helpers ---------------- */

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
    let binary = ""
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    return btoa(binary)
}
