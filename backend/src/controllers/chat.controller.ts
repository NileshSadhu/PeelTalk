import { Request,Response } from "express";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";


const waitingUsers : {socket: Socket, userId: string}[] = [];

export const handleFindPartner = async (io: Server, socket: Socket, userData: {userId: string}) => {
    console.log('waitingUsers BEFORE:', waitingUsers.map(u => u.userId));
    if(waitingUsers.length > 0){
        const { socket: partnerSocket, userId: partnerId } = waitingUsers.pop()!;
        
        console.log('Popped partner:', partnerId);
        console.log('waitingUsers AFTER pop:', waitingUsers.map(u => u.userId));

        const roomId = `room-${socket.id}-${partnerSocket.id}`;
        socket.join(roomId)
        partnerSocket.join(roomId);

        console.log('Rooms for socket:', socket.id, Array.from(socket.rooms));
        console.log('Rooms for partnerSocket:', partnerSocket.id, Array.from(partnerSocket.rooms));

        const keyHex = crypto.randomBytes(32).toString("hex");

        const convo = await Conversation.create({
            user1Id: userData.userId,
            user2Id: partnerId,
            encryptedKeyUser1: keyHex,
            encryptedKeyUser2: keyHex
        });

        io.to(roomId).emit("partner:found",{
            roomId,
            conversationId: convo._id,
            partnerId
        });
    }else{
        waitingUsers.push({ socket, userId: userData.userId });
    }
};


export const handleMessage = async(io: Server, socket: Socket, 
    {roomId,message,senderId,receiverId,conversationId,iv}:
    {roomId:string,message:string,senderId:string,receiverId:string,conversationId:string,iv:string}
    ) =>{

        const saved = await Message.create({
            senderId,
            receiverId,
            content: message,
            iv,
            conversationId,
        });

        io.to(roomId).emit("chat:message",{
            senderId,
            content: message,
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

        const convo = await Conversation.findById(conversationId);
        if (!convo || (!convo.user1Id.equals(userId) && !convo.user2Id.equals(userId))) {
            return res.status(403).json({ message: "Unauthorized access to conversation." });
        }

        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

        const encryptedMessages = messages.map((msg) => ({
            _id: msg._id,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: msg.content,
            createdAt: msg.createdAt,
        }));

        return res.status(200).json({
            message: "Messages retrieved successfully.",
            messages: encryptedMessages,
        });
    }catch(error){
        console.error("Error in getMessages:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}