import { useEffect, useRef, useState } from "react";
import { Taglines } from "./Taglines";
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
}: ChatWindowProps) => {
    const [isSearching, setIsSearching] = useState(false);
    const isUserAtBottomRef = useRef(true);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const lastMessageSenderIdRef = useRef<string | null>(null);

    const [showPartnerProfile, setShowPartnerProfile] = useState(false);

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

        if (isFromPartner || isUserAtBottomRef.current || isPartnerTyping) {
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
            {/* 📜 Scrollable Chat Area */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-3 pt-4 pb-1 sm:px-4 sm:pt-6 sm:pb-2 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center h-full px-4">
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
                    <div className="flex flex-col gap-4 pb-4">
                        {messages.map((msg, idx) => (
                            <MessageBubble
                                key={idx}
                                isCurrentUser={msg.senderId === currentUserId}
                                avatar={msg.senderId === currentUserId ? currentUserImage : partnerImage}
                                username={msg.senderId === currentUserId ? currentUsername : partnerUsername}
                                content={msg.content}
                                timestamp={msg.timestamp}
                                onAvatarClick={
                                    msg.senderId === currentUserId
                                        ? undefined
                                        : () => setShowPartnerProfile(true)
                                }
                            />
                        ))}

                        {isPartnerTyping && (
                            <TypingIndicator
                                partnerImage={partnerImage}
                                partnerUsername={partnerUsername}
                            />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            {showPartnerProfile && (
                <>
                    {/* Background Blur Overlay */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                        onClick={() => setShowPartnerProfile(false)}
                    />

                    {/* Profile Card */}
                    <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[280px] text-center">
                        <img
                            src={partnerImage}
                            alt={`${partnerUsername}'s profile`}
                            className="w-20 h-20 rounded-full mx-auto border border-gray-300"
                        />
                        <h2 className="mt-4 text-lg font-semibold text-[#4B2E1E]">{partnerUsername}</h2>
                        <button
                            onClick={() => setShowPartnerProfile(false)}
                            className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#4B2E1E] rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
