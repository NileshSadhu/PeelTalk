import { Taglines } from "./Taglines";

interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}

interface ChatWindowProps {
    messages: Message[];
    currentUserId: string;
    currentUserImage: string;
    partnerImage: string;
    onFindPartner?: () => void;
}

export const ChatWindow = ({
    messages,
    currentUserId,
    currentUserImage,
    partnerImage,
    onFindPartner,
}: ChatWindowProps) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center">
                    <Taglines />
                    {onFindPartner && (
                        <button
                            className="mt-6 bg-yellow-400 text-[#4B2E1E] px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                            onClick={onFindPartner}
                        >
                            JuiceMatch
                        </button>
                    )}
                </div>
            ) : (
                <div className="w-full">
                    {messages.map((msg, idx) => {
                        const isCurrentUser = msg.senderId === currentUserId;
                        const avatar = isCurrentUser ? currentUserImage : partnerImage;

                        return (
                            <div key={idx} className={`my-2 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                <div className={`flex items-end gap-2 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                                    <img
                                        src={avatar}
                                        alt="User avatar"
                                        className="w-8 h-8 rounded-full border border-gray-300"
                                    />
                                    <div className="bg-[#F9F4F2] text-[#4B2E1E] p-2 rounded-lg shadow-md max-w-xs">
                                        <p className="text-sm">{msg.content}</p>
                                        <p className="text-[10px] text-right mt-1 text-gray-500">
                                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
