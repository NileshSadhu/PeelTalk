import { useState, useEffect } from 'react';
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
    const [roomId, setRoomId] = useState<string>('');
    const [conversationId, setConversationId] = useState<string>('');
    const [senderId, setSenderId] = useState<string>('');
    const [receiverId, setReceiverId] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!user || !user._id) return;

        const handleError = (error: Error) => {
            toast.error("Connection error. Please try again.");
            setIsSearching(false);
        };

        const handlePartnerFound = ({ roomId, conversationId, partnerId }: { roomId: string; conversationId: string; partnerId: string }) => {
            setIsSearching(false);
            toast.success("Partner found!");
            
            const userId = user._id;
            setRoomId(roomId);
            setConversationId(conversationId);
            setSenderId(userId);
            setReceiverId(partnerId);
        };

        const handleChatMessage = ({ senderId, message, timestamp }: { senderId: string; message: string; timestamp: string }) => {
            const newMessage: Message = {
                senderId: senderId,
                content: message,
                timestamp: timestamp,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("connect_error", handleError);
        socket.on("partner:found", handlePartnerFound);
        socket.on("chat:message", handleChatMessage);

        return () => {
            socket.off("connect_error", handleError);
            socket.off("partner:found", handlePartnerFound);
            socket.off("chat:message", handleChatMessage);
        };
    }, [socket, user]);

    const handleFindPartner = async () => {
        if (isSearching) {
            return;
        }

        if (!user || !user._id) {
            toast.error("User not loaded or user ID is missing. Please log in.");
            console.error("User not loaded or user ID is missing.");
            return;
        }

        try {
            setIsSearching(true);

            if (!socket.connected) {
                socket.connect();
                toast.info("Connecting to server...");
            }

            setRoomId('');
            setConversationId('');
            setSenderId('');
            setReceiverId('');
            setMessages([]);

            socket.emit("find:partner", { userId: user._id });
            toast.info("Searching for a partner...");
        } catch (error) {
            console.error("Error finding partner:", error);
            toast.error("Failed to start partner search. Please try again.");
            setIsSearching(false);
        }
    };

    const handleSendMessage = (content: string) => {
        if (!roomId || !user?._id) return;

        const timestamp = new Date().toISOString();
        const newMessage: Message = {
            senderId: user._id,
            content: content,
            timestamp: timestamp
        };

        socket.emit("chat:message", {
            roomId,
            message: content,
            timestamp
        });

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                className={`bg-yellow-400 text-[#4B2E1E] px-4 py-2 rounded-lg shadow transition justify-center align-center ${
                    isSearching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
                }`}
                onClick={handleFindPartner}
                disabled={isSearching}
            >
                {isSearching ? 'Searching...' : 'JuiceMatch'}
            </button>

            {roomId && (
                <div className="w-full max-w-2xl mt-4">
                    <div className="bg-white rounded-lg shadow-md p-4 max-h-[60vh] overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-2 ${
                                    message.senderId === user?._id ? 'text-right' : 'text-left'
                                }`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${
                                        message.senderId === user?._id
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
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                                    handleSendMessage((e.target as HTMLInputElement).value.trim());
                                    (e.target as HTMLInputElement).value = '';
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};