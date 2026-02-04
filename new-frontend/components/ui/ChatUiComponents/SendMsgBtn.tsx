import { FaPaperPlane } from "react-icons/fa";

interface SendMsgBtnProps {
  onSend: () => void;
}

export const SendMsgBtn = ({ onSend }: SendMsgBtnProps) => {
  return (
    <button
      type="button"
      onClick={onSend}
      className="p-2 sm:p-2.5 rounded-full bg-[#FFF872] hover:bg-yellow-200 transition-colors"
    >
      <FaPaperPlane className="text-[#4B2E1E] text-base sm:text-lg" />
    </button>
  );
};
