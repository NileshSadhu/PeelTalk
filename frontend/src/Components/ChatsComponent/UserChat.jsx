import { FaSearch } from 'react-icons/fa';

const taglines = [
  "Welcome to PeelTalk. Where small talk dies and chaos begins. 💥💬",
  "Tired of your boring friends? Talk to a stranger who probably overshares! 😏",
  "Warning: PeelTalk may expose you to weird opinions, bad flirting, and unexpected life advice. ⚠️🧠",
  "PeelTalk — the place where your next best friend or worst ex could be one click away. 💔😅",
  "Skip the fake profiles. Meet real weirdos here. No filters, just vibes. 🔥😜",
  "We don’t match you by looks or likes — just pure digital roulette. Good luck. 🎰💻",
  "Who needs therapy when you can trauma dump on a stranger for free? 🛋️😂",
  "Talk to someone new. Regret it instantly. Welcome to PeelTalk. 🤷‍♂️🧃",
  "Real people. Random talks. Questionable decisions. Let’s go. 🚀😬",
  "This isn’t Tinder. It’s PeelTalk. Lower your expectations. 💔📱"
];

const UserChat = ({ messages, currentUserId }) => {

  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center gap-4 text-[#4B2E1E] mt-10">
          <FaSearch className="text-4xl" />
          <p className="text-xl font-semibold text-center">
            {randomTagline}
          </p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
              }`}
          >
            <div className="bg-[#F9F4F2] text-[#4B2E1E] p-2 rounded-lg shadow-md max-w-xs">
              <p className="text-sm">{msg.content}</p>
              <p className="text-[10px] text-right mt-1 text-gray-500">
                {/* {new Date(msg.timestamp).toLocaleTimeString()} */}
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserChat;
