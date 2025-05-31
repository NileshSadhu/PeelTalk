import { useState } from 'react';
import { SendMessageBtn } from './SendMessageBtn';
import { toast } from 'react-toastify';
import { TermsServices } from './TermsServices';
import React from 'react';

interface MessageInputProps {
    disabled: boolean,
    receiverId: string;
    onSend: (message: string, receiverId: string) => void;
}

export const MessageInput = ({
    disabled,
    receiverId,
    onSend,
}: MessageInputProps) => {
    const [message, setMessage] = useState<string>('');

    const handleSend = async (
        e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>
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

    return (
        <div className="p-4 pb-8 relative mr-5">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2 w-full">
                <input
                    aria-label="Type your message"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                    type="text"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter' && !disabled) {
                            handleSend(e);
                        }
                    }}
                    placeholder="Write your message..."
                    className="flex-1 px-4 py-2 mr-10 outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50"
                    disabled={disabled}
                />
                <SendMessageBtn
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        if (!disabled) handleSend(e);
                    }}
                />
            </div>
            <TermsServices />
        </div>
    );
};

