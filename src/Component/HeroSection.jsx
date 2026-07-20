import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axiosSecure.get("/photos");
        const heroImages = res.data.map((product) => product.images[0]);
        setImages(heroImages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, [axiosSecure]);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <Link to="/all-products">
      <section className="relative w-full h-[40vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden bg-black cursor-pointer group">
        {/* Carousel */}
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: current === index ? 0.8 : 0,
                scale: current === index ? 1 : 1.1,
              }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          ))}
        </div>

        {/* Dark gradient overlays - lighter on mobile so image shows */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent sm:via-black/30 sm:to-black/10" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-14 sm:pb-20 lg:pb-28 px-5 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
              New Collection 2026
            </p>
            <h1
              className="text-white text-4xl sm:text-6xl lg:text-[110px] font-bold leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              GEAR UP
              <br />
              <span className="italic font-normal">for</span>{" "}
              <span className="text-[#C8102E]">Greatness</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-6 max-w-md leading-relaxed">
              Premium sportswear crafted for athletes who demand the best.
              Performance meets style.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#C8102E] hover:text-white transition-all duration-500 group-hover:translate-x-1">
                Shop Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase hidden sm:block">
                Free shipping on orders over ৳2000
              </span>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrent(index);
                }}
                className={`h-[2px] transition-all duration-500 ${
                  current === index
                    ? "w-8 bg-[#C8102E]"
                    : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </Link>
  );
};

export default HeroSection;
