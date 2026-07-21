import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";

const OrderForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;
  const initialSize = location.state?.size || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      district: "",
      street: "",
      description: "",
    },
  });

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-gray-500 mb-4">No product selected for order.</p>
        <Link
          to="/all-products"
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C8102E] hover:text-red-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const price = product.discountPrice || product.price;
  const totalPrice = quantity * price;

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0] || "",
        quantity,
        totalPrice,
        size: data.size,
        email: user?.email || data.email,
        name: data.name,
        phone: data.phone,
        district: data.district,
        street: data.street,
        description: data.description || "",
        status: "Pending",
        orderDate: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/orders", orderData);

      const orderId =
        res.data.insertedId ||
        res.data._id ||
        (res.data.acknowledged && res.data.insertedId) ||
        "";

      await Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonColor: "#C8102E",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/order-confirmation", {
        state: {
          orderId,
          productName: product.name,
          productImage: product.images?.[0] || "",
          quantity,
          totalPrice,
          size: data.size,
          name: data.name,
          email: user?.email || data.email,
          phone: data.phone,
          district: data.district,
          street: data.street,
          description: data.description || "",
          orderDate: orderData.orderDate,
        },
      });
    } catch (err) {
      console.error("Order error:", err);
      Swal.fire({
        title: "Failed!",
        text: "Could not place your order. Please try again.",
        icon: "error",
        confirmButtonColor: "#C8102E",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <title>MK Sports | Place Order</title>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16">
        {/* Back */}
        <Link
          to={`/products-details/${id}`}
          className="inline-flex items-center gap-2 mb-10 text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors group"
        >
          <IoMdArrowRoundBack className="text-base group-hover:-translate-x-1 transition-transform" />
          Back to Product
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
              Checkout
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold leading-tight mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shipping Details
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="you@example.com"
                  disabled={!!user}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Size */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  Size
                </label>
                <select
                  {...register("size", { required: "Size is required" })}
                  defaultValue={initialSize}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                >
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                  <option disabled>For Kids</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="22">22</option>
                  <option value="24">24</option>
                  <option value="26">26</option>
                  <option value="28">28</option>
                </select>
                {errors.size && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.size.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message:
                        "Enter a valid BD phone number (e.g., 01XXXXXXXXX)",
                    },
                  })}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="01XXXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  District
                </label>
                <input
                  type="text"
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="e.g., Dhaka, Bogura"
                />
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Street */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  Street Address
                </label>
                <input
                  type="text"
                  {...register("street", {
                    required: "Street address is required",
                  })}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="House no, road, area"
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.street.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2 block">
                  Order Notes{" "}
                  <span className="text-gray-300 normal-case">(Optional)</span>
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  rows={3}
                  placeholder="Special instructions, size details for multiple items..."
                />
              </div>

              <p className="text-[10px] text-gray-400 text-center tracking-wider uppercase pt-2">
                Delivery charge depends on quantity and location
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-black border text-white text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#C8102E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 sm:p-8 sticky top-28">
              <h3
                className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Order Summary
              </h3>

              {/* Product */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-24 bg-gray-200 overflow-hidden shrink-0">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                    Size: {initialSize || "N/A"}
                  </p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                    Qty: {quantity}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    {totalPrice} BDT
                  </p>
                  {product.discountPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      {product.price} BDT
                    </p>
                  )}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    {totalPrice} BDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-400 text-xs">
                    Calculated at delivery
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    {totalPrice} BDT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
