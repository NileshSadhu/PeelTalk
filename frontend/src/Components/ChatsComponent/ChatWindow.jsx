import React, { useState } from 'react';
import MessageInput from './MessageInput';
import UserChat from './UserChat';

const ChatWindow = () => {
  const [userMessage, setUserMessage] = useState('');

  return (
    <div className="flex flex-col h-full">
      <UserChat userMessage={userMessage} />
      <MessageInput onSend={(msg) => setUserMessage(msg)} />
    </div>
  );
};

export default ChatWindow;
