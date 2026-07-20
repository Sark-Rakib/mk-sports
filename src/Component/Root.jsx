import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeedHelpFloating from "./NeedHelpFloating";

const Root = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="pt-[79px] sm:pt-[87px]">
        <Outlet />
      </main>
      <NeedHelpFloating />
      <Footer />
    </div>
  );
};

export default Root;
