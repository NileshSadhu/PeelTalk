import { useNavigate } from 'react-router-dom';

function ViseVerse({ text }) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (text.includes("Login")) {
            navigate("/login");
        }
        else {
            navigate("/register");
        }
    }

    return (
        <div className="text-center mt-1.5">
            <button
                onClick={handleClick}
                className="balsamiq-sans-bold font-medium text-[12px] text-amber-900">
                {text}
            </button>
        </div>
    )
}

export default ViseVerse;