import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "../Component/Loading";
import "swiper/css";
import "swiper/css/effect-coverflow";
import HeroSection from "../Component/HeroSection";
import CustomerReviewSwiper from "../Component/CustomerReviewSwiper";
import WhyChooseUs from "../Component/WhyChooseUs";
import Products from "../Component/Products";
import Category from "../Component/Category";

const HomePage = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div>
      <HeroSection />
      <Category />
      <Products />
      <WhyChooseUs />

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
              Testimonials
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Our Customers Say
            </h2>
          </div>
          <CustomerReviewSwiper />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
