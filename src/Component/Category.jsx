import React, { useState } from "react";
import { Link } from "react-router";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "🛍️", link: "/all-products" },
    { id: "jersey", name: "Jersey", icon: "👕", link: "/jersey" },
    {
      id: "short-pant",
      name: "Short Pant",
      icon: "🩳",
      link: "pant",
    },
    {
      id: "tracksuit",
      name: "Tracksuit",
      icon: "🧥",
      link: "/tracksuit",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by <span className="text-[#aba65e]">Category</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="p-6 rounded border hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3 shadow-sm text-center"
            >
              <span className="text-3xl">{category.icon}</span>
              <p className="font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
