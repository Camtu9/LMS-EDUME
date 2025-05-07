import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loading from "./students/Loading";

const UserInfo = () => {
  const { backendUrl, token, userData, setUserData } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!token) {
      toast.error("Authentication token not found.");
      setLoading(false);
      return;
    }

    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
      });
      setLoading(false);
    } else {
      // Nếu bạn thật sự muốn fallback (rất hiếm), có thể fetch tại đây
      setLoading(false);
    }
  }, [token, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Both name and email are required.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setUserData(data.user);
        toast.success("User information updated successfully.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="md:p-8 p-2 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="md:text-3xl text-xl font-semibold text-gray-800 mb-6 text-center">
          User Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center">
            <label className="block text-gray-600 font-medium w-1/4">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-3/4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6 flex items-center">
            <label className="block text-gray-600 font-medium w-1/4">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-3/4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
