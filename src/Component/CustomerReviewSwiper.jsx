// src/components/CustomerReviewSwiper.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import useAxiosSecure from "../Hooks/useAxios";
import { Autoplay } from "swiper/modules";
import { CiStar } from "react-icons/ci";

const CustomerReviewSwiper = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/reviews");
        setReviews(
          Array.isArray(res.data) ? res.data : res.data?.reviews || [],
        );
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  if (loading) return <p className="text-center py-20">Loading reviews...</p>;
  if (reviews.length === 0)
    return <p className="text-center py-20">No reviews found 😢</p>;

  return (
    <section className="max-w-6xl mx-auto px-5 py-5">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
      >
        {reviews.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="p-6 flex flex-col items-center text-center">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover mb-4"
                />
              )}
              <p className="italic mb-2">"{item.message}"</p>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: item.rating }, (_, i) => (
                  <CiStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="font-semibold">{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviewSwiper;
