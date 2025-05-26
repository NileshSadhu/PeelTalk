import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogoutButton() {
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
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
