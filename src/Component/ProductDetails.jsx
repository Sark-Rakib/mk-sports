import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomerReview from "./CustomerReview";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import ImageCarousel from "./ImageCarousel";
import UseRole from "../Hooks/useRole";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = UseRole();

  // Order form modal state
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    street: "",
  });

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
    return <div className="text-center py-10 text-xl">Product not found</div>;

  const price = tuition.discountPrice || tuition.price;
  const totalPrice = quantity * price;

  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity((prev) => prev + 1);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        productId: tuition._id,
        productName: tuition.name,
        productImage: tuition.images[0],
        quantity,
        totalPrice,
        size: size || "Not specified",
        email: user?.email || formData.email,
        ...formData,
      };
      await axiosSecure.post("/orders", orderData);
      Swal.fire({
        title: "Order Placed!",
        text: "Your order at MK Sports has been placed successfully 🎉",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#10B981", // green
        timer: 3000,
        toast: true,
        position: "center",
        showConfirmButton: false,
      });
      navigate("/dashboard/my-orders");
      setShowOrderForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        district: "",
        street: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    }
  };

  const sizes = [
    { size: "S", chest: "36-", length: "26", shoulder: "16" },
    { size: "M", chest: "38", length: "27", shoulder: "17" },
    { size: "L", chest: "40", length: "28", shoulder: "18" },
    { size: "XL", chest: "42", length: "29", shoulder: "19" },
    { size: "XXL", chest: "44", length: "30", shoulder: "20" },
    { size: "3XL", chest: "46", length: "31", shoulder: "20" },
    { size: "4XL", chest: "48", length: "32", shoulder: "20" },
  ];
  const short = [
    { size: "M", chest: "38-40", length: "19", shoulder: "17" },
    { size: "L", chest: "40-42", length: "20", shoulder: "18" },
    { size: "XL", chest: "42-44", length: "21", shoulder: "19" },
    { size: "XXL", chest: "44-46", length: "22", shoulder: "20" },
  ];

  const forKids = [
    // { size: "S", chest: "36-38", length: "26", shoulder: "16" },
    { size: "16", chest: "22", length: "18", year: "3-4" },
    { size: "18", chest: "24", length: "19", year: "5-6" },
    { size: "20", chest: "26", length: "20", year: "7-8" },
    { size: "22", chest: "28", length: "20", year: "9-10" },
    { size: "24", chest: "30", length: "22", year: "11-12" },
    { size: "26", chest: "32", length: "23", year: "13-14" },
    { size: "28", chest: "34", length: "24", year: "15" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <title>MK Sports | Details</title>
      <div className="w-11/12 mx-auto py-10">
        {/* Back Button */}
        <Link
          to="/all-products"
          className="flex w-40 items-center gap-2 mb-6 text-[#aba65e] hover:text-gray-200 font-medium transition-all"
        >
          <IoMdArrowRoundBack className="text-2xl" />
          Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 p-2 mx-auto">
            <ImageCarousel images={tuition.images} />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">{tuition.name}</h1>
            <h1 className="font-semibold bg-[#aba65e]  rounded-full w-max px-3">
              {tuition.ability}
            </h1>
            <p className="text-lg">{tuition.fabric}</p>
            <p className="text-lg">{tuition.description}</p>

            {/* Price */}
            <div className="flex items-center gap-4 mt-2">
              {tuition.discountPrice ? (
                <>
                  <span className="text-red-400 line-through font-medium text-lg">
                    ৳{tuition.price}
                  </span>
                  <span className=" font-bold text-2xl">
                    ৳{tuition.discountPrice}
                  </span>
                </>
              ) : (
                <span className="font-bold text-2xl">৳{tuition.price}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-4">
              <span className="font-medium">Quantity :</span>
              <div className="flex items-center  overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 bg-white text-gray-900 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* products size */}
            <div className="mt-2">
              <span className="font-medium mr-2">Size :</span>

              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXL">3XL</option>
                <option value="XXL">4XL</option>
                <option>For Kids</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
                <option value="24">24</option>
                <option value="26">26</option>
                <option value="28">28</option>
              </select>

              {size && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected Size: {size}
                </p>
              )}
            </div>

            {/* size for kids */}

            {/* Total Price */}
            <div className="flex justify-between items-center">
              <div className="mt-2 text-lg ">
                <span className="font-medium">Total Price: </span>
                <span className="font-bold text-xl">৳{totalPrice}</span>
              </div>

              {role === "admin" && (
                <Link
                  to={`/dashboard/tuition/${id}/edit`}
                  className="bg-[#aba65e] text-white px-4 py-2 rounded hover:bg-[#8a854d] transition-colors"
                >
                  Edit Product
                </Link>
              )}
            </div>

            {/* Order Now Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full md:w-1/2 py-4 px-6 bg-[#aba65e] text-white text-lg font-bold rounded-xl shadow-lg hover:bg-[#8a854d] hover:shadow-2xl transition-all"
              >
                Order Now
              </button>
            </div>
            {/* WhatsApps Order Button */}
            <div className="mt-6">
              <a
                href={`https://wa.me/8801792229936?text=${encodeURIComponent(
                  `Hello! I want to order:\nProduct: ${tuition.name}\nQuantity: ${quantity}\nSize: ${size}\nTotal: ৳${totalPrice}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-1/2 block py-4 px-6 bg-green-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all text-center"
              >
                WhatsApp
              </a>
            </div>

            <div className="p-2 text-right text-xs text-gray-400">
              Posted: {formatDate(tuition.postedAt)}
            </div>
          </div>
        </div>
      </div>

      {/* size chart */}
      <div className="w-11/13 mx-auto flex-col md:flex md:flex-row justify-between gap-10 mb-10">
        <div className="mt-2">
          <h2 className="text-xl font-semibold mb-3">For Mens</h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200">
              <thead className="bg-[#aba65e]">
                <tr>
                  <th className="border px-4 py-2">Size</th>
                  <th className="border px-4 py-2">Chest (inch)</th>
                  <th className="border px-4 py-2">Length (inch)</th>
                  {/* <th className="border px-4 py-2">Shoulder (inch)</th> */}
                </tr>
              </thead>

              <tbody>
                {sizes.map((item) => (
                  <tr key={item.size} className="text-center">
                    <td className="border px-4 py-2 font-medium">
                      {item.size}
                    </td>
                    <td className="border px-4 py-2">{item.chest}</td>
                    <td className="border px-4 py-2">{item.length}</td>
                    {/* <td className="border px-4 py-2">{item.shoulder}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-2">
          <h2 className="text-xl font-semibold mb-3">For Kids</h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200">
              <thead className="bg-[#aba65e]">
                <tr>
                  <th className="border px-4 py-2">Size</th>
                  <th className="border px-4 py-2">Chest (inch)</th>
                  <th className="border px-4 py-2">Length (inch)</th>
                  <th className="border px-4 py-2">Years</th>
                </tr>
              </thead>

              <tbody>
                {forKids.map((item) => (
                  <tr key={item.size} className="text-center">
                    <td className="border px-4 py-2 font-medium">
                      {item.size}
                    </td>
                    <td className="border px-4 py-2">{item.chest}</td>
                    <td className="border px-4 py-2">{item.length}</td>
                    <td className="border px-4 py-2">{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-2">
          <h2 className="text-xl font-semibold mb-3">Short Pant</h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200">
              <thead className="bg-[#aba65e]">
                <tr>
                  <th className="border px-4 py-2">Size</th>
                  {/* <th className="border px-4 py-2">Chest (inch)</th> */}
                  <th className="border px-4 py-2">Length (inch)</th>
                  {/* <th className="border px-4 py-2">Shoulder (inch)</th> */}
                </tr>
              </thead>

              <tbody>
                {short.map((item) => (
                  <tr key={item.size} className="text-center">
                    <td className="border px-4 py-2 font-medium">
                      {item.size}
                    </td>
                    {/* <td className="border px-4 py-2">{item.chest}</td> */}
                    <td className="border px-4 py-2">{item.length}</td>
                    {/* <td className="border px-4 py-2">{item.shoulder}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed p-4 inset-0 z-510 flex items-center justify-center bg-black/40">
          <div className="bg-gray-200 p-6 rounded-xl max-w-md w-full relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl text-black font-bold mb-4 text-center">
              Place Your <span className="text-[#aba65e]">Order</span>
            </h2>
            <form
              onSubmit={handleOrderSubmit}
              className="flex flex-col gap-3 text-black"
            >
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Your Email (auto-filled)</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required={!user} // logged-in না হলে required
                value={user ? user.email : formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`border p-2 rounded outline-none border-gray-500 ${user ? "bg-gray-200" : ""}`}
                disabled={!!user} // logged-in হলে disabled
              />
              <label>Your Phone Number</label>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Your District</label>
              <input
                type="text"
                name="district"
                placeholder="District"
                required
                value={formData.district}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Your Street Address</label>
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                required
                value={formData.street}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="If you want to take more than one item, please write which size you want for each one here"
                value={formData.description}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <p className="text-center text-red-500 text-sm">
                Note : Delivery charge depend on quantity and location.
              </p>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <hr className="text-[#aba65e]" />
      <CustomerReview />
    </div>
  );
};

export default ProductDetails;
