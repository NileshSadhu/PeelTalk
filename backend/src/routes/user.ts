import { RequestHandler, Router } from "express";
import {login, signup, verifySignup}  from "../controllers/user.controller";


export const userRouter = Router();


userRouter.post('/signup',signup as unknown as RequestHandler);

userRouter.post('/verifySignup',verifySignup as unknown as RequestHandler);

userRouter.post('/login',login as unknown as RequestHandler);