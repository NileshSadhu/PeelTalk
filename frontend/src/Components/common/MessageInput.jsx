import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = () => {
  return (
    <div className="p-4 pb-8 relative">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
        <input
          type="text"
          placeholder="Write your message..."
          className="flex-1 px-4 py-2 outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50"
        />
        <button className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors">
          <FaPaperPlane className="text-[#4B2E1E]" />
        </button>
      </div>
      
      {/* Terms & Services */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <a href="#" className="text-xs text-[#4B2E1E]/70 hover:text-[#4B2E1E] transition-colors">
          Terms & Services
        </a>
      </div>
    </div>
  );
};

export default MessageInput; 