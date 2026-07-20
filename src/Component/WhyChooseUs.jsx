import React from "react";
import { GiTrophyCup, GiRunningShoe, GiCheckMark } from "react-icons/gi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <GiTrophyCup />,
      title: "Premium Quality",
      description:
        "Every piece is crafted with the finest materials for lasting performance and comfort.",
    },
    {
      icon: <GiRunningShoe />,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping right to your doorstep. Track every step of the way.",
    },
    {
      icon: <GiCheckMark />,
      title: "Trusted by Athletes",
      description:
        "Worn by professionals and fans alike. Quality that speaks for itself.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
            Why Us
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built for Performance
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl text-[#C8102E] border border-[#C8102E]/20 group-hover:bg-[#C8102E] group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3
                className="text-lg font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
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
