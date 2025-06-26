import { useEffect, useRef, useState } from "react";
import { Taglines } from "./Taglines";
import { SearchSpinner } from "./SearchSpinner";
import { MessageBubble } from "../ChatComponents/MessageBubble";
import { TypingIndicator } from "../ChatComponents/TypingIndicator";
import { socket } from "../../utils/socket";
import { PartnerProfileOverlay } from "../ProfileComponents/PartnerProfileOverlay";

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

    const handleScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        const isNearBottom = distanceFromBottom < 100;
        isUserAtBottomRef.current = isNearBottom;
    };

    useEffect(() => {
        if (messages.length === 0) return;

        const lastMessage = messages[messages.length - 1];
        const isFromPartner = lastMessage.senderId !== currentUserId;

        if (isFromPartner || isUserAtBottomRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        lastMessageSenderIdRef.current = lastMessage.senderId;
    }, [messages, isPartnerTyping]);

    useEffect(() => {
        if (partnerId) setIsSearching(false);
    }, [partnerId]);

    const handleJuiceMatch = () => {
        setIsSearching(true);
        onFindPartner?.();
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center h-full px-4">
                        {partnerId && (
                            <div className="text-base sm:text-lg md:text-xl font-semibold text-center max-w-[90vw] break-words">
                                <span className="font-medium ">{partnerUsername}</span> has connected. Start chatting!
                            </div>
                        )}
                        {!isSearching && !partnerId && <Taglines />}
                        {!isSearching && !partnerId && (
                            <button
                                className="mt-6 bg-yellow-400 text-[#4B2E1E] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow hover:bg-yellow-500 transition w-[90vw] max-w-xs"
                                onClick={handleJuiceMatch}
                            >
                                JuiceMatch
                            </button>
                        )}
                        {isSearching && (
                            <>
                                <SearchSpinner />
                                <button
                                    className="mt-4 bg-yellow-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-yellow-100 transition text-sm sm:text-base w-[90vw] max-w-xs"
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
                                onReact={(reaction) => console.log("User reacted with", reaction)}
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
                <PartnerProfileOverlay
                    partnerImage={partnerImage}
                    partnerUsername={partnerUsername}
                    onClose={() => setShowPartnerProfile(false)}
                />
            )}
        </div>
    );
};
