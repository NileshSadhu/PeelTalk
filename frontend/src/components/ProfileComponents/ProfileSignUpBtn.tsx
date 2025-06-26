import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export const ProfileSignUpBtn = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/signUp");
    };


    return (
        <button
            onClick={handleClick}
            className="flex flex-row items-center justify-center gap-1 bg-white rounded-lg p-2 shadow-md hover:shadow-black hover:bg-yellow-100 transition-all w-full"
        >
            <FaLock className="text-black-300 text-l" />
            <span className="text-[#4B2E1E] text-xs balsamiq-sans-regular-italic hidden md:block ml-2"> Sign Up</span>
        </button>
    );
}

export default ProfileSignUpBtn;
