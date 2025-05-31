import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Socket } from 'socket.io-client';
import { decryptText, encryptText } from '../utils/crypto';


interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}


interface UseChatProps {
    socket: Socket;
    userId: string;
    keyHex: string;
}


export const useChat = ({ socket, userId, keyHex }: UseChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [partnerId, setPartnerId] = useState<string | null>(null);


        const sendMessage = useCallback(async (msg: string, receiverId: string) => {
        if (!msg.trim()) {
        toast.error('Message cannot be empty');
        return;
        }

        if (!socket || !roomId || !keyHex) {
        toast.error('Missing socket, roomId, or key');
        return;
        }

        try {
        const { encrypted, iv } = await encryptText(msg, keyHex);

        socket.emit('chat:message', {
            roomId,
            senderId: userId,
            receiverId,
            conversationId,
            iv,
            message: encrypted,
        });

        setMessages((prev) => [
            ...prev,
            { senderId: userId, content: msg, timestamp: new Date().toISOString() },
        ]);
        } catch (err) {
        console.error(err);
        toast.error('Failed to send message');
        }
    }, [socket, roomId, keyHex, userId, conversationId]);

    
    const handleIncomingMessage = useCallback(async(msg: {
        senderId: string;
        content: string;
        iv: string;
        timeStamp?: string;
    })=>{
        if (!msg.content || !msg.iv) {
            console.warn('Missing message or iv:', msg);
            return;
        }

        if (msg.senderId === userId) return

        try{
            const decrypted = await decryptText(msg.iv, msg.content, keyHex);
            setMessages((prev) => [
                ...prev,
                { senderId: msg.senderId, content: decrypted, timestamp: msg.timeStamp || new Date().toISOString() },
            ]);
        }catch(error){
            console.error('Failed to decrypt message:', error);
            toast.error('Decryption error');
        }
    },[keyHex,userId])


    const handleChatHistory = useCallback(async(data: {messages: any[]})=>{
        try{
            const decryptedMessages = await Promise.all(
                data.messages
                .filter((msg) => (msg.message || msg.content) && msg.iv)
                .map(async(msg) => {
                    const encryptedText = msg.message || msg.content;
                    const ts = msg.timestamp || msg.timeStamp || new Date().toISOString();

                    const decrypted = await decryptText(msg.iv, encryptedText, keyHex);

                    return {
                        senderId: msg.senderId,
                        content: decrypted,
                        timestamp: ts,
                    };
                }
            ))
            
            setMessages(decryptedMessages);
        }catch(error){
            console.error('Failed to decrypt chat history:', error);
            toast.error('Failed to load chat history');
        }
    },[keyHex])


    const handlePartnerFound = useCallback((data: {
        roomId: string;
        conversationId: string;
        partnerId: string;
    }) => {
        setRoomId(data.roomId);
        setConversationId(data.conversationId);
        setPartnerId(data.partnerId);
    },[])

    useEffect(() => {
    const handlePartnerDisconnected = () => {
        toast('❌ Your chat partner has disconnected.', {
            icon: '👤',
            duration: 5000,
        });
        setPartnerId(null);
        setRoomId(null);
        setConversationId(null);
        setMessages([]);
    };

    socket.on('partner:disconnected', handlePartnerDisconnected);

    return () => {
        socket.off('partner:disconnected', handlePartnerDisconnected);
    };
    }, [socket]);

    const disconnect = () => {
    if (socket && socket.connected) {
        socket.disconnect();
        toast("You have disconnected from the chat.");
        setPartnerId(null);
        setRoomId(null);
        setConversationId(null);
        setMessages([]);
    }
    };


    useEffect(()=>{
        socket.on('chat:message', handleIncomingMessage);
        socket.on('chat:history', handleChatHistory);
        socket.on('partner:found', handlePartnerFound);
        return () => {
        socket.off('chat:message', handleIncomingMessage);
        socket.off('chat:history', handleChatHistory);
        socket.off('partner:found',handlePartnerFound);
        };
    },[socket, handleIncomingMessage, handleChatHistory, handlePartnerFound])

    return { 
        messages,
        sendMessage,
        partnerId,
        roomId,
        conversationId,
        disconnect
    };
}