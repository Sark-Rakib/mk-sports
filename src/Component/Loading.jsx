import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Subtle black glow */}
      <div className="absolute w-[250px] h-[250px] bg-black/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute w-[180px] h-[180px] bg-black/5 rounded-full blur-2xl animate-pulse"></div>

      {/* Loader content */}
      <div className="flex flex-col items-center gap-6 z-10">
        {/* Minimal spinner */}
        <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        {/* Brand */}
        <h1 className="text-black text-3xl md:text-4xl font-extrabold tracking-widest">
          MK <span className="text-gray-500">SPORTS</span>
        </h1>

        {/* Sub text */}
        <p className="text-gray-500 text-sm tracking-wide">
          Loading your experience...
        </p>

        {/* Dot loader */}
        <div className="flex gap-2 mt-2">
          <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
