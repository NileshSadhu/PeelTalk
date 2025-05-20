import { Router } from "express";
import { userRouter } from "./user";


export const mainRouter = Router();

mainRouter.use('/user',userRouter)

