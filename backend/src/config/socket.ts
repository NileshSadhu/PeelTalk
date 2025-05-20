import { Server } from "socket.io";



export const setupSocket = (io:Server) =>{
    io.on("connection", (socket)=>{
        console.log("🔌 User connected:", socket.id);
    })
}