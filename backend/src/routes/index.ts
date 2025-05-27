import { Router } from "express";
import { userRouter } from "./user";
import { chatRouter } from "./chat";


export const mainRouter = Router();

mainRouter.use('/user',userRouter)
mainRouter.use('/chat',chatRouter)

