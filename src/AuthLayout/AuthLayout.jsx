import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";
import img from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 sm:px-8 py-5">
        <Link to="/" className="inline-block">
          <img src={logo} alt="MK Sports Logo" className="h-12" />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl bg-white border border-gray-100 shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="flex-1 p-8 sm:p-10">
              <Outlet />
            </div>
            <div className="hidden md:flex flex-1 bg-gray-950 items-center justify-center p-10">
              <img className="w-72 object-contain opacity-80" src={img} alt="MK Sports" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
