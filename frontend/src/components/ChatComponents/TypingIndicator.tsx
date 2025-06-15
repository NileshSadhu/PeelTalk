interface TypingIndicatorProps {
    partnerImage: string;
    partnerUsername: string;
}

export const TypingIndicator = ({ partnerImage, partnerUsername }: TypingIndicatorProps) => (
    <div className="flex flex-col items-start gap-1 mt-3 ml-2 sm:ml-4">
        <div className="flex items-center gap-2">
            <img
                src={partnerImage}
                alt={`${partnerUsername} avatar`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300"
            />
            <span className="text-sm sm:text-base text-[#4B2E1E] font-medium">{partnerUsername}</span>
        </div>
        <div className="flex items-center gap-1 pl-9">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
    </div>
);
