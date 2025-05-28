import { Server, Socket } from "socket.io";
import { handleFindPartner } from "../controllers/chat.controller";


export default function registerChatHandlers(io: Server, socket: Socket) {
    console.log("📥 Chat socket ready for:",socket.id);

    socket.on("find:partner", (data) => {
        console.log("🔍 Find partner request received:", data);
        handleFindPartner(io, socket, data);
    });

    socket.on("chat:message",(data) =>{
        console.log("📨 Message received:", data);

        const messageWithTimestamp = {
        ...data,
        timeStamp: new Date().toISOString(), // ✅ Add server-side timestamp
        };

        io.to(data.roomId).emit("chat:message", messageWithTimestamp);
    });

    socket.on("disconnect", () => {
    console.log("❌ Chat user disconnected:", socket.id);
    });
}
