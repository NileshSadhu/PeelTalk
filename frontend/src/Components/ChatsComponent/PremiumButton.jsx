import React from 'react';
import { FaCrown } from 'react-icons/fa';

const PremiumButton = ({ text }) => {
    return (
        <button className="flex flex-row items-center justify-center gap-1 bg-white rounded-lg p-2 shadow-md hover:shadow-black hover:bg-yellow-100 transition-colors transition-all">
            <FaCrown className="text-[#4B2E1E] text-xl" />
            <span className="text-[#4B2E1E] text-xs balsamiq-sans-regular-italic hidden md:block ml-2">{text}</span>
        </button>
    );
}

export default PremiumButton;
