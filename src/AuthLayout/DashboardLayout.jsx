import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { CiLogout } from "react-icons/ci";
import { FaComment, FaPlusSquare, FaShoppingBag } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import UseRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = UseRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => navigate("/")).catch((err) => console.log(err.message));
  };

  const SidebarLink = ({ to, icon, label, tip }) => (
    <li>
      <Link to={to} className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-all is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={tip}>
        {icon}
        <span className="is-drawer-close:hidden">{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="drawer lg:drawer-open">
      <title>MK Sports | Dashboard</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content bg-gray-50">
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 w-full px-6 py-4 flex items-center gap-4">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost border-none hover:bg-gray-50 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </label>
          <h1 className="text-sm font-semibold tracking-[0.1em] uppercase text-gray-900">Dashboard</h1>
        </nav>
        <div className="p-6 sm:p-8">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col bg-[#111] border-r border-white/5 is-drawer-close:w-20 is-drawer-open:w-64">
          <div className="px-5 py-6 border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 is-drawer-close:justify-center">
              <div className="w-9 h-9 bg-[#C8102E] flex items-center justify-center text-white font-bold text-xs tracking-wider">
                MK
              </div>
              <span className="text-white font-semibold text-sm tracking-wider uppercase is-drawer-close:hidden">MK Sports</span>
            </Link>
          </div>

          <ul className="menu w-full grow px-3 py-4 space-y-0.5">
            <SidebarLink to="/" icon={<FaHome />} label="Homepage" tip="Home" />
            <SidebarLink to="/dashboard/my-orders" icon={<FaShoppingCart />} label="My Orders" tip="Orders" />
            {role === "admin" && (
              <>
                <li className="px-4 py-2"><span className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em] is-drawer-close:hidden">Admin</span></li>
                <SidebarLink to="/dashboard/admin" icon={<MdAdminPanelSettings />} label="Users" tip="Users" />
                <SidebarLink to="/dashboard/customer-orders" icon={<FaShoppingBag />} label="Orders" tip="All Orders" />
                <SidebarLink to="/dashboard/customer-contact" icon={<FaComment />} label="Contact" tip="Contact" />
                <SidebarLink to="/dashboard/student" icon={<FaShoppingCart />} label="Products" tip="Products" />
                <SidebarLink to="/dashboard/add-tuition" icon={<FaPlusSquare />} label="Add Product" tip="Add" />
                <SidebarLink to="/dashboard/add-hero-photo" icon={<FaPlusSquare />} label="Hero Photos" tip="Photos" />
              </>
            )}
          </ul>

          <div className="px-3 pb-4 space-y-0.5">
            <SidebarLink to="/dashboard/profile" icon={<img src={user?.photoURL} alt="User" className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10" />} label="Profile" tip="Profile" />
            <li>
              <button onClick={handleLogOut} className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium tracking-wide text-gray-400 hover:text-[#C8102E] hover:bg-white/5 transition-all w-full is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Logout">
                <CiLogout />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
