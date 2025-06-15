interface MessageBubbleProps {
    isCurrentUser: boolean;
    avatar: string;
    username: string;
    content: string;
    timestamp: string;
    onAvatarClick?: () => void;
}

export const MessageBubble = ({
    isCurrentUser,
    avatar,
    username,
    content,
    timestamp,
    onAvatarClick
}: MessageBubbleProps) => (
    <div className={`my-2 scroll-mt-20 flex ${isCurrentUser ? "justify-end" : "justify-start"} w-full`}>
        <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} gap-2 items-start max-w-[80%] sm:max-w-[70%]`}>
            <img
                src={avatar}
                alt={`${username}'s avatar`}
                // className="w-10 h-10 rounded-full border border-gray-300"
                className={`w-10 h-10 rounded-full border border-gray-300 ${onAvatarClick ? 'cursor-pointer hover:scale-105 transition' : ''
                    }`}
                onClick={onAvatarClick}
            />
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">{username}</span>
                <div className={`relative bg-[#F9F4F2] text-[#4B2E1E] p-3 rounded-lg shadow
            ${isCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'}
            before:absolute before:bottom-0 before:w-0 before:h-0
            ${isCurrentUser
                        ? 'before:right-0 before:border-l-[12px] before:border-l-[#F9F4F2] before:border-b-[12px] before:border-b-transparent'
                        : 'before:left-0 before:border-r-[12px] before:border-r-[#F9F4F2] before:border-b-[12px] before:border-b-transparent'}`}>
                    <p className="text-sm whitespace-pre-wrap">{content}</p>
                    <p className="text-[10px] text-right mt-1 text-gray-500">
                        {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                    </p>
                </div>
            </div>
        </div>
    </div>
);
