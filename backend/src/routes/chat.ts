import { RequestHandler, Router } from "express";
import { getMessages } from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth.middleware";

export const chatRouter = Router();

chatRouter.get("/messages/:conversationId",authenticate , getMessages as unknown as RequestHandler);

