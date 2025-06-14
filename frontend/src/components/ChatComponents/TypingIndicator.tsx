interface TypingIndicatorProps {
    partnerImage: string;
    partnerUsername: string;
}

export const TypingIndicator = ({ partnerImage, partnerUsername }: TypingIndicatorProps) => (
    <div className="items-center gap-2 mt-2">
        <div className="flex gap-2">
            <img
                src={partnerImage}
                alt="Partner avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span>{partnerUsername}</span>
        </div>
        <div className="flex items-center gap-1 mt-2 ml-8">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
    </div>
);
