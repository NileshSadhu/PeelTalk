import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import PremiumButton from './ChatsComponent/PremiumButton';
import logo from './assets/logo.png'
import LogoutButton from './ChatsComponent/LogoutButton';
import { useNavigate } from 'react-router-dom';
import profile from '../Components/assets/default_profile.png'
import ChatWindow from './ChatsComponent/ChatWindow';
import socket from '../utils/socket';
import useUserStore from '../store/useUserStore';
import Loading from './common/Loading';

const Home = () => {
    const { user, fetchUser, loading } = useUserStore();

    useEffect(() => {
        fetchUser();
    }, []);

    const [roomId, setRoomId] = useState('');
    const [conversationId, setConversationId] = useState('');
    const [keyHex, setKeyHex] = useState('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f');
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleFindPartner = async () => {
        const currentUserId = user._id

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("find:partner", { userId: currentUserId });
    };

    useEffect(() => {
        if (!user || !user._id) return;

        const handlePartnerFound = ({ roomId, conversationId, partnerId }) => {
            console.log("✅ Partner found!", { roomId, conversationId });

            const key = keyHex;
            const userId = user._id;

            setRoomId(roomId);
            setConversationId(conversationId);
            setKeyHex(key || '');
            setSenderId(userId || '');
            setReceiverId(partnerId);
        };

        socket.on("partner:found", handlePartnerFound);

        return () => {
            socket.off("partner:found", handlePartnerFound);
        };
    }, [user]);


    if (loading) return <Loading />;
    if (!user) return <p>Please log in.</p>;


    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">

            <button
                onClick={toggleMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
            >
                <FaBars className="text-[#4B2E1E] text-xl" />
            </button>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu}
                />
            )}

            <div className={`
                fixed lg:static w-64 lg:w-80 h-full bg-gradient-to-b from-yellow-200 to-yellow-100 shadow-lg
                flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>

                <div className="flex flex-col items-center p-6">

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={logo}
                            alt="Banana Logo"
                            className="w-24 h-24 object-contain"
                        />
                        <span className="balsamiq-sans-bold text-brown-900 text-base lg:text-xl">PeelTalk</span>
                    </div>
                </div>


                <div className="flex flex-col gap-4 p-6 mt-auto">
                    <PremiumButton text="Premium" />
                    <LogoutButton />
                </div>
            </div>

            <div className="flex-1 lg:mx-20 flex flex-col h-screen">
                <button
                    className="balsamiq-sans-regular-italic text-browm-100"
                    onClick={() => navigate('/profile')}>
                    <img src={profile} alt="Profile" className="w-12 h-12 rounded-full float-right m-4" />
                </button>
                <div>
                    <button
                        className="bg-yellow-400 text-[#4B2E1E] px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition justify-center align-center"
                        onClick={handleFindPartner}
                    >
                        JuiceMatch
                    </button>
                </div>
                <ChatWindow
                    roomId={roomId}
                    conversationId={conversationId}
                    keyHex={keyHex}
                    senderId={senderId}
                    receiverId={receiverId}
                />
            </div>
        </div>
    );
};

export default Home; 