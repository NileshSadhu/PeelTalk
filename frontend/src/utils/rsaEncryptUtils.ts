


export const encryptWithPublicKey = async (data: ArrayBuffer, publicKey: CryptoKey): Promise<ArrayBuffer> => {
    return await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        data
    );
}


export const decryptWithPrivateKey = async (encrypted: ArrayBuffer, privateKey: CryptoKey): Promise<ArrayBuffer> => {
    return await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encrypted
    );
}