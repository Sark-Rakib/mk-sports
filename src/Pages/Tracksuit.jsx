import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "../Component/SkeletonLoader";

const Tracksuit = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/products?category=Track Suit");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];
        setProducts(data.filter((item) => item.status === "Approved"));
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="px-7 py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
      </div>
    );
  }

  return (
    <section className="py-14">
      <title>MK Sports | Tracksuits</title>
      <div className="px-7">
        <div className="mb-14">
          <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
            Collection
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All Tracksuits
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((item) => (
            <Link key={item._id} to={`/products-details/${item._id}`}>
              <motion.div whileHover={{ y: -2 }} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={
                      item.images[0]?.url ||
                      item.images[0] ||
                      "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-0 left-0 bg-black text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1.5">
                    {item.ability}
                  </div>
                </div>
                <h3 className="text-[13px] font-medium text-gray-900 line-clamp-1 mb-1.5 group-hover:text-[#C8102E] transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  {item.discountPrice ? (
                    <>
                      <span className="text-sm font-bold text-gray-900">
                        {item.discountPrice} BDT
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {item.price} BDT
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-gray-900">
                      {item.price} BDT
                    </span>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-32">
            <div className="text-5xl mb-3 opacity-30">\uD83E\uDDE5</div>
            <p className="text-gray-400 text-sm">No tracksuit items found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tracksuit;
