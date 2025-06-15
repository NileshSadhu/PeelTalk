interface PartnerProfileOverlayProps {
    partnerImage: string;
    partnerUsername: string;
    onClose: () => void;
}

export const PartnerProfileOverlay = ({
    partnerImage,
    partnerUsername,
    onClose,
}: PartnerProfileOverlayProps) => {
    return (
        <>
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                onClick={onClose}
            />
            <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[90vw] max-w-sm text-center">
                <img
                    src={partnerImage}
                    alt={`${partnerUsername}'s profile`}
                    className="w-20 h-20 rounded-full mx-auto border border-gray-300"
                />
                <h2 className="mt-4 text-lg font-semibold text-[#4B2E1E] break-words">
                    {partnerUsername}
                </h2>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#4B2E1E] rounded-lg transition w-full max-w-xs"
                >
                    Close
                </button>
            </div>
        </>
    );
};
