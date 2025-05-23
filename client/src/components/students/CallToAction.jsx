import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const CallToAction = () => {
  const {navigate} = useAppContext()
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">Learn anything, anytime, anywhere</h1>
      <p className="text-gray-500 sm:text-sm">
        Unlock endless learning opportunities and advance at your own pace.
        Whether for personal growth or career development, we’re here to support
        you every step of the way.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-md text-white bg-blue-600 " onClick={()=>navigate('/course-list')}>Get Started</button>
        <button className="flex items-center gap-2" onClick={()=>navigate('/course-list')}>
          Learn more <img src={assets.arrow_icon} alt="arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
