import NavBar from "../components/NavBar";

export default function HeroSection() {
  return (
    <div className="relative flex flex-col min-h-screen items-center p-5 bg-linear-to-b from-yellow-300 to-white">
      <NavBar />

      {/* Hero content */}
      <div className="flex flex-1 flex-col justify-center items-center text-center z-10">
        <h1 className="text-5xl font-bold text-amber-900">
          Talk to strangers. Regret it instantly.
        </h1>
        <p className="mt-4 text-amber-800 max-w-xl">
          Talk to weirdos, oversharers, and emotional time bombs all hiding
          behind fruity usernames. It’s random. It’s raw. It’s PeelTalk.
        </p>
        <button className="bg-white px-5 py-2 mt-3 rounded-2xl shadow-md hover:bg-yellow-100">
          Chat Now
        </button>
      </div>
    </div>
  );
}
