import { FaBars } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  partnerId?: string;
  isGuest: boolean;
}

export const Sidebar = ({
  isOpen,
  onToggle,
  partnerId,
  isGuest,
}: SidebarProps) => {
  const shouldShowMenuButton = !partnerId;

  return (
    <>
      {/* Mobile menu button */}
      {shouldShowMenuButton && (
        <button
          onClick={onToggle}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
        >
          <FaBars className="text-[#4B2E1E] text-xl" />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static w-64 lg:w-80 h-full
          bg-linear-to-b from-yellow-200 to-yellow-100
          shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col justify-between
        `}
      >
        {/* Logo */}
        <div className="flex flex-col items-center p-6 gap-2">
          <Image
            src={logo}
            alt="PeelTalk Logo"
            width={96}
            height={96}
            priority
          />
          <span className="balsamiq-sans-bold text-brown-900 text-base lg:text-xl">
            PeelTalk
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 p-6 items-center">
          {isGuest ? (
            <p className="text-brown-800 text-sm">Welcome, Guest 👋</p>
          ) : (
            <p className="text-brown-900">Hello</p>
          )}
        </div>
      </aside>
    </>
  );
};
