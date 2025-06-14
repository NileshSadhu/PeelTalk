import { useState, useEffect } from 'react';
import profile from '../../assets/default_profile.png';
import { useUserStore } from '../../store/useUserStore';
import { socket } from '../../utils/socket';
import { Loading } from '../Common/Loading';
import { SideBar } from './SideBar';
import { ChatWindow } from './ChatWindow';
import { MessageInput } from './MessageInput';
import { useChat } from '../../hooks/useChat';
import { useBeforeUnloadWarning } from '../../hooks/useBeforeUnloadWarning';

const Home = () => {
    const { user, fetchUser, loading } = useUserStore();
    const [partnerProfileImageUrl, setPartnerProfileImageUrl] = useState(profile);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        fetchUser();
    }, []);

    const {
        messages,
        sendMessage,
        disconnect,
        partnerId,
        roomId,
        partnerProfile,
        partnerTyping
    } = useChat({
        socket,
        userId: user?._id || ''
    });

    useBeforeUnloadWarning(!!partnerId)

    const handleFindPartner = async () => {
        if (!user || !user._id) return;
        if (!socket.connected) socket.connect();
        socket.emit('find:partner', { userId: user._id });
    };

    useEffect(() => {
        setPartnerProfileImageUrl(partnerProfile?.profilePhoto || profile)
    }, [partnerProfile]);

    if (loading) return <Loading />;
    if (!user) return <p>Please log in.</p>;

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="flex-1 lg:mx-20 flex flex-col h-screen pt-5">
                <ChatWindow
                    messages={messages}
                    currentUserId={user._id}
                    currentUserImage={user.profilePhoto || profile}
                    partnerImage={partnerProfileImageUrl}
                    onFindPartner={handleFindPartner}
                    currentUsername={user.username}
                    partnerUsername={partnerProfile?.username! || 'Stranger'}
                    partnerId={partnerId ?? undefined}
                    onDisconnect={disconnect}
                    isPartnerTyping={partnerTyping}
                />

                <MessageInput
                    disabled={!roomId}
                    receiverId={partnerId ?? ""}
                    onSend={sendMessage}
                    roomId={roomId!}                
                    />
            </div>
        </div>
    );
};

export default Home;
