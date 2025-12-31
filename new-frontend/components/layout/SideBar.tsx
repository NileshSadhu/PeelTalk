// 'use client'

// import Image from 'next/image'
// import { FaBars } from 'react-icons/fa'
// import LogOutBtn from './LogOutBtn'
// import { ProfileBtn } from './ProfileBtn'
// import ProfileSignUpBtn from '../ProfileComponents/ProfileSignUpBtn'

// interface SideBarProps {
//     isMenuOpen: boolean
//     toggleMenu: () => void
//     partnerId: string
//     isGuest: boolean
// }

// export const SideBar = ({
//     isMenuOpen,
//     toggleMenu,
//     partnerId,
//     isGuest,
// }: SideBarProps) => {
//     return (
//         <>
//         {!partnerId && (
//             <button
//             onClick={toggleMenu}
//             className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
//             aria-label="Toggle menu"
//             >
//             <FaBars className="text-[#4B2E1E] text-xl" />
//             </button>
//         )}

//         {isMenuOpen && (
//             <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={toggleMenu}
//             />
//         )}

//         <aside
//             className={`
//             fixed lg:static w-64 lg:w-80 h-full
//             bg-linear-to-b from-yellow-200 to-yellow-100
//             shadow-lg flex flex-col justify-between z-50
//             transform transition-transform duration-300 ease-in-out
//             ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//             `}
//         >
//             {/* Logo */}
//             <div className="flex flex-col items-center p-6">
//             <div className="flex flex-col items-center gap-2">
//                 <Image
//                 src="/logo/logo.png"
//                 alt="PeelTalk Logo"
//                 width={96}
//                 height={96}
//                 priority
//                 className="object-contain"
//                 />
//                 <span className="balsamiq-sans-bold text-brown-900 text-base lg:text-xl">
//                 PeelTalk
//                 </span>
//             </div>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col gap-4 p-6 items-center">
//             {isGuest ? (
//                 <ProfileSignUpBtn />
//             ) : (
//                 <>
//                 <ProfileBtn />
//                 <LogOutBtn />
//                 </>
//             )}
//             </div>
//         </aside>
//         </>
//     )
// }
