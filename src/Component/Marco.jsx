import React from "react";

const Marco = () => {
  return (
    <div className="overflow-hidden w-full bg-black text-white py-5 text-center relative">
      <p className="marquee text-sm flex font-semibold absolute -mt-3">
        FUEL YOUR PASSION! DISCOVER TOP-QUALITY JERSEYS AND SPORTING ESSENTIALS
        FOR FANS AND ATHLETES. SHOW OFF YOUR TEAM SPIRIT IN STYLE WITH MK
        SPORTS!
      </p>

      <style jsx>{`
        .marquee {
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marco;
