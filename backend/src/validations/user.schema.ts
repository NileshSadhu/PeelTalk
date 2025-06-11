import { z } from "zod";


export const signupSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(8),
    publicKey: z.string(),
    encryptedPrivateKey: z.object({
        cipher: z.string().regex(/^[\w+/=]+$/, "Invalid private key cipher"),
        iv: z.string().regex(/^[\w+/=]+$/, "Invalid private key IV"),
        salt: z.string().regex(/^[\w+/=]+$/, "Invalid private key salt"),
    })
});

export const loginSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8)
});

export const passwordResetSchema = z.object({
    email: z.string().email(),
    Newpassword: z.string().min(8),
    publicKey: z.string(),
    encryptedPrivateKey: z.object({
        cipher: z.string().regex(/^[\w+/=]+$/, "Invalid private key cipher"),
        iv: z.string().regex(/^[\w+/=]+$/, "Invalid private key IV"),
        salt: z.string().regex(/^[\w+/=]+$/, "Invalid private key salt"),
    })
});

export const updateUserSchema = z.object({
    firstname: z.string().min(1).optional(),
    lastname: z.string().min(1).optional(),
    email: z.string().email().optional(),
    username: z.string().min(3).optional(),
    age: z.string().min(1).optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional()
});