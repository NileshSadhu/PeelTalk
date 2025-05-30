import { Taglines } from "./Taglines";

interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}

interface ChatWindowProps {
    messages: Message[];
    currentUserId: string;
}

export const ChatWindow = ({ messages, currentUserId }: ChatWindowProps) => {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
                <Taglines />
            ) : (
                messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`my-2 flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div className="bg-[#F9F4F2] text-[#4B2E1E] p-2 rounded-lg shadow-md max-w-xs">
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-[10px] text-right mt-1 text-gray-500">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};