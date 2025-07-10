import { Server, Socket } from "socket.io";
import { handleCancelSearch, handleDisconnect, handleFindPartner, handleMessage } from "../controllers/chat.controller";
import redis from "../redis";
import { sendDiscordMessage } from "../utils/webhookNotify";


export default function registerChatHandlers(io: Server, socket: Socket) {
    console.log("📥 Chat socket ready for:",socket.id);

    socket.on("find:partner", async(data) => {
        await sendDiscordMessage(`🔍 A user is looking for a chat partner (socket ID: ${data.userId})`);

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


    socket.on("search:cancel", () => handleCancelSearch(socket));


    socket.on("chat:reaction", ({ roomId, messageId, senderId, reaction }) => {
        io.to(roomId).emit("chat:reaction", {
            messageId,
            senderId,
            reaction,
        });
    });


    socket.on("partner:typing", async () => {
    const partnerSocketId = await redis.get(`partner:${socket.id}`);
    if (partnerSocketId) {
        const partnerSocket = io.sockets.sockets.get(partnerSocketId);
        if (partnerSocket) {
            partnerSocket.emit("partner:typing");
        }
    }
    });

    socket.on("partner:stopTyping", async () => {
        const partnerSocketId = await redis.get(`partner:${socket.id}`);
        if (partnerSocketId) {
            const partnerSocket = io.sockets.sockets.get(partnerSocketId);
            if (partnerSocket) {
                partnerSocket.emit("partner:stopTyping");
            }
        }
    });

    socket.on("disconnect", async () => {
        await handleDisconnect(io, socket);
    });

}