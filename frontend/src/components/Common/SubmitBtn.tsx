import React, { useState } from 'react';

interface CustomButtonProps {
    text: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SubmitBtn = ({ text, type, onClick }: CustomButtonProps) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            setDisabled(true); // disable button after first click
            onClick?.(event);  // safely call onClick if defined
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`w-full px-4 sm:px-6 py-2 my-2 mb-1 mt-2 rounded-md shadow-md transition duration-200 
                ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-900 hover:bg-amber-800 text-white'}`}
        >
            {text}
        </button>
    );
};
