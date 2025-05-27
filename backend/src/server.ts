import { createServer } from "node:http";
import { Server } from "socket.io";
import { setupSocket } from "./config/socket";
import { app } from "./app";
import { connectDB } from "./db";
import dotenv from "dotenv";


dotenv.config();

const port = process.env.PORT || 3000;

const server = createServer(app);

connectDB();    // database connection


const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
    }
});

setupSocket(io);

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})