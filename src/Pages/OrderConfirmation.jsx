import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-gray-500 mb-4">No order information found.</p>
        <Link
          to="/"
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C8102E] hover:text-red-800"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const orderDate = new Date(order.orderDate);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const formatDate = (d) =>
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const shortId = order.orderId
    ? String(order.orderId).slice(-8).toUpperCase()
    : `MK${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const steps = [
    { label: "Order Placed", done: true, date: formatDate(orderDate) },
    { label: "Confirmed", done: false, date: "" },
    { label: "Shipped", done: false, date: "" },
    { label: "Delivered", done: false, date: "" },
  ];

  const handlePrint = () => window.print();

  const whatsappMsg = encodeURIComponent(
    `Hello! I just placed an order.\nOrder ID: ${shortId}\nProduct: ${order.productName}\nTotal: ৳${order.totalPrice}`,
  );

  return (
    <div className="min-h-screen bg-white">
      <title>MK Sports | Order Confirmed</title>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#C8102E]/10 rounded-full flex items-center justify-center animate-bounce-once">
            <svg
              className="w-10 h-10 text-[#C8102E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
            Thank You
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Order Confirmed
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
            Your order has been placed successfully. We&apos;ll process it
            shortly and keep you updated.
          </p>
        </div>

        {/* Order ID + Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-5 bg-gray-50 border border-gray-100">
          <div className="text-center sm:text-left">
            <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-1">
              Order ID
            </p>
            <p className="text-lg font-bold text-gray-900 font-mono tracking-wider">
              #{shortId}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 border border-gray-200 text-gray-700 text-[11px] font-semibold tracking-[0.2em] uppercase hover:border-black hover:text-black transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>
            <a
              href={`https://wa.me/8801792229936?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] text-white text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#1da851] transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="mb-10 p-6 sm:p-8 bg-gray-50 border border-gray-100">
          <h3
            className="text-sm font-bold text-gray-900 mb-6 tracking-[0.05em] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Order Status
          </h3>
          <div className="flex items-start justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-3 left-0 right-0 h-[2px] bg-gray-200">
              <div className="h-full bg-[#C8102E] w-1/4 transition-all duration-700" />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.label}
                className="flex flex-col items-center relative z-10 flex-1"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${
                    step.done
                      ? "bg-[#C8102E] border-[#C8102E] text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step.done ? (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <p
                  className={`text-[11px] font-semibold mt-2.5 text-center ${
                    step.done ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {step.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two Column: Order Details + Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Product Details */}
          <div className="bg-gray-50 p-6 border border-gray-100">
            <h3
              className="text-sm font-bold text-gray-900 mb-5 tracking-[0.05em] uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Order Details
            </h3>

            <div className="flex gap-4 mb-5 pb-5 border-b border-gray-200">
              {order.productImage && (
                <div className="w-20 h-24 bg-gray-200 overflow-hidden shrink-0">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                  {order.productName}
                </h4>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                  Size: {order.size}
                </p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                  Qty: {order.quantity}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">৳{order.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-400 text-xs">Calculated later</span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  ৳{order.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 p-6 border border-gray-100">
            <h3
              className="text-sm font-bold text-gray-900 mb-5 tracking-[0.05em] uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shipping Info
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-1">
                  Name
                </p>
                <p className="text-gray-900 font-medium">{order.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-1">
                  Email
                </p>
                <p className="text-gray-900 font-medium">{order.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-1">
                  Phone
                </p>
                <p className="text-gray-900 font-medium">{order.phone}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-1">
                  Address
                </p>
                <p className="text-gray-900 font-medium">
                  {order.street}, {order.district}
                </p>
              </div>
              {order.description && (
                <div>
                  <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-1">
                    Notes
                  </p>
                  <p className="text-gray-600 text-sm">{order.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="bg-gray-950 p-6 sm:p-8 text-left mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3
                className="text-white font-bold mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Estimated Delivery
              </h3>
              <p className="text-gray-400 text-sm">
                {formatDate(orderDate)} — {formatDate(estimatedDelivery)}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#C8102E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                Delivery charge depends on location
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard/my-orders"
            className="px-8 py-3.5 bg-black text-white text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#C8102E] transition-colors text-center"
          >
            View My Orders
          </Link>
          <Link
            to="/all-products"
            className="px-8 py-3.5 border border-gray-200 text-gray-700 text-[11px] font-semibold tracking-[0.15em] uppercase hover:border-black hover:text-black transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => navigate(-2)}
            className="px-8 py-3.5 border border-gray-200 text-gray-700 text-[11px] font-semibold tracking-[0.15em] uppercase hover:border-black hover:text-black transition-colors text-center"
          >
            Place Another Order
          </button>
        </div>
      </div>

      {/* Print-only footer */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-12px); }
          50% { transform: translateY(0); }
          70% { transform: translateY(-6px); }
        }
        .animate-bounce-once { animation: bounce-once 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
