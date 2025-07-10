import { Request,Response } from "express";
import { Server, Socket } from "socket.io";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";
import redis from "../redis";
import { User } from "../models/user.model";



export const handleFindPartner = async (io: Server, socket: Socket, userData: { userId: string, username: string }) => {
    await redis.set(`socket:${socket.id}:user`, userData.userId);

    let data: string | null;

    while ((data = await redis.rpop("waitingUsers")) !== null) {
        const { socketId: partnerSocketId, userId: partnerId, username: partnerUsername } = JSON.parse(data);

        if (partnerId === userData.userId) continue;

        const partnerSocket = io.sockets.sockets.get(partnerSocketId);
        if (!partnerSocket) {
            await redis.srem("waitingUsers:set", partnerId);
            continue;
        }

        const roomId = `room-${socket.id}-${partnerSocket.id}`;
        socket.join(roomId);
        partnerSocket.join(roomId);

        await redis.set(`user:${userData.userId}:socket`, socket.id);
        await redis.set(`user:${partnerId}:socket`, partnerSocket.id);
        await redis.set(`partner:${socket.id}`, partnerSocket.id);
        await redis.set(`partner:${partnerSocket.id}`, socket.id);

        await redis.srem("waitingUsers:set", userData.userId);
        await redis.srem("waitingUsers:set", partnerId);

        const isGuest1 = userData.userId.startsWith("guest-");
        const isGuest2 = partnerId.startsWith("guest-");

        let convo = null;
        if (!isGuest1 && !isGuest2) {
            convo = await Conversation.findOneAndUpdate(
                {
                    $or: [
                        { user1Id: userData.userId, user2Id: partnerId },
                        { user1Id: partnerId, user2Id: userData.userId },
                    ],
                },
                {
                    $setOnInsert: {
                        user1Id: userData.userId,
                        user2Id: partnerId,
                    },
                },
                {
                    new: true,
                    upsert: true,
                }
            );
        }

        const currentUser = isGuest1
            ? { username: userData.username, profilePhoto: null, publicKey: null }
            : await User.findById(userData.userId).select("username profilePhoto publicKey");

        const partnerUser = isGuest2
            ? { username: partnerUsername, profilePhoto: null, publicKey: null }
            : await User.findById(partnerId).select("username profilePhoto publicKey");

        socket.emit("partner:found", {
            roomId,
            conversationId: convo?._id ?? null,
            partnerId,
            partnerProfile: {
                username: partnerUser?.username,
                profilePhoto: partnerUser?.profilePhoto,
            },
            publicKey: partnerUser?.publicKey ?? null,
        });

        partnerSocket.emit("partner:found", {
            roomId,
            conversationId: convo?._id ?? null,
            partnerId: userData.userId,
            partnerProfile: {
                username: currentUser?.username,
                profilePhoto: currentUser?.profilePhoto,
            },
            publicKey: currentUser?.publicKey ?? null,
        });

        if (convo) {
            socket.emit("chat:history", { conversationId: convo._id });
            partnerSocket.emit("chat:history", { conversationId: convo._id });
        }

        return;
    }

    const isAlreadyWaiting = await redis.sismember("waitingUsers:set", userData.userId);
    if (!isAlreadyWaiting) {
        await redis.lpush("waitingUsers", JSON.stringify({
            socketId: socket.id,
            userId: userData.userId,
            username: userData.username,
        }));
        await redis.sadd("waitingUsers:set", userData.userId);
        await redis.set(`user:${userData.userId}:socket`, socket.id);
    } else {
        const current = await redis.get(`user:${userData.userId}:socket`);
        if (current !== socket.id) {
            await redis.set(`user:${userData.userId}:socket`, socket.id);
        }
    }
};



export const handleMessage = async (
    io: Server,
    { roomId, content, senderId, receiverId, conversationId, messageId }:
    { roomId: string, content: string, senderId: string, receiverId: string, conversationId: string | null, messageId: string }
) => {
    const isGuest = senderId.startsWith("guest-") || receiverId.startsWith("guest-");

    if (isGuest || !conversationId) {
        io.to(roomId).emit("chat:message", {
            senderId,
            content,
            timeStamp: new Date(),
            messageId,
        });
        return;
    }

    // const saved = await Message.create({
    //     senderId,
    //     receiverId,
    //     content,
    //     conversationId,
    // });

    io.to(roomId).emit("chat:message", {
        senderId,
        content,
        timeStamp : new Date(),
        messageId,
    });
};



export const getMessages = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Missing user ID." });
        }

        if (userId.startsWith("guest-")) {
            return res.status(403).json({ message: "Guests cannot retrieve chat history." });
        }

        const conversationId = req.params.conversationId;
        const decryptedConversationKey = req.body.decryptedKey;

        if (!decryptedConversationKey) {
            return res.status(400).json({ message: "Decryption key missing." });
        }

        const convo = await Conversation.findById(conversationId);
        if (!convo || (!convo.user1Id.equals(userId) && !convo.user2Id.equals(userId))) {
            return res.status(403).json({ message: "Unauthorized access to conversation." });
        }

        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

        return res.status(200).json({
            message: "Messages retrieved successfully.",
            messages: messages.map((msg) => ({
                _id: msg._id,
                senderId: msg.senderId,
                receiverId: msg.receiverId,
                content: msg.content,
                createdAt: msg.createdAt,
            })),
        });
    } catch (error) {
        console.error("Error in getMessages:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export const handleDisconnect = async (io: Server, socket: Socket) => {
    const userId = await redis.get(`socket:${socket.id}:user`);

    if (userId) {
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
        const partnerUserId = await redis.get(`socket:${partnerSocketId}:user`);

        const partnerSocket = io.sockets.sockets.get(partnerSocketId);
        if (partnerSocket) {
        partnerSocket.emit("partner:disconnected");
        }

        await redis.del(`partner:${socket.id}`);
        await redis.del(`partner:${partnerSocketId}`);

        if (userId && partnerUserId && !userId.startsWith("guest-") && !partnerUserId.startsWith("guest-")) {
            const conversation = await Conversation.findOne({
                $or: [
                    { user1Id: userId, user2Id: partnerUserId },
                    { user1Id: partnerUserId, user2Id: userId },
                ],
            });

            if (conversation) {
                await Message.deleteMany({ conversationId: conversation._id });
            }
        }

    }
};


export const handleCancelSearch = async (socket: Socket) => {
    const userId = await redis.get(`socket:${socket.id}:user`);
    if (!userId) return;

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

    socket.emit("search:cancelled");
};



export const handleMessageReaction = (io: Server, socket: Socket) => {
    socket.on('message:reaction', async ({ roomId, messageId, senderId, reaction }) => {
        if (!senderId.startsWith("guest-") && messageId) {
            await Message.findByIdAndUpdate(messageId, { reaction });
        }

        io.to(roomId).emit('message:reaction:update', {
            messageId,
            reaction,
            senderId,
        });
    });
};