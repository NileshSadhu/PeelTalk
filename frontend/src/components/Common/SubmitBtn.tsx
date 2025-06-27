

interface CustomButtonProps {
    text: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean; 
}

export const SubmitBtn = ({ text, type, onClick, disabled = false }: CustomButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full px-4 sm:px-6 py-2 my-2 mb-1 mt-2 rounded-md shadow-md transition duration-200 
                ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-900 hover:bg-amber-800 text-white'}`}
        >
            {text}
        </button>
    );
};
