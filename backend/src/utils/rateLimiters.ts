import { RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import redis from "../redis";


// IP Rate Limiter
export const createIpRateLimiter = (options?: {
    windowMinutes?: number;
    maxRequests?: number;
    message?: string;
}): RequestHandler =>{
    const windowMs = (options?.windowMinutes ?? 10) * 60 * 1000;
    const max = options?.maxRequests ?? 20;
    const message = options?.message ?? "Too many requests from this IP. Please try again later.";

    return rateLimit({
    windowMs,
    max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
    })
}


//Email Rate Limiter
export const otpRateLimitPerEmail = (options?:{
    maxAttempts?: number;
    windowSeconds?: number;
}): RequestHandler => {
    const max = options?.maxAttempts ?? 5;
    const ttl = options?.windowSeconds ?? 600;

    return async (req, res, next)=>{
        const email = req.body.email.toLowerCase().trim();
        if (!email){ res.status(400).json({ error: "Email is required." }); return;}

        const key = `otp_attempts:${email}`;
        const attempts = await redis.incr(key)
        if(attempts === 1){
            await redis.expire(key, ttl);
        }

        if(attempts > max) {
            res.status(429).json({
            message: "Too many OTP requests for this email. Please try again later.",
            });
            return;
        }
        next();
    };
};