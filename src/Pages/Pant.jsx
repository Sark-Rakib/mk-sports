import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "../Component/SkeletonLoader";

const Pant = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchSweetProducts = async () => {
      try {
        const res = await axiosSecure.get("/products?category=Short Pant");

        // backend theke array or object dui ta handle
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        // approved only (same as Products page)
        const approved = data.filter((item) => item.status === "Approved");

        setSweets(approved);
      } catch (error) {
        console.error("Sweet fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSweetProducts();
  }, [axiosSecure]);

  if (loading) {
    return (
      <p className="w-11/12 mx-auto text-center py-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        {/* <SkeletonLoader></SkeletonLoader> */}
      </p>
    );
  }

  return (
    <section className="py-10 ">
      <title>MK Sports | Short Pants</title>
      <div className="w-11/12 mx-auto px-2 md:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            All <span className="text-[#aba65e]">Short Pants</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {sweets.map((item) => (
            <Link key={item._id} to={`/products-details/${item._id}`}>
              <motion.div
                whileHover={{ y: -6 }}
                className="transition-all overflow-hidden flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-full">
                  <img
                    src={
                      item.images[0]?.url ||
                      item.images[0] ||
                      "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />

                  <span className="absolute top-3 right-3 bg-[#aba65e] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.ability}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-2 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                      {item.name}
                    </h3>

                    {/* <div className="flex flex-wrap justify-between text-sm mt-1">
                    <span className="text-black">Category :</span>
                    <span className="text-black">{item.category}</span>
                  </div> */}

                    {/* Price */}
                    <div className="flex flex-wrap items-center justify-between mt-1">
                      {item.discountPrice ? (
                        <>
                          <span className="text-sm">
                            Price : ৳{item.discountPrice}
                          </span>
                          <span className="text-red-400 line-through text-sm">
                            ৳{item.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm">Price : ৳{item.price}</span>
                      )}
                    </div>

                    <p className="text-sm line-clamp-2">
                      {item.description || "Premium quality product"}
                    </p>
                  </div>

                  {/* Button */}
                  {/* <Link to={`/products-details/${item._id}`} className="mt-4">
                  <button className="w-full py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-400 transition-all">
                    View Details
                  </button>
                </Link> */}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {sweets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No short pant items found 😢
          </p>
        )}
      </div>
    </section>
  );
};

export default Pant;
