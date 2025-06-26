import { useEffect } from "react";

interface SignUpPopupProps {
    onClose: () => void;
}

export const SignUpPopup = ({ onClose }: SignUpPopupProps) => {
    useEffect(() => {
        const timeout = setTimeout(onClose, 10000);
        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
                <h2 className="text-3xl font-bold text-yellow-300 mb-2">Don't Be a Stranger</h2>
                <p className="text-gray-700 mb-3 text-sm">
                    Still sliding around like a ghost? 👻
                </p>
                <p className="text-gray-600 mb-4">
                    Get <span className="font-semibold text-brown-700">encrypted chats</span>,
                    a real <span className="font-semibold text-brown-700">username</span>,
                    and your own <span className="font-semibold text-brown-700">profile pic</span> 🍍
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => window.location.href = "/signUp"}
                        className="bg-yellow-400 hover:bg-yellow-300 text-white py-2 px-4 rounded"
                    >
                        Glow up
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-sm"
                    >
                        keep lurking 😎
                    </button>
                </div>
                <p className="text-gray-600 mt-4 text-xs">It’s fast, free, and way more fun.</p>
            </div>
        </div>
    );
};
