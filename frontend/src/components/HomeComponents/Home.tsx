import { useState, useEffect } from 'react';
import profile from '../../assets/default_profile.png';
import { useUserStore } from '../../store/useUserStore';
import { socket } from '../../utils/socket';
import { Loading } from '../Common/Loading';
import { SideBar } from './SideBar';
import { ChatWindow } from './ChatWindow';
import { MessageInput } from '../ChatComponents/MessageInput';
import { useChat } from '../../hooks/useChat';
import { useBeforeUnloadWarning } from '../../hooks/useBeforeUnloadWarning';
import { Disconnect } from '../ChatComponents/Disconnect';

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

    useBeforeUnloadWarning(!!partnerId);

    const handleFindPartner = async () => {
        if (!user || !user._id) return;
        if (!socket.connected) socket.connect();
        socket.emit('find:partner', { userId: user._id });
    };

    useEffect(() => {
        setPartnerProfileImageUrl(partnerProfile?.profilePhoto || profile);
    }, [partnerProfile]);

    if (loading) return <Loading />;
    if (!user) return <p>Please log in.</p>;

    return (
        <div className="flex flex-col sm:flex-row h-screen w-full bg-white overflow-hidden">
            <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            <div className="flex-1 flex flex-col h-full pt-4 px-4 sm:px-6 lg:px-10 xl:mx-20 max-w-screen-lg mx-auto w-full">
                
                {/* Let ChatWindow expand to fill space */}
                <div className="flex-1 overflow-hidden">
                    <ChatWindow
                        messages={messages}
                        currentUserId={user._id}
                        currentUserImage={user.profilePhoto || profile}
                        partnerImage={partnerProfileImageUrl}
                        onFindPartner={handleFindPartner}
                        currentUsername={user.username}
                        partnerUsername={partnerProfile?.username || 'Stranger'}
                        partnerId={partnerId ?? undefined}
                        onDisconnect={disconnect}
                        isPartnerTyping={partnerTyping}
                    />
                </div>

                {/* Input Area */}
                <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 bg-white flex items-center gap-2 flex-nowrap">
                    {partnerId && (
                        <div className="shrink-0">
                            <Disconnect onDisconnect={disconnect} />
                        </div>
                    )}

                    <div className="flex-1">
                        <MessageInput
                            disabled={!roomId}
                            receiverId={partnerId ?? ""}
                            onSend={sendMessage}
                            roomId={roomId!}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
