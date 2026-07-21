import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomerReview from "./CustomerReview";
import ImageCarousel from "./ImageCarousel";
import UseRole from "../Hooks/useRole";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const navigate = useNavigate();
  const { role } = UseRole();

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const res = await axiosSecure.get(`/tuitions/${id}`);
        setTuition(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTuition();
  }, [id, axiosSecure]);

  if (loading) return <Loading />;
  if (!tuition)
    return (
      <div className="text-center py-20 text-xl text-gray-400">
        Product not found
      </div>
    );

  const price = tuition.discountPrice || tuition.price;
  const totalPrice = quantity * price;

  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity((prev) => prev + 1);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const sizes = [
    { size: "S", chest: "36-", length: "26" },
    { size: "M", chest: "38", length: "27" },
    { size: "L", chest: "40", length: "28" },
    { size: "XL", chest: "42", length: "29" },
    { size: "XXL", chest: "44", length: "30" },
    { size: "3XL", chest: "46", length: "31" },
    { size: "4XL", chest: "48", length: "32" },
  ];
  const short = [
    { size: "M", chest: "38-40", length: "19" },
    { size: "L", chest: "40-42", length: "20" },
    { size: "XL", chest: "42-44", length: "21" },
    { size: "XXL", chest: "44-46", length: "22" },
  ];
  const forKids = [
    { size: "16", chest: "22", length: "18", year: "3-4" },
    { size: "18", chest: "24", length: "19", year: "5-6" },
    { size: "20", chest: "26", length: "20", year: "7-8" },
    { size: "22", chest: "28", length: "20", year: "9-10" },
    { size: "24", chest: "30", length: "22", year: "11-12" },
    { size: "26", chest: "32", length: "23", year: "13-14" },
    { size: "28", chest: "34", length: "24", year: "15" },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <title>MK Sports | Details</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 mb-8 text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors group"
        >
          <IoMdArrowRoundBack className="text-base group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="overflow-hidden">
            <ImageCarousel images={tuition.images} />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
              {tuition.ability}
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {tuition.name}
            </h1>
            <p className="text-sm text-gray-500 mb-1">{tuition.fabric}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {tuition.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
              {tuition.discountPrice ? (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    {tuition.price} BDT
                  </span>
                  <span className="text-3xl font-bold">
                    {tuition.discountPrice} BDT
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">{tuition.price} BDT</span>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3 block">
                Quantity
              </label>
              <div className="inline-flex items-center border border-gray-200">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3 block">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full sm:w-64 px-4 py-3 border border-gray-200 text-sm focus:outline-none transition-colors"
              >
                <option className="text-black" value="">
                  Select Size
                </option>
                <option className="text-black" value="S">
                  S
                </option>
                <option className="text-black" value="M">
                  M
                </option>
                <option className="text-black" value="L">
                  L
                </option>
                <option className="text-black" value="XL">
                  XL
                </option>
                <option className="text-black" value="XXL">
                  XXL
                </option>
                <option className="text-black" value="3XL">
                  3XL
                </option>
                <option className="text-black" value="4XL">
                  4XL
                </option>
                <option disabled>For Kids</option>
                <option className="text-black" value="16">
                  16
                </option>
                <option className="text-black" value="18">
                  18
                </option>
                <option className="text-black" value="20">
                  20
                </option>
                <option className="text-black" value="22">
                  22
                </option>
                <option className="text-black" value="24">
                  24
                </option>
                <option className="text-black" value="26">
                  26
                </option>
                <option className="text-black" value="28">
                  28
                </option>
              </select>
              {sizeError && (
                <p className="text-[#C8102E] text-xs mt-2">
                  Please select a size
                </p>
              )}
            </div>

            {/* Total */}
            <div className="mb-6 pb-6 border-b border-gray-100 flex items-center">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mr-3">
                Total
              </span>
              <span className="text-2xl font-bold">{totalPrice} BDT</span>
            </div>

            {/* Admin Edit */}
            {role === "admin" && (
              <Link
                to={`/dashboard/tuition/${id}/edit`}
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C8102E] hover:text-red-800 mb-4 inline-block"
              >
                Edit Product
              </Link>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (!size) {
                    setSizeError(true);
                    return;
                  }
                  setSizeError(false);
                  navigate(`/order/${id}`, {
                    state: { product: tuition, quantity, size },
                  });
                }}
                className="flex-1 py-4 px-8 border bg-black text-white text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#C8102E] transition-colors duration-300"
              >
                Order Now
              </button>
              <a
                href={`https://wa.me/8801792229936?text=${encodeURIComponent(`Hello! I want to order:\nProduct: ${tuition.name}\nQuantity: ${quantity}\nSize: ${size}\nTotal: \u09F3${totalPrice}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-8 border border-gray-200 text-gray-700 text-[11px] font-semibold tracking-[0.15em] uppercase text-center hover:border-green-400 transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>

            <p className="text-[10px] text-gray-400 mt-4 tracking-wider uppercase">
              Posted: {formatDate(tuition.postedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Size Charts */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-16 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "For Mens",
            data: sizes,
            cols: ["Size", "Chest (inch)", "Length (inch)"],
            rows: (s) => [s.size, s.chest, s.length],
          },
          {
            title: "For Kids",
            data: forKids,
            cols: ["Size", "Chest (inch)", "Length (inch)", "Years"],
            rows: (s) => [s.size, s.chest, s.length, s.year],
          },
          {
            title: "Short Pant",
            data: short,
            cols: ["Size", "Length (inch)"],
            rows: (s) => [s.size, s.length],
          },
        ].map((table) => (
          <div key={table.title}>
            <h3
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {table.title}
            </h3>
            <div className="overflow-x-auto border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    {table.cols.map((c) => (
                      <th
                        key={c}
                        className="px-4 py-2.5 text-left text-[11px] font-semibold tracking-[0.05em] uppercase"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.data.map((item, idx) => (
                    <tr
                      key={item.size}
                      className={`border-t border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      {table.rows(item).map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2.5 text-gray-600 text-xs"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-100" />
      <CustomerReview />
    </div>
  );
};

export default ProductDetails;
