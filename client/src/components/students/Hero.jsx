import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-x-7 text-center bg-gradient-to-b from-sky-100/70">
      <h1 className="md:text-4xl text-2xl relative font-bold text-gray-800 max-w-3xl mx-auto">
        Unlock your potential with courses crafted for{" "}
        <span className="text-blue-600">your unique path.</span>
        <img
          src={assets.sketch}
          className="md:block hidden absolute -bottom-7 right-0"
        />{" "}
      </h1>
      <p className="md:block hidden mt-4 text-gray-500 max-w-2xl mx-auto">
        Our platform brings you expert mentors, dynamic learning resources, and
        a nurturing community to support your personal and professional growth.
      </p>
      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        Expert mentors, engaging content, and a supportive community for your
        growth.
      </p>
      <SearchBar/>
    </div>
  );
};

export default Hero;
