// src/pages/BlogPage.jsx
import React from "react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Jerseys for 2026 Season",
    date: "March 8, 2026",
    summary:
      "Discover the best jerseys for athletes and fans this season. Comfortable, stylish, and perfect for showing team spirit.",
    // link: "/blog/1",
  },
  {
    id: 2,
    title: "How to Choose the Right Tracksuit",
    date: "March 5, 2026",
    summary:
      "A complete guide to selecting the perfect tracksuit for workouts, training, or casual wear.",
    // link: "/blog/2",
  },
  {
    id: 3,
    title: "Essential Shorts and Pants for Every Player",
    date: "March 1, 2026",
    summary:
      "Learn which shorts and pants provide the best comfort, flexibility, and durability for your game.",
    // link: "/blog/3",
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12">
      <title>MK Sports Blog</title>
      <h1 className="text-4xl font-bold text-center mb-12 text-[#aba65e]">
        MK Sports Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl text-black font-semibold mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{blog.date}</p>
              <p className="text-gray-700 mb-6">{blog.summary}</p>
              <a
                href={blog.link}
                className="text-white bg-[#aba65e] px-4 py-2 rounded hover:bg-[#8a854d] transition-colors duration-300"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
