import express from "express";
import { mainRouter } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';


dotenv.config();

export const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1',mainRouter);

