import { FaPaperPlane } from 'react-icons/fa';

function SendBtn({ onClick }) {

    return (
        <button
            onClick={onClick}
            className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors">
            <FaPaperPlane className="text-[#4B2E1E]" />
        </button>
    )
}

export default SendBtn;