import { RequestHandler, Router } from "express";
import {forgotPassword, login, resetPassword, signup, verifySignup}  from "../controllers/user.controller";


export const userRouter = Router();


userRouter.post('/signup',signup as unknown as RequestHandler);

userRouter.post('/verifySignup',verifySignup as unknown as RequestHandler);

userRouter.post('/login',login as unknown as RequestHandler);

userRouter.post('/forgot-password',forgotPassword as unknown as RequestHandler);

userRouter.put('/reset-password', resetPassword as unknown as RequestHandler);