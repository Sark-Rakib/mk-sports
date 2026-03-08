import React from "react";
import { Link, Outlet } from "react-router";
import img from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";
import logo from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";

const AuthLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Link to="/">
        <div className="h-15 ">
          <h1 className="font-bold text-xl">
            <img src={logo} alt="MK SPORTS Logo" className="w-20 h-20" />
          </h1>
        </div>
      </Link>
      <div className="md:flex justify-center items-center bg-gray-50 mt-10 p-10 rounded gap-10">
        <div>
          <Outlet></Outlet>
        </div>
        <div className="flex mt-10 justify-center items-center">
          <img className="w-100" src={img} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
