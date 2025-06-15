interface DisconnectProps {
    onDisconnect: () => void;
}

export const Disconnect = ({ onDisconnect }: DisconnectProps) => {
    return (
        <div className="flex justify-center mb-2 md:mb-0 md:mt-0">
            <button
                onClick={onDisconnect}
                className="flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 text-[#4B2E1E] 
                px-4 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow transition-all 
                text-sm sm:text-base font-medium whitespace-nowrap"
            >
                {/* Show full text on small screens and up, emoji fallback for extra-small */}
                <span className="hidden xs:inline">Disconnect</span>
                <span className="inline xs:hidden">❌</span>
            </button>
        </div>
    );
};
