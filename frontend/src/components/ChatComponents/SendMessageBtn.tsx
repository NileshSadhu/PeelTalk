import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface SendBtnProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SendMessageBtn = ({ onClick }: SendBtnProps) => {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-lg bg-yellow-200 hover:bg-yellow-100 transition-colors">
            <FaPaperPlane className="text-[#4B2E1E]" />
        </button>
    );
};