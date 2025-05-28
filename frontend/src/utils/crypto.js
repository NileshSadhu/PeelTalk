export async function encryptText(text, keyHex) {
    const keyBuffer = hexToArrayBuffer(keyHex);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM IV must be 12 bytes

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

    // Utility functions
    function hexToArrayBuffer(hex) {
    const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
    return typedArray.buffer;
    }

    function arrayBufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    }


export async function decryptText(ivHex, encryptedHex, keyHex) {
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