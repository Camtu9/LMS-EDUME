import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full py-2 px-8 border-t">
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © EduMe. All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4">
      <a href="#" className="hover:scale-110 transition">
            <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5" />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
