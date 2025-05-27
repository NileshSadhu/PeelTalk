import { Request,Response } from "express";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { Conversation } from "../models/conversation.model";
import { decryptText, encryptText } from "../utils/crypto";
import { Message } from "../models/message.model";


const waitingUsers : {socket: Socket, userId: string}[] = [];

export const handleFindPartner = async (io: Server, socket: Socket, userData: {userId: string}) => {
    if(waitingUsers.length > 0){
        const { socket: partnerSocket, userId: partnerId } = waitingUsers.pop()!;
        const roomId = `room-${socket.id}-${partnerSocket.id}`;
        socket.join(roomId)
        partnerSocket.join(roomId);

        const keyHex = crypto.randomBytes(32).toString("hex");

        const convo = await Conversation.create({
            user1Id: userData.userId,
            user2Id: partnerId,
            encryptedKeyUser1: keyHex,
            encryptedKeyUser2: keyHex
        });

        io.to(roomId).emit("partner:found",{
            roomId,
            conversationId: convo._id
        });
    }else{
        waitingUsers.push({ socket, userId: userData.userId });
    }
};


export const handleMessage = async(io: Server, socket: Socket, 
    {roomId,message,senderId,receiverId,conversationId,keyHex}:
    {roomId:string,message:string,senderId:string,receiverId:string,conversationId:string,keyHex:string}
    ) =>{
        const { encrypted, iv } = encryptText(message,keyHex);

        const saved = await Message.create({
            senderId,
            receiverId,
            content: encrypted,
            iv,
            conversationId,
        });

        io.to(roomId).emit("chat:message",{
            senderId,
            content: encrypted,
            iv,
            timeStamp: saved.createdAt
        })
};


export const getMessages = async (req:Request, res:Response): Promise<Response> => {
    try{
        const userId = req.userId;
        const conversationId = req.params.conversationId;
        const decryptedConversationKey = req.body.decryptedKey;

        if (!decryptedConversationKey) {
            return res.status(400).json({ message: "Decryption key missing." });
        }

        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

        const decryptedMessages = messages.map((msg) => ({
            _id: msg._id,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: decryptText(msg.iv, msg.content, decryptedConversationKey),
            createdAt: msg.createdAt,
        }));

        return res.status(200).json({
            message: "Messages retrieved successfully.",
            messages: decryptedMessages,
        });
    }catch(error){
        console.error("Error in getMessages:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}