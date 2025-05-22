import express from "express";
import { mainRouter } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";


export const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',mainRouter);

