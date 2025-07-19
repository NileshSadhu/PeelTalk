import { FaSearch } from "react-icons/fa";

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

export const Taglines = () => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    return (
        <div className="flex flex-col items-center gap-4 text-[#4B2E1E] mt-10 px-4">
            <FaSearch className="text-3xl sm:text-4xl md:text-5xl" />
            <p className="text-base sm:text-lg md:text-xl font-semibold text-center max-w-[90vw] break-words">
                {randomTagline}
            </p>
        </div>
    )
}