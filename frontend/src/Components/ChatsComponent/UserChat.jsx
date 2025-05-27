import React from 'react';
import { FaSearch } from 'react-icons/fa';

const UserChat = ({ userMessage }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      {userMessage ? (
        <div className="bg-[#F9F4F2] text-[#4B2E1E] p-3 rounded-lg shadow-md max-w-sm text-center">
          <p className="text-sm">{userMessage}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-[#4B2E1E]">
          <FaSearch className="text-4xl mb-2" />
          <p className="text-xl font-semibold text-center">
            Send "HI" to start the conversation!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserChat;
