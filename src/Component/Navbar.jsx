import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import userAuth from "../Hooks/useAuth";
import { CiLogin, CiUser } from "react-icons/ci";
import navLogo from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";

const Navbar = ({ theme, setTheme }) => {
  const { user } = userAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-products", label: "Shop" },
    { to: "/jersey", label: "Jersey" },
    { to: "/pant", label: "Short Pant" },
    { to: "/tracksuit", label: "Tracksuit" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            scrolled
              ? theme === "dark"
                ? "bg-black/95 backdrop-blur-xl text-white shadow-lg shadow-black/20"
                : "bg-white/95 backdrop-blur-xl text-black shadow-lg shadow-black/5"
              : theme === "dark"
                ? "bg-black text-white"
                : "bg-white text-black"
          }
        `}
      >
        {/* Marquee Bar */}
        <div className="overflow-hidden w-full bg-black text-white py-2 border-b border-white/10">
          <p className="marquee text-[10px] tracking-[0.2em] uppercase font-medium">
            Free shipping on orders over ৳2000 &mdash; Fuel Your Passion with MK
            Sports &mdash; Premium Quality Guaranteed
          </p>
        </div>

        <div className="px-1">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src={navLogo} alt="MK Sports" className="h-14 sm:h-16" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-[#C8102E]"
                        : theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <label className="swap swap-rotate cursor-pointer p-2">
                <input
                  type="checkbox"
                  onChange={handleThemeToggle}
                  checked={theme === "dark"}
                />
                <svg
                  className="swap-on fill-current w-[18px] h-[18px] text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64 17l-.71.71a.996.996 0 101.41 1.41l.71-.71A.996.996 0 105.64 17zM12 4a1 1 0 100 2 1 1 0 000-2zm7.05 1.64a.996.996 0 00-1.41 0l-.71.71a.996.996 0 101.41 1.41l.71-.71a.996.996 0 000-1.41zM4 12a1 1 0 100 2 1 1 0 000-2zm8 8a1 1 0 100-2 1 1 0 000 2zm6.36-2.64a.996.996 0 10-1.41-1.41l-.71.71a.996.996 0 101.41 1.41l.71-.71zM20 12a1 1 0 100 2 1 1 0 000-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                <svg
                  className="swap-off fill-current w-[18px] h-[18px] text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64 13.65A9 9 0 1112 3a7 7 0 009.64 10.65z" />
                </svg>
              </label>

              {user ? (
                <Link
                  to="/dashboard"
                  className={`p-2 transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  <CiUser className="text-xl" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-5 py-2 bg-black text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#C8102E] transition-colors duration-300"
                >
                  <CiLogin className="text-sm" />
                  Sign In
                </Link>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setOpen(true)}
                className={`lg:hidden p-2 transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-300 ${open ? "visible" : "invisible"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-900">
              Menu
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-400 hover:text-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-6 py-6">
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-[13px] font-medium tracking-[0.08em] uppercase border-b border-gray-50 transition-colors ${
                        isActive
                          ? "text-[#C8102E]"
                          : "text-gray-800 hover:text-[#C8102E]"
                      }`
                    }
                  >
                    <span className="text-gray-300 text-xs mr-3">0{i + 1}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {!user && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-8 block w-full py-3.5 bg-black text-white text-center text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#C8102E] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .marquee {
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
