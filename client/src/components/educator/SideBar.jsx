import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/educator", icon: assets.home_icon },
  { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
  { name: "My Courses", path: "/educator/my-courses", icon: assets.my_course_icon },
  { name: "Student Enrolled", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
];

const SideBar = () => {
  const { isEducator } = useAppContext();

  return (
    isEducator && (
      <aside className="md:w-64 w-16 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-sm">
        <div className="flex flex-col gap-1 py-4">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/educator"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 transition-colors duration-200
                ${isActive ? "bg-blue-100  border-r-4 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5" />
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    )
  );
};

export default SideBar;
