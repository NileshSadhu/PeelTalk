import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/default_profile.png';
import { useUserStore } from '../../store/useUserStore';
import { socket } from '../../utils/socket';
import { Loading } from '../Common/Loading';
import { SideBar } from './SideBar';
import { ChatWindow } from './ChatWindow';
import { MessageInput } from './MessageInput';

interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}

const Home = () => {
    const { user, fetchUser, loading } = useUserStore();
    const [partnerProfileImageUrl, setPartnerProfileImageUrl] = useState(profile);


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const [keyHex, setKeyHex] = useState(
        '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'
    );
    const [roomId, setRoomId] = useState('');
    const [conversationId, setConversationId] = useState('');
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');

    const [messages, setMessages] = useState<Message[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const handleFindPartner = async () => {
        if (!user || !user._id) return;
        const currentUserId = user._id;
        if (!socket.connected) {
            socket.connect();
        }
        socket.emit('find:partner', { userId: currentUserId });
    };

    useEffect(() => {
        if (!user || !user._id) return;

        const handlePartnerFound = (data: {
            roomId: string;
            conversationId: string;
            partnerId: string;
            partnerImageUrl?: string;
        }) => {
            const { roomId, conversationId, partnerId, partnerImageUrl } = data;
            setRoomId(roomId);
            setConversationId(conversationId);
            setSenderId(user._id);
            setReceiverId(partnerId);
            setPartnerProfileImageUrl(partnerImageUrl || profile);
            setMessages([]);
        };


        const handleReceiveMessage = (message: Message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on('partner:found', handlePartnerFound);
        socket.on('message:receive', handleReceiveMessage);

        return () => {
            socket.off('partner:found', handlePartnerFound);
            socket.off('message:receive', handleReceiveMessage);
        };
    }, [user]);

    if (loading) return <Loading />;
    if (!user) return <p>Please log in.</p>;

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            <div className="flex-1 lg:mx-20 flex flex-col h-screen">
                <div className="flex justify-end p-4">
                    <button
                        className="balsamiq-sans-regular-italic text-brown-100"
                        onClick={() => navigate('/profile')}
                    >
                        <img src={profile} alt="Profile" className="w-12 h-12 rounded-full" />
                    </button>
                </div>

                <ChatWindow
                    messages={messages}
                    currentUserId={user._id}
                    currentUserImage={user.profileImageUrl || profile}
                    partnerImage={partnerProfileImageUrl}
                    onFindPartner={handleFindPartner}
                />



                <MessageInput
                    socket={socket}
                    senderId={senderId}
                    receiverId={receiverId}
                    conversationId={conversationId}
                    roomId={roomId}
                    keyHex={keyHex}
                    onSend={(newMessage) => {
                        setMessages(prev => [...prev, {
                            senderId: senderId,
                            content: newMessage,
                            timestamp: new Date().toISOString()
                        }]);
                    }}
                />

            </div>
        </div>
    );
};

export default Home;
