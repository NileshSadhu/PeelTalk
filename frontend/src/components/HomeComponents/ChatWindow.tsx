import { Taglines } from "./Taglines";
import { useEffect, useRef } from "react";

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
    onFindPartner?: () => void;
}

export const ChatWindow = ({
    messages,
    currentUserId,
    currentUserImage,
    partnerImage,
    onFindPartner,
}: ChatWindowProps) => {

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
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
                <div className="w-full">
                    {messages.map((msg, idx) => {
                        const isCurrentUser = msg.senderId === currentUserId;
                        const avatar = isCurrentUser ? currentUserImage : partnerImage;
                        const username = isCurrentUser ? "You" : "Partner";

                        return (
                            <div
                                key={idx}
                                className={`my-4 flex ${isCurrentUser ? "justify-end" : "justify-start"} w-full`}
                            >
                                <div className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-start max-w-[75%]`}>
                                    <div className="flex flex-col items-center mr-2 ml-2">
                                        <p className="text-xs text-gray-500 mb-1">{username}</p>
                                        <img
                                            src={avatar}
                                            alt="User avatar"
                                            className="w-10 h-10 rounded-full border border-gray-300"
                                        />
                                    </div>
                                    <div className="bg-[#F9F4F2] text-[#4B2E1E] p-3 rounded-lg shadow-md">
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
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
};
