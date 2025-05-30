import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';

interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}

interface UserForFind {
    _id: string;
}

interface FindProps {
    user: UserForFind | null;
    socket: Socket;
}

export const Find = ({ user, socket }: FindProps) => {
    const [isSearching, setIsSearching] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [conversationId, setConversationId] = useState('');
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

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
            setMessages(prev => [
                ...prev,
                { senderId, content: message, timestamp }
            ]);
        };

        socket.on("connect_error", handleError);
        socket.on("partner:found", handlePartnerFound);
        socket.on("chat:message", handleChatMessage);

        return () => {
            socket.off("connect_error", handleError);
            socket.off("partner:found", handlePartnerFound);
            socket.off("chat:message", handleChatMessage);
            // Optional: Disconnect socket if needed
            // socket.disconnect();
        };
    }, [socket, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFindPartner = () => {
        if (isSearching || !user?._id) {
            toast.error("Please log in or wait for the current search.");
            return;
        }

        setIsSearching(true);

        if (!socket.connected) {
            socket.connect();
            toast.info("Connecting to server...");
        }

        // Reset previous session data
        setRoomId('');
        setConversationId('');
        setSenderId('');
        setReceiverId('');
        setMessages([]);

        socket.emit("find:partner", { userId: user._id });
        toast.info("Searching for a partner...");
    };

    const handleSendMessage = (content: string) => {
        if (!roomId || !user?._id || !content.trim()) return;

        const timestamp = new Date().toISOString();
        const newMessage: Message = {
            senderId: user._id,
            content,
            timestamp
        };

        socket.emit("chat:message", { roomId, message: content, timestamp });
        setMessages(prev => [...prev, newMessage]);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                className={`bg-yellow-400 text-[#4B2E1E] px-4 py-2 rounded-lg shadow transition ${isSearching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
                    }`}
                onClick={handleFindPartner}
                disabled={isSearching}
            >
                {isSearching ? 'Searching...' : 'JuiceMatch'}
            </button>

            {roomId && (
                <div className="w-full max-w-2xl mt-4">
                    <div className="bg-white rounded-lg shadow-md p-4 max-h-[60vh] overflow-y-auto">
                        {messages.length === 0 && (
                            <p className="text-gray-500 text-center">Say hello to your match!</p>
                        )}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-2 ${message.senderId === user?._id ? 'text-right' : 'text-left'}`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${message.senderId === user?._id
                                            ? 'bg-yellow-200 text-[#4B2E1E]'
                                            : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {message.content}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const input = e.target as HTMLInputElement;
                                    const value = input.value.trim();
                                    if (value) {
                                        handleSendMessage(value);
                                        input.value = '';
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
