import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Link } from "react-router";
import logo from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="px-7 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="MK Sports" className="h-14 mb-5 opacity-80" />
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Premium sportswear for athletes and fans. Quality meets
              performance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/Contact", label: "Contact" },
                { to: "/blog", label: "Blog" },
                { to: "/privacy-policy", label: "Privacy" },
                { to: "/terms-service", label: "Terms" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>khairul1234jk@gmail.com</li>
              <li>+880 1792229936</li>
              <li>Sherpur, Bogura, Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61564079925191"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://x.com/Cap_tain01"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition-all duration-300"
              >
                <SiX size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/rakib-sarker-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://www.youtube.com/@rakibrecord"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white transition-all duration-300"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-600 tracking-wider uppercase">
            &copy; {currentYear} MK Sports. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-600 tracking-wider uppercase">
            Developed by{" "}
            <a
              href="https://www.facebook.com/me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Rakib Sarker
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
