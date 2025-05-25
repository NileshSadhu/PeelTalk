import React, { useState } from 'react';
import { FaBars, FaCrown, FaPaperPlane, FaSearch } from 'react-icons/fa';
import PremiumButton from './common/PremiumButton';
import UserChat from './common/UserChat';
import MessageInput from './common/MessageInput';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Hamburger Menu Button (visible on mobile) */}
      <button 
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
      >
        <FaBars className="text-[#4B2E1E] text-xl" />
      </button>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Left Navbar */}
      <div className={`
        w-64 lg:w-24 fixed h-full bg-gradient-to-b from-yellow-400 to-yellow-100 p-4
        flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col items-center">
          {/* Logo and Title */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="/banana-logo.svg" 
              alt="Banana Logo" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkZENzAwIj48cGF0aCBkPSJNNCAxMmMwLTQuNDE4IDMuNTgyLTggOC04czggMy41ODIgOCA4LTMuNTgyIDgtOCA4LTgtMy41ODItOC04eiIvPjwvc3ZnPg=='
              }}
            />
            <span className="font-bold text-brown-800 text-base lg:text-sm">Banana</span>
          </div>
        </div>
        
        {/* Premium Button */}
        <PremiumButton text="Premium" />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 lg:ml-24 flex flex-col h-screen">
        <UserChat />
        <MessageInput />
      </div>
    </div>
  );
};

export default HomePage; 