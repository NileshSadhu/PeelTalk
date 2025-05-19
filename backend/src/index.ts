import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const port = process.env.PORT

const app = express();
const server = createServer(app);
const io = new Server(server)


io.on('connection',(socket)=>{
    console.log('a user connected socket: ',socket);
})


server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})