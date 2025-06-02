


export const generateKeyPair = async():Promise<CryptoKeyPair> => {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    return keyPair;
}


export const exportPublicKey = async(key: CryptoKey):Promise<string> => {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}


export const exportPrivateKey = async(key: CryptoKey):Promise<string> => {
    const exported = await window.crypto.subtle.exportKey("pkcs8", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}


export const importPublicKey = async(spkiBase64: string): Promise<CryptoKey> => {
    const binary = Uint8Array.from(atob(spkiBase64), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "spki",
        binary,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
}


export const importPrivateKey = async(pkcs8Base64: string): Promise<CryptoKey> => {
    const binary = Uint8Array.from(atob(pkcs8Base64), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "pkcs8",
        binary,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}