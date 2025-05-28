import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import UserChat from './UserChat';
import { decryptText } from '../../utils/crypto';
import socket from '../../utils/socket';



const ChatWindow = ({ roomId, senderId, receiverId, conversationId, keyHex }) => {
  const [messages, setMessages] = useState([]);

      useEffect(()=>{
        socket.on('chat:message',async(data) => {
          try{
            const decrypted = await decryptText(data.iv, data.message, keyHex);

            const newMessages = {
              senderId: data.senderId,
              content: decrypted,
              timestamp: data.timeStamp
            };
            setMessages((prev) => [...prev, newMessages]);
          }catch(error){
            console.error('Failed to decrypt:', error);
          }
        });

        return ()=> socket.off('chat:message');
      },[keyHex])

      useEffect(() => {
      const chatBox = document.querySelector('.chat-scroll');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]);


  return (
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto chat-scroll px-4 py-2">
      <UserChat messages={messages} currentUserId={senderId} />
    </div>
    <div className="border-t p-2">
      <MessageInput
        socket={socket}
        senderId={senderId}
        receiverId={receiverId}
        roomId={roomId}
        conversationId={conversationId}
        keyHex={keyHex}
        onSend={() => {}}
      />
    </div>
  </div>
);

};

export default ChatWindow;
