import { FaBars } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import LogOutBtn from './LogOutBtn';
import { ProfileBtn } from './ProfileBtn';
import ProfileSignUpBtn from '../ProfileComponents/ProfileSignUpBtn';

interface SideBarProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    partnerId: string;
    isGuest: boolean;
}

export const SideBar = ({ isMenuOpen, toggleMenu, partnerId, isGuest }: SideBarProps) => {

    return (
        <>
            {partnerId ? <div></div>
                : <button
                    onClick={toggleMenu}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
                >
                    <FaBars className="text-[#4B2E1E] text-xl" />
                </button>
            }

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu}
                />
            )}

            <div className={`
                fixed lg:static w-64 lg:w-80 h-full bg-gradient-to-b from-yellow-200 to-yellow-100 shadow-lg
                flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>

                <div className="flex flex-col items-center p-6">
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={logo}
                            alt="Banana Logo"
                            className="w-24 h-24 object-contain"
                        />
                        <span className="balsamiq-sans-bold text-brown-900 text-base lg:text-xl">PeelTalk</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-6 items-center">
                    {isGuest ? (
                        // <a
                        //     href="/signUp"
                        //     className="px-4 py-2 bg-yellow-400 text-brown-900 rounded-md hover:bg-yellow-500 transition-colors"
                        // >
                        //     Sign Up
                        // </a>
                        <ProfileSignUpBtn />
                    ) : (
                        <>
                            <ProfileBtn />
                            <LogOutBtn />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
