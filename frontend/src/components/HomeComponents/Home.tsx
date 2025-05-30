import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/default_profile.png';
import { socket } from '../../utils/socket';
import { useUserStore } from '../../store/useUserStore';
import { Loading } from '../Common/Loading';
import { SideBar } from '../HomeComponents/SideBar';
import { Find } from '../HomeComponents/Find';
import type { User, UserStoreState } from '../../types/user';

const Home = () => {
    const { user, fetchUser, loading } = useUserStore((state: UserStoreState) => ({
        user: state.user,
        fetchUser: state.fetchUser,
        loading: state.loading
    }));

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (loading) return <Loading />;
    if (!user) {
        return <p>Please log in.</p>;
    }

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <SideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            <div className="flex-1 lg:mx-20 flex flex-col h-screen">
                <button
                    className="balsamiq-sans-regular-italic text-browm-100"
                    onClick={() => navigate('/profile')}>
                    <img src={profile} alt="Profile" className="w-12 h-12 rounded-full float-right m-4" />
                </button>
                <Find user={user} socket={socket} />
            </div>
        </div>
    );
};

export default Home;