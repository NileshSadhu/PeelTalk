import { useState, useRef, useEffect } from 'react';
import { getAvatarFromUsername } from '../../utils/getAvatar';

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢'];

interface MessageBubbleProps {
    isCurrentUser: boolean;
    avatar: string;
    username: string;
    content: string;
    messageId: string; 
    reaction?: string;
    timestamp: string;
    onAvatarClick?: () => void;
    onReact?: (reaction: string, messageId: string) => void;
}

export const MessageBubble = ({
    isCurrentUser,
    avatar,
    username,
    content,
    messageId,
    reaction,
    timestamp,
    onAvatarClick,
    onReact,
}: MessageBubbleProps) => {
    const [showReactions, setShowReactions] = useState(false);
    const reactionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (reactionRef.current && !reactionRef.current.contains(e.target as Node)) {
                setShowReactions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`my-2 scroll-mt-20 flex ${isCurrentUser ? "justify-end" : "justify-start"} w-full px-2`}>
            <div
                className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} gap-2 items-start max-w-[90%] sm:max-w-[75%]`}
            >
                <img
                    src={avatar || getAvatarFromUsername(username)}
                    alt={`${username}'s avatar`}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 ${onAvatarClick ? 'cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out' : ''}`}
                    onClick={onAvatarClick}
                />

                <div className="flex flex-col relative">
                    <span
                        className={`text-[10px] sm:text-xs text-gray-500 mb-1 truncate max-w-[180px] sm:max-w-none
                        ${isCurrentUser ? 'self-end text-right' : 'self-start text-left'}`}
                    >
                        {username}
                    </span>

                    <div
                        onClick={() => {
                            if (!isCurrentUser) setShowReactions(!showReactions);
                        }}
                        className={`relative bg-[#F9F4F2] text-[#4B2E1E] p-2 sm:p-3 rounded-lg shadow cursor-pointer
                            ${isCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'}
                            before:absolute before:bottom-0 before:w-0 before:h-0
                            ${isCurrentUser
                                ? 'before:right-0 before:border-l-[10px] sm:before:border-l-[12px] before:border-l-[#F9F4F2] before:border-b-[10px] sm:before:border-b-[12px] before:border-b-transparent'
                                : 'before:left-0 before:border-r-[10px] sm:before:border-r-[12px] before:border-r-[#F9F4F2] before:border-b-[10px] sm:before:border-b-[12px] before:border-b-transparent'}
                        `}
                    >
                        {/* REACTION STICKER ON BUBBLE */}
                        {reaction && (
                            <div
                                className={`
                                    absolute text-xl bg-white rounded-full shadow px-1
                                    ${isCurrentUser ? '-bottom-2 -left-2' : '-bottom-2 -right-2'}
                                `}
                            >
                                {reaction}
                            </div>
                        )}

                        <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{content}</p>
                        <p className="text-[9px] sm:text-[10px] text-right mt-1 text-gray-500">
                            {new Date(timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}
                        </p>

                        {/* EMOJI REACTION PICKER */}
                        {showReactions && !isCurrentUser && (
                            <div
                                ref={reactionRef}
                                className="absolute left-0 -bottom-9 flex gap-1 p-1 bg-white border rounded-full shadow z-10"
                            >
                                {REACTIONS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        className="cursor-pointer hover:scale-110 transition-transform text-lg p-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowReactions(false);
                                            onReact?.(emoji, messageId); 
                                        }}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
