import SendBtn from './SendBtn';

const MessageInput = () => {
  return (
    <div className="p-4 pb-8 relative mr-5">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
        <input
          type="text"
          placeholder="Write your message..."
          className="flex-1 px-4 py-2 mr-10 outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50"
        />
        <SendBtn />
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