import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Marco from "./Marco";

const Root = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Marco></Marco>
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
