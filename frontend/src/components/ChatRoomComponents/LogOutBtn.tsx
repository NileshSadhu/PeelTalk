import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from "../../api/auth";
import { useUserStore } from "../../store/useUserStore";

export const LogoutButton = () => {
    const navigate = useNavigate();
    const { fetchUser } = useUserStore.getState();

    const handleLogout = async () => {
        const result = await logoutUser();

        if(result?.success){
            await fetchUser();
            navigate(result.next!);
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="flex flex-row items-center justify-center gap-1 bg-white rounded-lg p-2 shadow-md hover:shadow-black hover:bg-yellow-100 transition-all w-full"
        >
            <FaSignOutAlt className="text-black-300 text-xl" />
            <span className="text-[#4B2E1E] text-xs balsamiq-sans-regular-italic hidden md:block ml-2">Logout</span>
        </button>
    );
}

export default LogoutButton;
