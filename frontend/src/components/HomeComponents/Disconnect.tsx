interface DisconnectProps {
    onDisconnect: () => void;
}

export const Disconnect = ({ onDisconnect }: DisconnectProps) => {
    return (
        <div className="flex justify-center mt-6">
            <button onClick={onDisconnect} className="bg-yellow-400 text-[#4B2E1E] px-4 py-2 rounded-md shadow hover:bg-yellow-500 transition text-sm">
            Disconnect
            </button>
        </div>
    );
};
