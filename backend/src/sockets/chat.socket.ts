import { Server, Socket } from "socket.io";


export default function registerChatHandlers(io: Server, socket: Socket) {
    console.log("📥 Chat socket ready for:",socket.id);

    socket.on("chat:message",(data) =>{
        console.log("📨 Message received:", data);


        io.to(data.roomId).emit("chat:message", data);
    });

    socket.on("disconnect", () => {
    console.log("❌ Chat user disconnected:", socket.id);
    });
}
