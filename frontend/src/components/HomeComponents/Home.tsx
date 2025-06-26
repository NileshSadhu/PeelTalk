import { useState, useEffect } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { socket } from '../../utils/socket';
import { Loading } from '../Common/Loading';
import { SideBar } from './SideBar';
import { ChatWindow } from './ChatWindow';
import { MessageInput } from '../ChatComponents/MessageInput';
import { useChat } from '../../hooks/useChat';
import { useBeforeUnloadWarning } from '../../hooks/useBeforeUnloadWarning';
import { Disconnect } from '../ChatComponents/Disconnect';
import { SignUpPopup } from '../Common/SignUpPopup';
import { resolveProfilePhoto } from '../../utils/resolveProfilePhoto';


const Home = () => {
    const { user, loading } = useUserStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        if (!user?._id?.startsWith("guest-")) return;

        const lastShown = localStorage.getItem("lastSignupPopupShown");

        if (!lastShown) {
            localStorage.setItem("lastSignupPopupShown", Date.now().toString());
            return;
        }

        const hoursSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);

        if (hoursSince >= 3) {
            setShowPopup(true);
            localStorage.setItem("lastSignupPopupShown", Date.now().toString());
        }
    }, [user]);

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
        socket.emit('find:partner', { userId: user._id, username: user.username });
    };


    if (loading) return <Loading />;

    if (!user || !user._id) {
        return <p>Something went wrong. Please refresh the page.</p>;
    }

    const isGuest = user._id.startsWith("guest-");


    return (
        <>
            {isGuest && showPopup && <SignUpPopup onClose={() => setShowPopup(false)} />}
        <div className="flex flex-col sm:flex-row h-screen w-full bg-white overflow-hidden">
            <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} partnerId={partnerId!} isGuest={isGuest}/>

            <div className="flex-1 flex flex-col min-h-0 pt-4 px-4 sm:px-6 lg:px-10 xl:mx-20 max-w-screen-lg mx-auto w-full">
                
                {/* Let ChatWindow expand to fill space */}
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                    <ChatWindow
                        messages={messages}
                        currentUserId={user._id}
                        currentUserImage={resolveProfilePhoto(user.username, user.profilePhoto)}
                        partnerImage={resolveProfilePhoto(partnerProfile?.username || '', partnerProfile?.profilePhoto || null)}
                        onFindPartner={handleFindPartner}
                        currentUsername={user.username}
                        partnerUsername={partnerProfile?.username || 'Stranger'}
                        partnerId={partnerId ?? undefined}
                        onDisconnect={disconnect}
                        isPartnerTyping={partnerTyping}
                    />
                </div>

                {/* Input Area */}
                <div className="w-full md:px-4 py-2 sm:py-3 border-t border-gray-200 bg-white flex items-center gap-2">
                {partnerId && (
                    <div className="shrink-0 mb-4">
                    <Disconnect onDisconnect={disconnect} />
                    </div>
                )}
                
                <MessageInput
                    disabled={!roomId}
                    receiverId={partnerId ?? ""}
                    onSend={sendMessage}
                    roomId={roomId!}
                />
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;
