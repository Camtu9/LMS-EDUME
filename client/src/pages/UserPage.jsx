import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaBookOpen, FaLock, FaUser } from "react-icons/fa";
import UserInfo from "../components/UserInfo.jsx";
import ChangePassword from "../components/ChangePassword";
import MyEnrollments from "./students/MyEnrollments";

const UserPage = () => {
  const location = useLocation();
  const navigate = useAppContext();
  const [selectedTab, setSelectedTab] = useState("userInfo");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/SignIn");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (location.state?.tab) {
      setSelectedTab(location.state.tab);
    }
  }, [location.state?.tab]);

  const handleTabChange = (key) => setSelectedTab(key);

  const tabs = [
    { key: "userInfo", label: "User Information", icon: <FaUser /> },
    { key: "changePassword", label: "Change Password", icon: <FaLock /> },
    
  ];

  const tabContent = {
    userInfo: <UserInfo />,
    changePassword: <ChangePassword />,

  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto my-6">
      <div className="md:w-1/4 w-full bg-white p-5 rounded-xl shadow-md">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex items-center gap-3 px-4 py-3 mb-3 rounded-lg cursor-pointer transition 
                ${
                  selectedTab === tab.key
                    ? "bg-blue-50 text-blue-500 font-semibold shadow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="md:w-3/4 w-full bg-white p-5 rounded-xl shadow-md">
        {tabContent[selectedTab]}
      </div>
    </div>
  );
};

export default UserPage;
