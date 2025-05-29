import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import UserChat from './UserChat';
import { decryptText } from '../../utils/crypto';
import socket from '../../utils/socket';



const ChatWindow = ({ roomId, senderId, receiverId, conversationId, keyHex }) => {
  const [messages, setMessages] = useState([]);
  
      useEffect(()=>{
        const handleNewMessage = async(data) => {
          try{
            const decrypted = await decryptText(data.iv, data.content, keyHex);

            const newMessage = {
              senderId: data.senderId,
              content: decrypted,
              timestamp: data.timeStamp,
            }

            setMessages((prev)=> [...prev, newMessage]);
          }catch(error){
              console.error('Failed to decrypt:', error);
          }
        };

        socket.on('chat:message', handleNewMessage);

        return ()=>{
          socket.off('chat:message', handleNewMessage);
        };
      },[keyHex]);


      useEffect(()=>{
        const handleHistory = async ({messages}) => {
          try{
            const decryptedMessages = await Promise.all(
              messages.map(async (msg) => {
                console.log(msg)
                const decrypted = await decryptText(msg.iv, msg.content, keyHex);
                return {
                  senderId: msg.senderId,
                  content: decrypted,
                  timestamp: msg.createdAt,
                };
              })
            );
            setMessages(decryptedMessages);
          }catch(error){
            console.error('Error decrypting chat history:', error);
          }
        };

        socket.on('chat:history', handleHistory);

        return () => {
          socket.off('chat:history', handleHistory);
        };
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
