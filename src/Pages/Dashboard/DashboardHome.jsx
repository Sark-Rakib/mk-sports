import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxios";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProducts: 0 });
  const [user, setUser] = useState({ totalUsers: 0 });

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const productsRes = await axiosSecure.get("/dashboard/all-products");
        const usersRes = await axiosSecure.get("/dashboard/all-users");
        setStats({ totalProducts: productsRes.data.totalProducts });
        setUser({ totalUsers: usersRes.data.totalUsers });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllStats();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#C8102E] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
              <FaShoppingCart className="text-lg text-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#C8102E] flex items-center justify-center">
              <FaUsers className="text-lg text-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{user.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-8 sm:p-12">
        <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">Welcome</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Your Dashboard
        </h2>
        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
          Manage products, view orders, and track customer interactions from one place. Use the sidebar to navigate.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
