import { useState, useRef, useEffect } from 'react';
import { SendMessageBtn } from './SendMessageBtn';
import { toast } from 'react-toastify';
import { TermsServices } from './TermsServices';
import React from 'react';
import { useChat } from '../../hooks/useChat';
import type { Socket } from 'socket.io-client';

interface MessageInputProps {
    disabled: boolean;
    receiverId: string;
    onSend: (message: string, receiverId: string) => void;
    socket: Socket;
    userId: string;
}

export const MessageInput = ({
    disabled,
    receiverId,
    onSend,
    socket,
    userId,
}: MessageInputProps) => {
    const [message, setMessage] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const typingTimeoutRef = useRef<number | null>(null);

    const { socket: chatSocket, roomId, partnerTyping, partnerProfile } = useChat({
        socket,
        userId
    });

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
        setMessage('');
    };

    const emitTypingEvent = () => {
        if (chatSocket && roomId) {
            chatSocket.emit('partner:typing', { roomId });
        }
    };

    const handleTyping = (value: string) => {
        setMessage(value);
        emitTypingEvent();

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = window.setTimeout(() => {
            // Optional: emit stopped typing event here
        }, 1000);
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
        <div className="p-4 pb-8 relative mr-5">
            <div className="flex items-end gap-2 bg-white rounded-lg shadow-md p-2 w-full">
                <textarea
                    ref={textareaRef}
                    aria-label="Type your message"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTyping(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
                            e.preventDefault();
                            handleSend(e);
                        }
                    }}
                    placeholder="Write your message..."
                    className="flex-1 resize-none px-4 py-2 mr-10 outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50 bg-transparent max-h-48 overflow-y-auto"
                    rows={1}
                    disabled={disabled}
                />
                <SendMessageBtn
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        if (!disabled) handleSend(e);
                    }}
                />
            </div>

            {partnerTyping && (
                <div className="text-sm text-gray-500 italic mt-2 ml-2">
                    {partnerProfile?.username || "Partner"} is typing...
                </div>
            )}

            <TermsServices />
        </div>
    );
};
