// src/components/WhyChooseUs.jsx
import React from "react";
import { GiTrophyCup, GiRunningShoe, GiCheckMark } from "react-icons/gi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <GiTrophyCup className="text-[#aba65e] text-5xl mx-auto mb-4" />,
      title: "Top-Quality Jerseys",
      description:
        "Premium jerseys crafted for athletes and fans with comfort and durability in mind.",
    },
    {
      icon: <GiRunningShoe className="text-[#8a854d] text-5xl mx-auto mb-4" />,
      title: "Fast & Reliable Delivery",
      description:
        "Get your favorite sports gear delivered quickly and safely, right to your doorstep.",
    },
    {
      icon: <GiCheckMark className="text-green-500 text-5xl mx-auto mb-4" />,
      title: "Trusted by Athletes",
      description:
        "Our products are loved by professional players and sports enthusiasts alike.",
    },
  ];

  return (
    <section className="py-20">
      <div className="w-11/12 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Why Choose <span className="text-[#aba65e]">MK Sports</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300"
            >
              {feature.icon}
              <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
