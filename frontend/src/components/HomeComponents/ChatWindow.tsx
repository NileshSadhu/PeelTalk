import { useEffect, useRef, useState } from "react";
import { Taglines } from "./Taglines";
import { Disconnect } from "../ChatComponents/Disconnect";
import { SearchSpinner } from "./SearchSpinner";
import { MessageBubble } from "../ChatComponents/MessageBubble";
import { TypingIndicator } from "../ChatComponents/TypingIndicator";
import { socket } from "../../utils/socket";

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
    partnerId?: string;
    isPartnerTyping?: boolean;
    onFindPartner?: () => void;
    onDisconnect?: () => void;
}

export const ChatWindow = ({
    messages,
    currentUserId,
    currentUserImage,
    partnerImage,
    currentUsername,
    partnerUsername,
    partnerId,
    isPartnerTyping,
    onFindPartner,
    onDisconnect
}: ChatWindowProps) => {
    const [isSearching, setIsSearching] = useState(false);
    const isUserAtBottomRef = useRef(true);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const lastMessageSenderIdRef = useRef<string | null>(null);

    // Track scroll position
    const handleScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        const isNearBottom = distanceFromBottom < 100;
        isUserAtBottomRef.current = isNearBottom;
    };


    // Scroll to bottom when new message or typing
    useEffect(() => {
        if (messages.length === 0) return;

        const lastMessage = messages[messages.length - 1];

        // Always scroll if partner sent the message
        const isFromPartner = lastMessage.senderId !== currentUserId;

        if (isFromPartner || isUserAtBottomRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        // Save for comparison next time (optional)
        lastMessageSenderIdRef.current = lastMessage.senderId;
    }, [messages, isPartnerTyping]);



    // Stop searching if partner is found
    useEffect(() => {
        if (partnerId) setIsSearching(false);
    }, [partnerId]);

    const handleJuiceMatch = () => {
        setIsSearching(true);
        onFindPartner?.();
    };

    return (
        <div className="flex-1 flex flex-col relative overflow-hidden"> {/* Main chat container */}
    
            {/* 🔌 Sticky Disconnect stays outside of scroll area */}
            {partnerId && onDisconnect && (
                <div className="sticky top-0 z-20 mt-0 flex justify-center bg-white py-3 border-gray-200">
                    <Disconnect onDisconnect={onDisconnect} />
                </div>
            )}

            {/* 📜 Scrollable Chat Area */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center h-full">
                        {!isSearching && !partnerId && <Taglines />}
                        {!isSearching && !partnerId && (
                            <button
                                className="mt-6 bg-yellow-400 text-[#4B2E1E] px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                                onClick={handleJuiceMatch}
                            >
                                JuiceMatch
                            </button>
                        )}
                        {isSearching && (
                            <>
                                <SearchSpinner />
                                <button
                                    className="mt-4 bg-yellow-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-yellow-100 transition"
                                    onClick={() => {
                                        setIsSearching(false);
                                        socket.emit("partner:cancel");
                                    }}
                                >
                                    Cancel Search
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="w-full space-y-4">
                        {messages.map((msg, idx) => (
                            <MessageBubble
                                key={idx}
                                isCurrentUser={msg.senderId === currentUserId}
                                avatar={msg.senderId === currentUserId ? currentUserImage : partnerImage}
                                username={msg.senderId === currentUserId ? currentUsername : partnerUsername}
                                content={msg.content}
                                timestamp={msg.timestamp}
                            />
                        ))}

                        {isPartnerTyping && (
                            <TypingIndicator
                                partnerImage={partnerImage}
                                partnerUsername={partnerUsername}
                            />
                        )}

                        {/* 🔽 Scroll target */}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
        </div>
    );
};
