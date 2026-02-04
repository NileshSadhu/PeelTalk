interface ChatInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInput = ({ message, setMessage }: ChatInputProps) => {
  return (
    <textarea
      onChange={(e) => setMessage(e.target.value)}
      value={message}
      rows={1}
      placeholder="Type a message..."
      className="flex-1 resize-none bg-transparent outline-none placeholder-gray-500 text-sm"
    />
  );
};
