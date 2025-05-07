import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const { backendUrl } = useAppContext();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirmation do not match!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/change-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (data.success) {
        toast.success("Password changed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="md:text-3xl text-xl font-semibold text-gray-800 mb-6 text-center">
          Change Your Password
        </h1>
        <form onSubmit={handleSubmit} className="md:text-base text-sm">
          <div className="mb-6 flex items-center">
            <label className="block text-gray-600 font-medium w-1/3 mr-4">
              Current Password
            </label>
            <div className="relative w-2/3">
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <label className="block text-gray-600 font-medium w-1/3 mr-4">
              New Password
            </label>
            <div className="relative w-2/3">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <label className="block text-gray-600 font-medium w-1/3 mr-4">
              Confirm New Password
            </label>
            <div className="relative w-2/3">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
