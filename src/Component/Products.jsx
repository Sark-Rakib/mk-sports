import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "./SkeletonLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/tuitions");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.tuitions || [];
        const approved = data.filter((item) => item.status === "Approved");
        setProducts(approved.slice(0, 20));
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (axiosSecure) fetchProducts();
  }, [axiosSecure]);

  return (
    <section className="py-10">
      <div className="px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
          <div>
            <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
              Featured
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Products
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

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((item) => (
              <Link key={item._id} to={`/products-details/${item._id}`}>
                <motion.div whileHover={{ y: -2 }} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={
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
                  <div>
                    <h3 className="text-[13px] font-medium line-clamp-1 mb-1.5 group-hover:text-[#C8102E] transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {item.discountPrice ? (
                        <>
                          <span className="text-sm font-bold">
                            {item.discountPrice} BDT
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {item.price} BDT
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold">
                          {item.price} BDT
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
