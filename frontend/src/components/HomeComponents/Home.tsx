import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/default_profile.png';
import { socket } from '../../utils/socket';
import { useUserStore } from '../../store/useUserStore';
import { Loading } from '../Common/Loading';
import { SideBar } from '../HomeComponents/SideBar';
import { useChat } from '../../hooks/useChat';

export const Home = () => {
    const { user, fetchUser, loading } = useUserStore();
    const keyHex = "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f"
    const {
    isSearching,
    roomId,
    conversationId,
    senderId,
    receiverId,
    messages,
    findPartner,
    setMessages
    } = useChat(user, socket);

    if (loading) return <Loading />;
    if (!user) {
        return <p>Please log in.</p>;
    }

    const handleSendMessage = (msg: string) => {
    const timestamp = new Date().toISOString();
    setMessages((prev) => [
        ...prev,
        { senderId: user._id, content: msg, timestamp },
    ]);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            <div className="flex-1 lg:mx-20 flex flex-col h-screen">
                <button
                    className="balsamiq-sans-regular-italic text-browm-100"
                    onClick={() => navigate('/profile')}>
                    <img src={profile} alt="Profile" className="w-12 h-12 rounded-full float-right m-4" />
                </button>
                {/* <Find user={user} socket={socket} /> */}
            </div>
            <div>
                {/* <MessageInput socket={socket} senderId={senderId} receiverId={receiverId} conversationId={conversationId} roomId={roomId} keyHex={ke} onSend={function (message: string): void {
                    throw new Error('Function not implemented.');
                } }/> */}
            </div>
        </div>
    );
};
