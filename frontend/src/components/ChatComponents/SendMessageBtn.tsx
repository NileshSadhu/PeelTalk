import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface SendBtnProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SendMessageBtn = ({ onClick }: SendBtnProps) => {
    return (
        <button
            onClick={onClick}
            className="p-2 sm:p-2.5 rounded-full bg-yellow-400 hover:bg-yellow-200 transition-colors"
        >
            <FaPaperPlane className="text-[#4B2E1E] text-base sm:text-lg" />
        </button>
    );
};
