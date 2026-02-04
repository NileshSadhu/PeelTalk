"use client";

import { TypingEffect } from "../common/TypingEffect";

export const AuthBranding = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 p-4 w-full">
      <img
        src="/images/logo.png"
        alt="PeelTalk Logo"
        className="w-32 sm:w-40 md:w-48 max-w-48 h-auto object-contain"
      />
      <div className="space-y-2 text-left max-w-full md:max-w-xl">
        <h1 className="balsamiq-sans-bold text-4xl sm:text-5xl md:text-6xl font-bold text-amber-900">
          PeelTalk
        </h1>
        <TypingEffect />
      </div>
    </div>
  );
};
