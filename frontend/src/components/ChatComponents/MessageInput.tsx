import { useState, useRef, useEffect } from 'react';
import { SendMessageBtn } from './SendMessageBtn';
import { toast } from 'react-toastify';
import { TermsServices } from './TermsServices';
import React from 'react';
import { socket } from '../../utils/socket';

interface MessageInputProps {
    disabled: boolean;
    receiverId: string;
    onSend: (message: string, receiverId: string) => void;
    roomId: string;
    partnerTyping?: boolean;
    partnerUsername?: string;
}

export const MessageInput = ({
    disabled,
    receiverId,
    onSend,
    roomId,
    partnerTyping,
    partnerUsername
}: MessageInputProps) => {
    const [message, setMessage] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const typingTimeoutRef = useRef<number | null>(null);

    const handleSend = (
        e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        e.preventDefault();

        if (!message.trim()) {
            toast.error('Message cannot be empty');
            return;
        }

        if (!receiverId) {
            toast.error('No partner to send the message to');
            return;
        }

        onSend(message.trim(), receiverId);

        if (socket && roomId) {
            socket.emit("partner:stopTyping");
        }

        setMessage('');
    };

    const handleTyping = (value: string) => {
        setMessage(value);

        if (roomId && value.trim()) {
            socket.emit("partner:typing");

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = window.setTimeout(() => {
                socket.emit("partner:stopTyping");
            }, 1000);
        } else {
            socket.emit("partner:stopTyping");
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="px-3 py-2 sm:px-4 sm:pb-6 relative w-full">
            <div className="flex items-end gap-2 bg-white rounded-xl shadow-sm p-2 sm:p-3 w-full">
                <textarea
                    ref={textareaRef}
                    aria-label="Type your message"
                    value={message}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
                            e.preventDefault();
                            handleSend(e);
                        }
                    }}
                    placeholder="Write your message..."
                    className="flex-1 resize-none px-3 py-2 text-sm sm:text-base outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50 bg-transparent max-h-48 overflow-y-auto"
                    rows={1}
                    disabled={disabled}
                />
                <SendMessageBtn
                    onClick={(e) => {
                        if (!disabled) handleSend(e);
                    }}
                />
            </div>

            {partnerTyping && (
                <div className="text-xs sm:text-sm text-gray-500 italic mt-2 ml-1">
                    {partnerUsername || "Partner"} is typing...
                </div>
            )}

            <TermsServices />
        </div>
    );
};
