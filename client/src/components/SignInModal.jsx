import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInModal = () => {
  const { showSignIn, closeModals, openSignUp, backendUrl, signIn } =
    useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  if (!showSignIn) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      const data = response.data;
      if (data.success) {
        signIn({
          token: data.token,
        });
        setEmail('');
        setPassword('');
        closeModals();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.53)] flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-96 relative z-60">
        <button
          onClick={closeModals}
          className="absolute top-1 right-3 text-3xl text-gray-500 font-semibold"
        >
           &times;
        </button>
        <h2 className="text-2xl mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <span onClick={openSignUp} className="text-blue-600 cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
