import { Server } from "socket.io";
import registerChatHandlers from "../sockets/chat.socket";



export const setupSocket = (io:Server) =>{
    io.on("connection", (socket)=>{
        console.log("🔌 New socket connection:", socket.id);
        registerChatHandlers(io, socket);
    });
};