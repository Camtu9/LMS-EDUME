// import React from "react";
// import { assets } from "../../assets/assets";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
//       <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
//         <div className="flex flex-col md:items-start items-center w-full">
//           <div className="flex items-center">
//             <img className="w-1/6" src={assets.favicon} alt="logo" />
//             <p className="ml-2 text-white font-semibold">EduMe</p>
//           </div>
//           <p className="mt-6 text-center md:text-left text-sm text-white/80">EduMe is your gateway to online learning, offering a wide range of courses and resources to help you grow, learn, and achieve your goals at your own pace.</p>
//         </div>
//         <div
//           className="flex flex-col md:items-start
//          items-center w-full"
//         >
//           <h2 className="font-semibold text-white mb-5">Company</h2>
//           <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
//             <li>
//               <a href="#">Home</a>
//             </li>
//             <li>
//               <a href="#">About us</a>
//             </li>
//             <li>
//               <a href="#">Contact us</a>
//             </li>
//             <li>
//               <a href="#">Privacy policy</a>
//             </li>
//           </ul>
//         </div>
//         <div className="hidden md:flex flex-col items-start w-full">
//           <h2 className="font-semibold text-white mb-5">
//             Subscribe to uor newsletter
//           </h2>
//           <p className="text-sm text-white/80">
//             Stay updated with the latest news, articles, and resources delivered
//             directly to your inbox every week.
//           </p>
//           <div className="flex items-center gap-2 pt-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none
//             w-64 h-9 rounded px-2 text-sm"
//             />
//             <button className="bg-blue-600 w-24 h-9 text-white rounded">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//       <p className="py-4 text-center text-xs md:text-sm text-white/60">
//         Copyright 2025 © EduMe. All Right Reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-950 w-full mt-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:px-36 px-6 py-12 border-b border-white/10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center mb-4">
            <img className="w-10 h-10" src={assets.favicon} alt="logo" />
            <span className="ml-3 text-2xl font-bold">EduMe</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            EduMe is your gateway to online learning, offering a wide range of
            courses and resources to help you grow, learn, and achieve your
            goals at your own pace.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">About us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Contact us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Privacy policy</a>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h2>
          <p className="text-sm text-gray-400 mb-4">
            Stay updated with the latest news, articles, and resources delivered
            directly to your inbox every week.
          </p>
          <div className="flex items-center gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-gray-800 text-sm text-white placeholder-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 transition text-sm px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 py-4">
        Copyright 2025 © EduMe. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
