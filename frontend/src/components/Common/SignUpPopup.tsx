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
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Banana Upgrade 🍌</h2>
            <p className="text-gray-700 mb-3">
            Still chatting like a guest? 😶
            </p>
            <p className="text-gray-600 mb-4">
            Unlock <span className="font-semibold text-brown-700">encrypted chats</span>,
            your <span className="font-semibold text-brown-700">own username</span>,
            and a <span className="font-semibold text-brown-700">profile pic</span> 🍍
            </p>
            <div className="flex gap-3 justify-center">
            <button
                onClick={() => window.location.href = "/signUp"}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            >
                Upgrade Me
            </button>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-sm"
            >
                I like being anonymous 😎
            </button>
            </div>
        </div>
        </div>
    );
};
