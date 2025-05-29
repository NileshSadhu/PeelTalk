import { FaPaperPlane } from 'react-icons/fa';

function SendBtn({ onClick }) {

    return (
        <button
            onClick={onClick}
            className="p-2 rounded-lg bg-yellow-200 hover:bg-yellow-100 transition-colors">
            <FaPaperPlane className="text-[#4B2E1E]" />
        </button>
    )
}

export default SendBtn;