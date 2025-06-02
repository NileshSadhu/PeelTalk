


const DB_NAME = 'SecureChatKeys';
const STORE_NAME = 'PrivateKeys';


export const openDB = async():Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
            request.onupgradeneeded = () => {
            const db = request.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
            };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
});
}