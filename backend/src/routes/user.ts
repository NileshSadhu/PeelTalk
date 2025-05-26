import { RequestHandler, Router } from "express";
import {forgotPassword, getUserDetails, login, resetPassword, signup, updateUserDetails, userLogout, verifySignup, verifyUser}  from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { createIpRateLimiter, otpRateLimitPerEmail } from "../utils/rateLimiters";


const otpRequestLimiter = createIpRateLimiter({
    windowMinutes: 10,
    maxRequests: 20,
    message: "Too many OTP requests from this IP, try again later.",
});

export const userRouter = Router();


userRouter.post('/signup',otpRequestLimiter, otpRateLimitPerEmail() ,signup as unknown as RequestHandler);

userRouter.post('/verifySignup',verifySignup as unknown as RequestHandler);

userRouter.post('/login',login as unknown as RequestHandler);

userRouter.post('/forgot-password',otpRequestLimiter, otpRateLimitPerEmail() ,forgotPassword as unknown as RequestHandler);

userRouter.put('/reset-password', resetPassword as unknown as RequestHandler);

userRouter.get('/verify',authenticate , verifyUser as unknown as RequestHandler);

userRouter.get('/userDetails',authenticate, getUserDetails as unknown as RequestHandler);

userRouter.put('/updateUserDetails',authenticate, updateUserDetails as unknown as RequestHandler);

userRouter.post('/logout',authenticate, userLogout as unknown as RequestHandler);