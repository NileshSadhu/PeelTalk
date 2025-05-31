import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/default_profile.png';
import { useUserStore } from '../../store/useUserStore';
import { socket } from '../../utils/socket';
import { Loading } from '../Common/Loading';
import { SideBar } from './SideBar';
import { ChatWindow } from './ChatWindow';
import { MessageInput } from './MessageInput';
import { useChat } from '../../hooks/useChat';


const Home = () => {
    const { user, fetchUser, loading } = useUserStore();
    const [partnerProfileImageUrl, setPartnerProfileImageUrl] = useState(profile);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const keyHex = '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f';
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const {
        messages,
        sendMessage,
        partnerId,
        roomId,
        disconnect
    } = useChat({
        socket,
        userId: user?._id || '',
        keyHex
    });

    const handleFindPartner = async () => {
        if (!user || !user._id) return;
        if (!socket.connected) socket.connect();
        socket.emit('find:partner', { userId: user._id });
    };

    useEffect(() => {
        socket.on('partner:image', (url: string) => {
            setPartnerProfileImageUrl(url || profile);
        });

        return () => {
            socket.off('partner:image');
        };
    }, []);

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
                {/* <button className='mt-6 bg-yellow-400 text-[#4B2E1E] px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition' onClick={disconnect}>
                    Disconnect
                </button> */}

                <MessageInput
                    receiverId={partnerId!}
                    onSend={sendMessage}
                    disabled = {!roomId || !partnerId}
                />

            </div>
        </div>
    );
};

export default Home;
