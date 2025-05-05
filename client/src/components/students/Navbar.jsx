// import React, { useState } from "react";
// import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const { navigate, isEducator, backendUrl, setIsEducator, openSignIn } =
//     useAppContext();
//   const isCourseListPage = location.pathname.includes("/course-list");

//   const username = localStorage.getItem("userName");
//   const token = localStorage.getItem("token");

//   const [showDropdown, setShowDropdown] = useState(false);

//   const becomeEducator = async () => {
//     try {
//       if (isEducator) {
//         navigate("/educator");
//         return;
//       }
//       const { data } = await axios.get(`${backendUrl}/api/educator/update-role`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         setIsEducator(true);
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("userName");
//     localStorage.removeItem("token");
//     toast.success("Signed out successfully");
//     navigate("/");
//   };

//   return (
//     <div
//       className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
//         isCourseListPage ? "bg-white" : "bg-sky-100/70"
//       }`}
//     >
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="Logo"
//         className="w-28 lg:w-32 cursor-pointer"
//       />
//       <div className="hidden md:flex items-center gap-5 text-gray-500">
//         {username && (
//           <>
//             <button onClick={becomeEducator}>
//               {isEducator ? "Educator Dashboard" : "Become Educator"}
//             </button>
//             | <Link to="/my-enrollments">My Enrollments</Link>
//           </>
//         )}

//         {username ? (
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm"
//             >
//               <img
//                 src={assets.user_icon}
//                 alt="User"
//                 className="w-6 h-6 rounded-full"
//               />
//               <span>{username}</span>
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                 <div className="px-4 py-2 border-b text-sm text-gray-700">
//                   Hello, {username}
//                 </div>
//                 <button
//                   onClick={handleSignOut}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={openSignIn}
//             className="bg-blue-600 text-white px-5 py-2 rounded-full"
//           >
//             Create Account
//           </button>
//         )}
//       </div>
//       <div className="md:hidden flex items-center gap-4 text-gray-500 relative">
//         {username && (
//           <>
//             <button
//               onClick={becomeEducator}
//               className="text-xs sm:text-sm"
//             >
//               {isEducator ? "Educator" : "Become Educator"}
//             </button>
//             | <Link to="/my-enrollments" className="text-xs sm:text-sm">
//               My Enrollments
//             </Link>
//           </>
//         )}

//         {username ? (
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)}>
//               <img
//                 src={assets.user_icon}
//                 alt="User icon"
//                 className="w-6 h-6"
//               />
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                 <div className="px-4 py-2 border-b text-sm text-gray-700">
//                   Hello, {username}
//                 </div>
//                 <button
//                   onClick={handleSignOut}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button onClick={openSignIn}>
//             <img src={assets.user_icon} alt="User icon" className="w-6 h-6" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaBookOpen, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, openSignIn } =
    useAppContext();
  const isCourseListPage = location.pathname.includes("/course-list");

  const username = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const [showDropdown, setShowDropdown] = useState(false);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const { data } = await axios.get(
        `${backendUrl}/api/educator/update-role`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 ${
        isCourseListPage ? "bg-white" : "bg-sky-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-6 text-gray-700">
        {username && (
          <>
            <button onClick={becomeEducator} className="hover:underline">
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <span> | </span>
            <Link to="/my-enrollments" className="hover:underline">
              My Enrollments
            </Link>
          </>
        )}

        {username ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-md"
            >
              <FaUser />
              <span>{username}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <Link
                  to="/profile"
                  state={{ tab: "userInfo" }}
                  className="flex items-center gap-3 px-4 py-3 text-md text-gray-700 hover:bg-blue-50 transition"
                >
                  <FaUser />
                  <span>User Info</span>
                </Link>

                <Link
                  to="/profile"
                  state={{ tab: "changePassword" }}
                  className="flex items-center gap-3 px-4 py-3 text-md text-gray-700 hover:bg-blue-50 transition"
                >
                  <FaLock />
                  <span>Change Password</span>
                </Link>
                <Link
                  to="/my-enrollments"
                  className="flex items-center gap-3 px-4 py-3 text-md text-gray-700 hover:bg-blue-50 transition"
                >
                  <FaBookOpen />
                  <span>My Enrollments</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-md text-red-600 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Sign In
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-4 text-gray-500 relative">
        {username && (
          <>
            <button onClick={becomeEducator} className="text-xs sm:text-sm">
              {isEducator ? "Educator" : "Become Educator"}
            </button>
            <span> | </span>
            <Link to="/my-enrollments" className="text-xs sm:text-sm">
              My Enrollments
            </Link>
          </>
        )}

        {username ? (
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)}>
              <img src={assets.user_icon} alt="User icon" className="w-6 h-6" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  to="/profile"
                  state={{ tab: "userInfo" }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  <FaUser />
                  User Info
                </Link>
                <Link
                  to="/profile"
                  state={{ tab: "changePassword" }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  <FaLock />
                  Change Password
                </Link>
                <Link
                  to="/my-enrollments"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  <FaBookOpen />
                  <span>My Enrollments</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={openSignIn}>
            <img src={assets.user_icon} alt="User icon" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
