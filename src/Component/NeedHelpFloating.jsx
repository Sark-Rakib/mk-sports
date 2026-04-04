import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";

const NeedHelpFloating = () => {
  const whatsappLink =
    "https://wa.me/8801792229936?text=Hello%2C%20I%20need%20help";
  const messengerLink = "https://www.facebook.com/md.khirul.1447";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-10 md:right-10">
      {/* Speech bubble - "Need Help?" */}
      <div className="relative left-1 md:-left-1">
        <div className="bg-black text-white text-sm md:text-sm font-bold px-4 py-2 rounded-full shadow-xl whitespace-nowrap">
          Need Help?
        </div>

        {/* pointer */}
        <div
          className="animate-bounce absolute -bottom-3 left-11 md:left-11 w-0 h-0 
          border-l-[10px] border-l-transparent 
          border-t-[10px] border-t-black 
          border-r-[10px] border-r-transparent"
        />
      </div>

      {/* Buttons - WhatsApp + Messenger */}
      <div className="flex gap-4">
        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12
            bg-green-500 hover:bg-green-600 
            text-white rounded-full 
            shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={20} className="md:size-20 md:p-3" />{" "}
        </a>

        {/* Messenger Button */}
        <a
          href={messengerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12
            bg-[#0084FF] hover:bg-[#0073e6] 
            text-white rounded-full 
            shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          title="Chat on Messenger"
        >
          <SiMessenger size={20} className="md:size-20 md:p-3" />{" "}
        </a>
      </div>
    </div>
  );
};

export default NeedHelpFloating;
