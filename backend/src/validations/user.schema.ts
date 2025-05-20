import { z } from "zod";


export const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(7)
})

export const loginSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(7)
})