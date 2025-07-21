import logo from "../../assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-yellow-200 to-white">
      {/* 🍌 Banana Images (manually placed) */}
      <img
        src={logo}
        alt="banana"
        className="absolute top-10 left-4 w-8 h-8 rotate-[-15deg] sm:top-16 sm:left-[10%] sm:w-10 sm:h-10 md:left-[15%]"
      />
      <img
        src={logo}
        alt="banana"
        className="absolute top-10 right-4 w-8 h-8 rotate-[15deg] sm:top-16 sm:right-[10%] sm:w-10 sm:h-10 md:right-[15%]"
      />
      <img
        src={logo}
        alt="banana"
        className="absolute bottom-20 left-6 w-8 h-8 rotate-[-10deg] sm:bottom-28 sm:left-[12%] sm:w-10 sm:h-10"
      />
      <img
        src={logo}
        alt="banana"
        className="absolute bottom-20 right-6 w-8 h-8 rotate-[10deg] sm:bottom-28 sm:right-[12%] sm:w-10 sm:h-10"
      />

      {/* 🍍 Text Content */}
      <h1 className="text-3xl md:text-5xl font-bold text-brown-800 leading-snug">
        Stranger Danger?
        <br />
        <span className="text-4xl md:text-5xl">Nah. Stranger Therapy</span>
      </h1>
      <p className="mt-4 max-w-xl text-gray-700 text-base md:text-lg">
        Talk to weirdos, oversharers, and emotional time bombs — all hiding
        behind fruity usernames. It’s random. It’s raw. It’s PeelTalk.
      </p>

      {/* 🍋 CTA Button */}
      <button className="mt-8 bg-yellow-300 hover:bg-yellow-400 text-brown-800 font-semibold py-2 px-6 rounded-full shadow-md transition">
        ChatLive
      </button>
    </section>
  );
};

export default HeroSection;
