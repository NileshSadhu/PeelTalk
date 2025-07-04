import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Socket } from 'socket.io-client';
import { KeyStorageService } from '../utils/keyStorage.ts';
import { arrayBufferToBase64, strToArrayBuffer } from '../utils/aesUtils.ts.ts';
import { encryptWithPublicKey, decryptWithPrivateKey } from '../utils/rsaEncryptUtils.ts';

interface Message {
    messageId: string;
    senderId: string;
    content: string;
    timestamp: string;
    reaction?: string;
}


interface UseChatProps {
    socket: Socket;
    userId: string;
}

export const useChat = ({ socket, userId }: UseChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [partnerId, setPartnerId] = useState<string | null>(null);
    const [partnerPublicKey, setPartnerPublicKey] = useState<CryptoKey | null>(null);
    const [partnerProfile, setPartnerProfile] = useState<{ username: string; profilePhoto: string } | null>(null);
    const partnerProfileRef = useRef<{ username: string; profilePhoto: string } | null>(null);
    const [partnerTyping, setPartnerTyping] = useState(false);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(() => {
        partnerProfileRef.current = partnerProfile;
    }, [partnerProfile]);

    const sendMessage = useCallback(async (msg: string, receiverId: string, messageId: string) => {
        if (!msg.trim()) return toast.error('Message cannot be empty');
        if (!socket || !roomId) return toast.error('Missing socket or roomId');

        try {
            if (partnerPublicKey) {
                const encrypted = await encryptWithPublicKey(new TextEncoder().encode(msg), partnerPublicKey);
                socket.emit('chat:message', {
                    roomId,
                    senderId: userId,
                    receiverId,
                    content: arrayBufferToBase64(encrypted),
                    conversationId,
                    messageId, 
                });
            } else {
                socket.emit('chat:message', {
                    roomId,
                    senderId: userId,
                    receiverId,
                    content: msg,
                    conversationId: null,
                    messageId,
                });
            }

            setMessages(prev => [
                ...prev,
                {   
                    senderId: userId,
                    content: msg,
                    timestamp: new Date().toISOString(),
                    messageId,
                }
            ]);
        } catch (err) {
            console.error(err);
            toast.error('Failed to send message');
        }
    }, [socket, roomId, userId, partnerPublicKey]);


    const sendReaction = useCallback((messageId: string, reaction: string) => {
        if (!socket || !roomId || !partnerId) return;

        socket.emit("chat:reaction", {
            roomId,
            messageId,
            senderId: userId,
            receiverId: partnerId,
            reaction,
        });
    }, [socket, roomId, partnerId, userId]);


    useEffect(() => {
        socket.on("chat:reaction", ({ messageId, reaction }) => {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.messageId === messageId ? { ...msg, reaction } : msg
                )
            );
        });

        return () => {
            socket.off("chat:reaction");
        };
    }, []);


    const handleIncomingMessage = useCallback(async (msg: {
        senderId: string;
        content: string;
        messageId: string;
        timestamp?: string;
    }) => {
        if (msg.senderId === userId) return;
        try {
            const privateKey = await KeyStorageService.getPrivateKeyFromLocalStorage();
            if (!privateKey) throw new Error("Private key missing");

            const decrypted = await decryptWithPrivateKey(strToArrayBuffer(msg.content), privateKey);
            const decodedMsg = new TextDecoder().decode(decrypted);

            setMessages(prev => [
                ...prev,
                {
                    messageId: msg.messageId,
                    senderId: msg.senderId,
                    content: decodedMsg,
                    timestamp: msg.timestamp || new Date().toISOString()
                }
            ]);
        } catch (err) {
            console.warn("Decryption failed, falling back to plain:", err);
            setMessages(prev => [
                ...prev,
                {
                    messageId: msg.messageId,
                    senderId: msg.senderId,
                    content: msg.content,
                    timestamp: msg.timestamp || new Date().toISOString()
                }
            ]);
        }
    }, [userId]);


        const handlePartnerFound = useCallback(async (data: {
        roomId: string;
        conversationId: string | null;
        partnerId: string;
        partnerProfile: { username: string; profilePhoto: string };
        publicKey: string | null;
    }) => {
        try {
            setRoomId(data.roomId);
            setConversationId(data.conversationId);
            setPartnerId(data.partnerId);
            setPartnerProfile(data.partnerProfile);

            if (data.publicKey) {
                const importedKey = await window.crypto.subtle.importKey(
                    'spki',
                    strToArrayBuffer(data.publicKey),
                    { name: 'RSA-OAEP', hash: 'SHA-256' },
                    true,
                    ['encrypt']
                );
                setPartnerPublicKey(importedKey);
                KeyStorageService.setPartnerPublicKey(data.publicKey);
            } else {
                // Partner is guest, no encryption possible
                setPartnerPublicKey(null);
                KeyStorageService.clearPartnerPublicKey();
            }

            toast.success(`User ${data.partnerProfile.username} has connected!`);
        } catch (err) {
            console.error('Error setting up partner key:', err);
            toast.error('Failed to set up secure chat');
        }
    }, []);



    useEffect(() => {
        const handlePartnerTyping = () => {
            setPartnerTyping(true);

            if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = setTimeout(() => {
            setPartnerTyping(false);
            typingTimeoutRef.current = null;
            }, 1000);
        };

        socket.on('partner:typing', handlePartnerTyping);

        return () => {
            socket.off('partner:typing', handlePartnerTyping);
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
        }, []); 



    useEffect(() => {
        const handlePartnerStopTyping = () => setPartnerTyping(false);

        socket.on('partner:stopTyping', handlePartnerStopTyping);

        return () => {
            socket.off('partner:stopTyping', handlePartnerStopTyping);
        };
    }, []);


    useEffect(() => {

        socket.on('chat:message', handleIncomingMessage);
        socket.on('partner:found', handlePartnerFound);

        return () => {
            socket.off('chat:message', handleIncomingMessage);
            socket.off('partner:found', handlePartnerFound);
        };
    }, [socket, handleIncomingMessage, handlePartnerFound]);


    const disconnect = () => {
        if (socket && socket.connected) {
            socket.disconnect();
            toast('You have disconnected from the chat.');
            setPartnerId(null);
            setRoomId(null);
            setConversationId(null);
            setMessages([]);
            setPartnerProfile(null);
            KeyStorageService.clearPartnerPublicKey();
            setPartnerPublicKey(null);
        }
    };

    useEffect(() => {
        const handlePartnerDisconnected = () => {
            const username = partnerProfileRef.current?.username || "someone";

            toast(`❌ Your chat partner ${username} has disconnected.`, {
                icon: '👤',
                duration: 5000,
            });
            setTimeout(() => {
                setPartnerId(null);
                setRoomId(null);
                setConversationId(null);
                setMessages([]);
                KeyStorageService.clearPartnerPublicKey();
            }, 600);
        };

        socket.on('partner:disconnected', handlePartnerDisconnected);

        return () => {
            socket.off('partner:disconnected', handlePartnerDisconnected);
        };
    }, [socket]);

    return {
        socket,
        messages,
        sendMessage,
        partnerId,
        roomId,
        sendReaction,
        conversationId,
        disconnect,
        partnerProfile,
        partnerTyping,
    };
};
