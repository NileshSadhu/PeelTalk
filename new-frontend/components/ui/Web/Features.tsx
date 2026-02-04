"use client";

import { useEffect } from "react";

const Features = () => {
  const data = [
    {
      source: "/oneChat.png",
      title: "Juice Connect",
      paragraph:
        "Instant one-on-one chats with random Peelsters worldwide. No waiting. No profiles. Just pure conversation.",
    },
    {
      source: "/public.png",
      title: "ChatPit",
      paragraph:
        "Jump into live group rooms where ideas collide and conversations never sleep. Watch, join, or just vibe with the crowd.",
    },
    {
      source: "/speedRun.png",
      title: "Speed Run",
      paragraph:
        "New Peelster every minute. Up to 5 rapid-fire matches in one run. Fast talks. Fresh minds. No dull moments.",
    },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="bg-white marginSection">
        {/* Heading */}
        <div className="text-center mb-30 reveal">
          <h1 className="text-3xl md:text-4xl font-bold text-[#653516]">
            Why Peelsters love Peeltalk
          </h1>
          <p className="text-[#653516] mt-2">Talk. Clash. Connect.</p>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center reveal">
              <img src={item.source} alt={item.title} className="h-20 mb-4" />

              <h3 className="text-lg font-semibold text-[#653516] mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-[#653516] opacity-80 max-w-xs">
                {item.paragraph}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Features;
