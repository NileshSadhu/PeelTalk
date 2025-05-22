import express from "express";
import { mainRouter } from "./routes";
import cookieParser from "cookie-parser";

export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',mainRouter);

