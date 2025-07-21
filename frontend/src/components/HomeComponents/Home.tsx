import HeroSection from "./HeroSection";
import Navbar from "./NavBar";

export const Home = () => {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Amber Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
    radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #fde047 100%)
  `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        {/* Add other content here */}
      </div>
    </div>
  );
};
