interface PartnerProfilePopupProps {
    imageUrl: string;
    username: string;
    onClose: () => void;
}

export const PartnerProfilePopup = ({ imageUrl, username, onClose }: PartnerProfilePopupProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                    ❌
                </button>
                <img src={imageUrl} alt="Partner Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-semibold">{username}</h3>
            </div>
        </div>
    );
};
