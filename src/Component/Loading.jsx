import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
        <div className="text-center">
          <h1 className="text-black text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            MK <span className="text-[#C8102E]">SPORTS</span>
          </h1>
          <p className="text-gray-400 text-[11px] tracking-[0.2em] uppercase mt-2">Loading</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
