import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { userData } = useAppContext();
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <img src={assets.logo} className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi {userData ? userData.name : "Educators"}</p>
      </div>
    </div>
  );
};

export default Navbar;
