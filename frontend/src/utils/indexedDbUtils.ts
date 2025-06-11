import { openDB } from "idb";

const DB_NAME = "SecureChatDB";
const STORE_NAME = "UserKeys";

interface StoredUserKeys {
    publicKey: string;
    encryptedPrivateKey: string;
}

export async function storeUserKeysInIndexedDB(data: StoredUserKeys): Promise<void> {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
        }
        }
    });

    await db.put(STORE_NAME, data.publicKey, "publicKey");
    await db.put(STORE_NAME, data.encryptedPrivateKey, "encryptedPrivateKey");
}

export async function getUserKeysFromIndexedDB(): Promise<StoredUserKeys | null> {
    const db = await openDB(DB_NAME, 1);
    const publicKey = await db.get(STORE_NAME, "publicKey");
    const encryptedPrivateKey = await db.get(STORE_NAME, "encryptedPrivateKey");

    if (publicKey && encryptedPrivateKey) {
        return { publicKey, encryptedPrivateKey };
    }

    return null;
}

export async function clearUserKeysFromIndexedDB(): Promise<void> {
    const db = await openDB(DB_NAME, 1);
    await db.delete(STORE_NAME, "publicKey");
    await db.delete(STORE_NAME, "encryptedPrivateKey");
}