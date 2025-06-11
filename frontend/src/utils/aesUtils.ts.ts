export async function encryptText(
    text: string,
    aesKey: CryptoKey
    ): Promise<{ iv: string; encrypted: string }> {
    const iv = crypto.getRandomValues(new Uint8Array(12)); 

    const encodedText = new TextEncoder().encode(text);
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        aesKey,
        encodedText
    );

    return {
        iv: arrayBufferToHex(iv),
        encrypted: arrayBufferToHex(encryptedBuffer),
    };
}


export async function decryptText(
    ivHex: string,
    encryptedHex: string,
    aesKey: CryptoKey
    ): Promise<string> {
    const iv = hexToArrayBuffer(ivHex);
    const encryptedData = hexToArrayBuffer(encryptedHex);
    
    if (!iv || !encryptedData) {
        throw new Error('Invalid hex input for IV or encrypted content');
    }

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        aesKey,
        encryptedData
    );

    return new TextDecoder().decode(decryptedBuffer);
}



export function hexToArrayBuffer(hex: string): ArrayBuffer {
    if (!hex || typeof hex !== 'string') {
        throw new Error(`Invalid hex input: ${hex}`);
    }

    if (hex.length % 2 !== 0) {
        throw new Error(`Hex string must have even length: ${hex}`);
    }

    const match = hex.match(/[\da-f]{2}/gi);
    if (!match || match.join('') !== hex.toLowerCase()) {
        throw new Error(`Hex string contains invalid characters: ${hex}`);
    }

    const byteArray = new Uint8Array(match.map(h => parseInt(h, 16)));
    return byteArray.buffer;
}


function arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}


export function strToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}


export const encryptPrivateKeyWithPassword = async (
    privateKey: CryptoKey,
    password: string
): Promise<{ cipher: string; iv: string; salt: string }> => {
  // Export the private key
    const exportedKey = await crypto.subtle.exportKey("pkcs8", privateKey);

    // Generate salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Derive AES key from password
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
    const aesKey = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    // Encrypt the private key
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, exportedKey);

    return {
        cipher: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        iv: btoa(String.fromCharCode(...iv)),
        salt: btoa(String.fromCharCode(...salt)),
    };
};



export const base64ToUint8Array = (base64: string): Uint8Array =>{
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}


export const decryptPrivateKeyWithPassword = async (
    encrypted: string,
    password: string,
    ivBase64: string,
    saltBase64: string
): Promise<CryptoKey> => {
    const dec = new TextEncoder();

    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
    const salt = Uint8Array.from(atob(saltBase64), c => c.charCodeAt(0));
    const encryptedBuffer = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));

    // Derive key again from password + salt
    const keyMaterial = await crypto.subtle.importKey("raw", dec.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
    const aesKey = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"]
    );

    // Decrypt the private key
    const decryptedKeyBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, aesKey, encryptedBuffer);

    return await crypto.subtle.importKey("pkcs8", decryptedKeyBuffer, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["decrypt"]);
};



export const importPublicKeyFromBase64 = async(base64: string): Promise<CryptoKey> => {
    const binaryDer = Uint8Array.from(atob(base64), char => char.charCodeAt(0)).buffer;

    const key = await crypto.subtle.importKey(
    'spki', 
    binaryDer,
    {
    name: 'RSA-OAEP',
    hash: 'SHA-256',
    },
    true,
    ['encrypt']
    );

    return key;
}