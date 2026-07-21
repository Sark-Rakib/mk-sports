import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [pause, setPause] = useState(false);

  const length = images.length;

  useEffect(() => {
    if (pause || length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pause, length]);

  if (!images.length) return null;

  // const prevSlide = () => {
  //   setCurrent((prev) => (prev - 1 + length) % length);
  // };

  // const nextSlide = () => {
  //   setCurrent((prev) => (prev + 1) % length);
  // };

  return (
    <div
      className="w-full max-w-3xl mx-auto"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      {/* Main Image */}
      <div className="relative overflow-hidden rounded">
        <div className="relative h-[360px] sm:h-[460px] lg:h-[560px]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 ease-out
              ${
                current === index
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-105 translate-x-6 pointer-events-none"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-lg text-xs font-semibold">
          {current + 1} / {length}
        </div>

        {/* Previous */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:bg-black hover:scale-110"
        >
          <FiChevronLeft size={22} />
        </button> */}

        {/* Next */}
        {/* <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:bg-black hover:scale-110"
        >
          <FiChevronRight size={22} />
        </button> */}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex justify-center flex-wrap gap-3 mt-6">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded overflow-hidden border transition-all duration-300 ${
              current === index
                ? "border-black shadow-lg scale-105"
                : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover bg-white"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
