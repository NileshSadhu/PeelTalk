import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React from "react";

interface EmojiBtnProps {
  showEmoji: boolean;
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiBtn = ({
  showEmoji,
  setShowEmoji,
  onEmojiSelect,
}: EmojiBtnProps) => {
  return (
    <>
      <button
        className="ml-2 text-xl text-gray-400 hover:text-yellow-400 transition"
        title="Emoji"
        onClick={() => setShowEmoji((prev) => !prev)}
      >
        😊
      </button>
      {showEmoji && (
        <div style={{ position: "absolute", bottom: "60px", right: "10px" }}>
          <EmojiPicker
            onEmojiClick={(emojiData: EmojiClickData) => {
              onEmojiSelect(emojiData.emoji);
            }}
          />
        </div>
      )}
    </>
  );
};
