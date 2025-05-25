import React from 'react';
import { FaCrown } from 'react-icons/fa';

const PremiumButton = ({ text }) => {
    return (
        <button className="flex flex-col items-center gap-1 bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all">
            <FaCrown className="text-[#4B2E1E] text-xl" />
            <span className="text-[#4B2E1E] text-xs font-semibold hidden md:block">{text}</span>
        </button>
    )
}

export default PremiumButton;