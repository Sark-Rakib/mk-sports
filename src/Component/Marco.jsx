import React from "react";

const Marco = () => {
  return (
    <div className="overflow-hidden w-full bg-black text-white py-2.5 text-center relative">
      <p className="marquee text-[10px] tracking-[0.2em] uppercase font-medium">
        Free shipping on orders over ৳2000 &mdash; Fuel Your Passion with MK Sports &mdash; Premium Quality Guaranteed
      </p>

      <style>{`
        .marquee {
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Marco;
