import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Socket } from 'socket.io-client';

export const useChat = (user: { _id: string } | null, socket: Socket) => {
    const [roomId, setRoomId] = useState('');
    const [conversationId, setConversationId] = useState('');
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (!user?._id) return;

        const handleError = () => {
            toast.error("Connection error. Please try again.");
            setIsSearching(false);
        };

        const handlePartnerFound = ({
            roomId,
            conversationId,
            partnerId
        }: { roomId: string; conversationId: string; partnerId: string }) => {
            setIsSearching(false);
            toast.success("Partner found!");

            setRoomId(roomId);
            setConversationId(conversationId);
            setSenderId(user._id);
            setReceiverId(partnerId);
        };

        const handleChatMessage = ({
            senderId,
            message,
            timestamp
        }: { senderId: string; message: string; timestamp: string }) => {
            setMessages(prev => [...prev, { senderId, content: message, timestamp }]);
        };

        socket.on("connect_error", handleError);
        socket.on("partner:found", handlePartnerFound);
        socket.on("chat:message", handleChatMessage);

        return () => {
            socket.off("connect_error", handleError);
            socket.off("partner:found", handlePartnerFound);
            socket.off("chat:message", handleChatMessage);
        };
    }, [user, socket]);

    const findPartner = () => {
        if (isSearching || !user?._id) {
            toast.error("Please log in or wait.");
            return;
        }

        setIsSearching(true);

        if (!socket.connected) {
            socket.connect();
            toast("Connecting to server...");
        }

        setRoomId('');
        setConversationId('');
        setSenderId('');
        setReceiverId('');
        setMessages([]);

        socket.emit("find:partner", { userId: user._id });
        toast("Searching for a partner...");
    };

    return {
        isSearching,
        messages,
        roomId,
        conversationId,
        senderId,
        receiverId,
        findPartner,
        setMessages
    };
};
