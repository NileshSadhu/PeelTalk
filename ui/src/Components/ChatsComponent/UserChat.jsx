import { FaSearch } from 'react-icons/fa';

const UserChat = ({ messages, currentUserId }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center gap-4 text-[#4B2E1E] mt-10">
          <FaSearch className="text-4xl" />
          <p className="text-xl font-semibold text-center">
            Send "HI" to start the conversation!
          </p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${
              msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="bg-[#F9F4F2] text-[#4B2E1E] p-2 rounded-lg shadow-md max-w-xs">
              <p className="text-sm">{msg.content}</p>
              <p className="text-[10px] text-right mt-1 text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserChat;
