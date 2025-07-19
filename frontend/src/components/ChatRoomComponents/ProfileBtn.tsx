import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import profile from '../../assets/default_profile.png';

export const ProfileBtn = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();

    return (
        <button
            onClick={() => navigate('/profile')}
            className="flex items-center justify-center w-full bg-white rounded-lg p-2 shadow-md hover:shadow-black hover:bg-yellow-100 transition-all cursor-pointer"
        >
            <img
                src={user?.profilePhoto || profile}
                alt="Profile"
                className="w-6 h-6 rounded-full"
            />
            <p className="text-[#4B2E1E] text-xs balsamiq-sans-regular hidden md:block ml-2">
                Profile
            </p>
        </button>
    );
};
