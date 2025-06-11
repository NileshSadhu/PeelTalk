

export const deriveKeyFromPassword = async (
    password: string,
    salt: Uint8Array
): Promise<CryptoKey> => {
    const encoder = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return await crypto.subtle.deriveKey(
        {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
};
