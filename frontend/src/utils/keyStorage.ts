import { importPublicKeyFromBase64 } from "./aesUtils.ts";
import { getUserKeysFromIndexedDB } from "./indexedDbUtils.ts";

let inMemoryPrivateKey: CryptoKey | null = null;

const LOCAL_PRIVATE_KEY = "decryptedPrivateKey";
const LOCAL_PARTNER_PUBLIC_KEY = "partnerPublicKey";

export const KeyStorageService = {
    // PRIVATE KEY (your decrypted RSA key)
    setInMemoryKey(key: CryptoKey) {
        inMemoryPrivateKey = key;
    },

    getInMemoryKey(): CryptoKey | null {
        return inMemoryPrivateKey;
    },

    clearInMemoryKey() {
        inMemoryPrivateKey = null;
    },

    async setPrivateKeyToLocalStorage(key: CryptoKey) {
        const exported = await crypto.subtle.exportKey("pkcs8", key);
        const base64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
        localStorage.setItem(LOCAL_PRIVATE_KEY, base64);
    },

    async getPrivateKeyFromLocalStorage(): Promise<CryptoKey | null> {
        const base64 = localStorage.getItem(LOCAL_PRIVATE_KEY);
        if (!base64) return null;

        try {
            const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
            return await crypto.subtle.importKey(
                "pkcs8",
                binary,
                { name: "RSA-OAEP", hash: "SHA-256" },
                true,
                ["decrypt"]
            );
        } catch (err) {
            console.error("Failed to import private key from localStorage:", err);
            return null;
        }
    },

    clearPrivateKeyFromLocalStorage() {
        localStorage.removeItem(LOCAL_PRIVATE_KEY);
    },

    // PUBLIC KEY of partner (used to encrypt messages)
    setPartnerPublicKey(keyBase64: string) {
        localStorage.setItem(LOCAL_PARTNER_PUBLIC_KEY, keyBase64);
    },

    async getPartnerPublicKey(): Promise<CryptoKey | null> {
        const base64 = localStorage.getItem(LOCAL_PARTNER_PUBLIC_KEY);
        if (!base64) return null;

        try {
            return await importPublicKeyFromBase64(base64);
        } catch (err) {
            console.error("Failed to import partner's public key:", err);
            return null;
        }
    },

    clearPartnerPublicKey() {
        localStorage.removeItem(LOCAL_PARTNER_PUBLIC_KEY);
    },

    async getMyPublicKey(): Promise<CryptoKey | null> {
        const keys = await getUserKeysFromIndexedDB();
        if (!keys?.publicKey) return null;
        return await importPublicKeyFromBase64(keys.publicKey);
    },

    clearAll() {
        this.clearInMemoryKey();
        this.clearPrivateKeyFromLocalStorage();
        this.clearPartnerPublicKey();
    }
};
