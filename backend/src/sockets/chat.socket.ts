import { Server, Socket } from "socket.io";
import { handleFindPartner, handleMessage } from "../controllers/chat.controller";
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


    socket.on("partner:cancel", async () => {
        const userId = await redis.get(`socket:${socket.id}:user`);
        if (userId) {
            await redis.lrem("waitingUsers", 0, JSON.stringify({ socketId: socket.id, userId }));
            await redis.srem("waitingUsers:set", userId);
            await redis.del(`socket:${socket.id}:user`);
            console.log(`🛑 User ${userId} cancelled partner search.`);
        }
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
        const userId = await redis.get(`socket:${socket.id}:user`);

        if(userId){
            await redis.srem("waitingUsers:set", userId);

            const waitingList = await redis.lrange("waitingUsers", 0, -1);
            const updatedList = waitingList.filter(item => {
                try {
                    const parsed = JSON.parse(item);
                    return parsed.userId !== userId;
                } catch {
                    return true;
                }
            });

            await redis.del("waitingUsers");
            if (updatedList.length > 0) {
                await redis.rpush("waitingUsers", ...updatedList);
            }

            await redis.del(`user:${userId}:socket`);
            await redis.del(`socket:${socket.id}:user`);
        }

        const partnerSocketId = await redis.get(`partner:${socket.id}`);
        if (partnerSocketId) {
            const partnerSocket = io.sockets.sockets.get(partnerSocketId);
            if (partnerSocket) {
                partnerSocket.emit("partner:disconnected");
            }

            await redis.del(`partner:${socket.id}`);
            await redis.del(`partner:${partnerSocketId}`);
        }
    })
}