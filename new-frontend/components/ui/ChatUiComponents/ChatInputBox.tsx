"use client";

import { useRef, useState } from "react";
import { Disconnect } from "./Disconnect";
import { UserInput } from "./UserInput";
import { EmojiBtn } from "./EmojiBtn";
import { SendMsgBtn } from "./SendMsgBtn";

const ChatInputBox = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log("Send message:", message);

    // send message via socket / API here

    setMessage(""); // clear input after send
  };

  return (
    <div className="w-full px-3 pb-2">
      {/* Input Bar */}
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Disconnect */}
        <Disconnect />

        <div className="flex items-center flex-1 px-3 py-2">
          {/* Message Input */}
          <div className="flex items-center flex-1 bg-gray-100 rounded-xl px-3 py-2">
            <UserInput message={message} setMessage={setMessage} />
            {/* Emoji Btn */}
            <EmojiBtn
              showEmoji={showEmoji}
              setShowEmoji={setShowEmoji}
              onEmojiSelect={handleEmojiClick}
            />
          </div>
        </div>
        <SendMsgBtn onSend={handleSendMessage} />
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-2">Terms & Services</p>
    </div>
  );
};

export default ChatInputBox;
