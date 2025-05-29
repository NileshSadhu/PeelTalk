import { Server, Socket } from "socket.io";
import { handleFindPartner, handleMessage } from "../controllers/chat.controller";


export default function registerChatHandlers(io: Server, socket: Socket) {
    console.log("📥 Chat socket ready for:",socket.id);

    socket.on("find:partner", (data) => {
        handleFindPartner(io, socket, data);
    });

    socket.on("chat:message",async(data) =>{
        try{
            await handleMessage(io,data);
        }catch(error){
            console.error("❌ Error handling chat:message", error);
            socket.emit("chat:error", { error: "Message failed to send" });
        }
    });

    socket.on("disconnect", () => {
    console.log("❌ Chat user disconnected:", socket.id);
    });
}
