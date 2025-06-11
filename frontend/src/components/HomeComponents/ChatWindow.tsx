import { useEffect, useRef } from "react";
import { Taglines } from "./Taglines";
import { Disconnect } from "./Disconnect";

interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}

interface ChatWindowProps {
    messages: Message[];
    currentUserId: string;
    currentUserImage: string;
    partnerImage: string;
    currentUsername: string;
    partnerUsername: string;
    partnerId?: string;             // ✅ Add this
    onFindPartner?: () => void;
    onDisconnect?: () => void;      // ✅ Add this
}

export const ChatWindow = ({
    messages,
    currentUserId,
    currentUserImage,
    partnerImage,
    currentUsername,
    partnerUsername,
    partnerId,
    onFindPartner,
    onDisconnect
}: ChatWindowProps) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center relative">
            {/* ✅ Show Disconnect button only if user is matched */}
            {partnerId && onDisconnect && (
                <div className="sticky top-0 z-20 mt-2 flex justify-center shadow-md">
                    <Disconnect onDisconnect={onDisconnect} />
                </div>

            )}

            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center">
                    <Taglines />
                    {onFindPartner && (
                        <button
                            className="mt-6 bg-yellow-400 text-[#4B2E1E] px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                            onClick={onFindPartner}
                        >
                            JuiceMatch
                        </button>
                    )}
                </div>
            ) : (
                <div className="w-full pt-16"> {/* Padding for disconnect button */}
                    {messages.map((msg, idx) => {
                        const isCurrentUser = msg.senderId === currentUserId;
                        const avatar = isCurrentUser ? currentUserImage : partnerImage;
                        const username = isCurrentUser ? currentUsername : partnerUsername;

                        return (
                            <div
                                key={idx}
                                className={`my-2 flex ${isCurrentUser ? "justify-end" : "justify-start"} w-full`}
                            >
                                <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} gap-2 items-start max-w-[80%]`}>
                                    {/* Avatar */}
                                    <img
                                        src={avatar}
                                        alt={`${username}'s avatar`}
                                        className="w-10 h-10 rounded-full border border-gray-300"
                                    />

                                    {/* Message bubble */}
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">{username}</span>
                                        <div className={`relative bg-[#F9F4F2] text-[#4B2E1E] p-3 rounded-lg shadow
                                                ${isCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'}
                                                before:absolute before:bottom-0 before:w-0 before:h-0
                                                ${isCurrentUser
                                                ? 'before:right-0 before:border-l-[12px] before:border-l-[#F9F4F2] before:border-b-[12px] before:border-b-transparent'
                                                : 'before:left-0 before:border-r-[12px] before:border-r-[#F9F4F2] before:border-b-[12px] before:border-b-transparent'}
                                                `}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                            <p className="text-[10px] text-right mt-1 text-gray-500">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
};
