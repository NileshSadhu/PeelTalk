import { openDB } from 'idb';

const DB_NAME = 'SecureChatKeys';
const STORE_NAME = 'PrivateKeys';

const getDb = () => openDB(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
        }
    }
});

export const savePrivateKeyToIndexedDb = async (userId: string, encryptedKey: string) => {
    const db = await getDb();
    await db.put(STORE_NAME, encryptedKey, userId);
};

export const getPrivateKeyFromIndexedDb = async (userId: string): Promise<string | undefined> => {
    const db = await getDb();
    return db.get(STORE_NAME, userId);
};

export const deletePrivateKeyFromIndexedDb = async (userId: string) => {
    const db = await getDb();
    await db.delete(STORE_NAME, userId);
};
