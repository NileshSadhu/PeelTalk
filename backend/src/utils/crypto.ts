import crypto from "crypto";


const algorithm = "aes-256-cbc";


export const encryptText = (text: string, keyHex: string) =>{
    const key = Buffer.from(keyHex, "hex");
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encrypted };
}


export const decryptText = (ivHex: string, encrypted: string, keyHex: string) => {
    const key = Buffer.from(keyHex, "hex");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};