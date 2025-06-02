export async function encryptText(
    text: string,
    keyHex: string
    ): Promise<{ iv: string; encrypted: string }> {
    const keyBuffer = hexToArrayBuffer(keyHex);
    const iv = crypto.getRandomValues(new Uint8Array(12)); 

    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );

    const encodedText = new TextEncoder().encode(text);
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
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
    keyHex: string
    ): Promise<string> {
    const keyBuffer = hexToArrayBuffer(keyHex);
    const iv = hexToArrayBuffer(ivHex);
    const encryptedData = hexToArrayBuffer(encryptedHex);

    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    return new TextDecoder().decode(decryptedBuffer);
}


export function hexToArrayBuffer(hex: string): ArrayBuffer {
    if (!hex || typeof hex !== 'string') {
        throw new Error('Invalid hex string');
    }

    if (hex.length % 2 !== 0) {
        throw new Error('Hex string must have an even length');
    }

    const match = hex.match(/[\da-f]{2}/gi);
    if (!match) {
        throw new Error('Hex string contains invalid characters');
    }

    const byteArray = new Uint8Array(match.map(h => parseInt(h, 16)));
    return byteArray.buffer;
}


function arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
