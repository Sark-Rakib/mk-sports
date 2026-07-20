import React from "react";
import { Link } from "react-router";
import shortPant from "../assets/shortspant.webp";
import Jersey from "../assets/jersey.webp";
import Tracksuit from "../assets/tracksuit.webp";
import AllProducts from "../assets/allProducts.webp";

const Category = () => {
  const categories = [
    {
      id: "all",
      name: "All Products",
      image: AllProducts,
      link: "/all-products",
    },
    {
      id: "jersey",
      name: "Jersey",
      image: Jersey,
      link: "/jersey",
    },
    {
      id: "short-pant",
      name: "Short Pant",
      image: shortPant,
      link: "/pant",
    },
    {
      id: "tracksuit",
      name: "Tracksuit",
      image: Tracksuit,
      link: "/tracksuit",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="px-7">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
          <div>
            <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
              Browse
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shop by Category
            </h2>
          </div>
          <Link
            to="/all-products"
            className="mt-4 sm:mt-0 text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 hover:text-[#C8102E] transition-colors flex items-center gap-2 group"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"
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
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className="group relative aspect-[3/4] overflow-hidden bg-gray-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-white text-[13px] font-semibold tracking-[0.05em] mb-1">
                  {category.name}
                </p>
                <span className="text-white/60 text-[10px] tracking-[0.15em] uppercase group-hover:text-[#C8102E] transition-colors">
                  Shop Now
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute top-5 right-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
