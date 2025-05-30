import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignOutAlt } from 'react-icons/fa';

export const LogoutButton = () => {
    const navigate = useNavigate();
    const backend_api = import.meta.env.VITE_BACKEND_URL;

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${backend_api}/user/logout`, {}, {
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success("Logged out successfully.");
                navigate("/login");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex flex-row items-center justify-center gap-1 bg-white rounded-lg p-2 shadow-md hover:shadow-black hover:bg-yellow-100 transition-all w-full"
        >
            <FaSignOutAlt className="text-[#4B2E1E] text-xl" />
            <span className="text-[#4B2E1E] text-xs balsamiq-sans-regular-italic hidden md:block ml-2">Logout</span>
        </button>
    );
}

export default LogoutButton;
