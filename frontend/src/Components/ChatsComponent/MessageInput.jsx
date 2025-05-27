import { useState } from 'react';
import SendBtn from './SendBtn';
import axios from 'axios';
import { toast } from 'react-toastify';


const MessageInput = () => {
  const [message, setMessage] = useState('');

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    try {
      const backend_api = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backend_api}/message`, {
        message,
      });

      if (response.status === 200) {
        toast.success('Message sent successfully');
        onSend(message);
        setMessage('');
      } else {
        toast.error('Message not sent');
      }
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    }
  }


  return (
    <div className="p-4 pb-8 relative mr-5">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e);
            }
          }}
          placeholder="Write your message..."
          className="flex-1 px-4 py-2 mr-10 outline-none text-[#4B2E1E] placeholder-[#4B2E1E]/50"
        />
        <SendBtn onClick={handleSendMessage} />
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