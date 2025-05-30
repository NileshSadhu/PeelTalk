import { useState } from 'react';
import SendMessageBtn from './SendMessageBtn';
import { toast } from 'react-toastify';
import { encryptText } from '../../utils/crypto';
import { TermsServices } from './TermsServices';
import React from 'react';
import { Socket } from 'socket.io-client';

interface MessageInputProps {
    socket: Socket;
    senderId: string;
    receiverId: string;
    conversationId: string;
    roomId: string;
    keyHex: string;
    onSend: (message: string) => void;
}

const MessageInput = ({
    socket,
    senderId,
    receiverId,
    conversationId,
    roomId,
    keyHex,
    onSend,
}: MessageInputProps) => {
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!message.trim()) {
            toast.error('Message cannot be empty');
            return;
        }

        if (!socket || !roomId || !keyHex) {
            toast.error('Server Error! Missing socket, roomId, or keyHex.');
            return;
        }

        try {
            const { encrypted, iv } = await encryptText(message, keyHex);

            socket.emit('chat:message', {
                roomId,
                senderId,
                receiverId,
                conversationId,
                iv,
                message: encrypted,
            });

            onSend(message);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        }
    };

    return (
        <div className="p-4 pb-8 relative mr-5">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
                <input
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                    type="text"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            handleSendMessage(e);
                        }
                    }}
                    placeholder="Write your message..."
                    className="flex-1 px-4 py-2 mr-10 outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50"
                />
                <SendMessageBtn onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSendMessage(e)} />
            </div>
            <TermsServices />
        </div>
    );
};

export default MessageInput;