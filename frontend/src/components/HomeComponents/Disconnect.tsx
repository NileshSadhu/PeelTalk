interface DisconnectProps {
    onDisconnect: () => void;
}

export const Disconnect = ({ onDisconnect }: DisconnectProps) => {
    return (
        <div className="flex justify-center mt-6">
            <button
                className="bg-yellow-400 text-[#4B2E1E] px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
                onClick={onDisconnect}
            >
                Disconnect
            </button>
        </div>
    );
};
