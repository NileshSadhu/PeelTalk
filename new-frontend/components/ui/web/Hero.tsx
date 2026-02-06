"use client";
import "../../../app/globals.css";

const Hero = () => {
  return (
    <header>
      <div
        className="
      heroPadding bg-[#FFF872]
  flex flex-col pb-10
  items-center text-center
  lg:items-start lg:text-left
  lg:pl-24
      "
      >
        <p className="italic text-sm text-[#653516]">
          "Got shit to say ? Say it here."
        </p>

        <h1 className="text-6xl text-white mt-1 font-bold text-outline">
          Peel<span className="text-[#653516]">talk</span>
        </h1>

        <button className="bg-white text-[#653516] font-semibold px-8 py-3 mt-2 shadow-md">
          Join the Community
        </button>
      </div>
      <div className="custom-shape-divider-top-1769697554">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Hero;
