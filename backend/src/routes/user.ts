import { RequestHandler, Router } from "express";
import {forgotPassword, getUserDetails, login, resetPassword, signup, updateUserDetails, verifySignup, verifyUser}  from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";


export const userRouter = Router();


userRouter.post('/signup',signup as unknown as RequestHandler);

userRouter.post('/verifySignup',verifySignup as unknown as RequestHandler);

userRouter.post('/login',login as unknown as RequestHandler);

userRouter.post('/forgot-password',forgotPassword as unknown as RequestHandler);

userRouter.put('/reset-password', resetPassword as unknown as RequestHandler);

userRouter.get('/verify',authenticate , verifyUser as unknown as RequestHandler);

userRouter.get('/userDetails',authenticate, getUserDetails as unknown as RequestHandler);

userRouter.put('/updateUserDetails',authenticate, updateUserDetails as unknown as RequestHandler);