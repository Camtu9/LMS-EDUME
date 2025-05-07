import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import các icon cho hiển thị mật khẩu

const SignUpModal = () => {
  const { showSignUp, closeModals, openSignIn, backendUrl, signIn } =
    useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Trạng thái hiển thị xác nhận mật khẩu

  if (!showSignUp) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/user/add`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Account created successfully!");
        const loginRes = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (loginRes.data.success && loginRes.data.token) {
          signIn({ token: loginRes.data.token });
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          closeModals();
        } else {
          toast.error("Login failed after registration.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.53)] flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative z-60">
        <button
          onClick={closeModals}
          className="absolute top-1 right-2 text-3xl text-gray-500 font-semibold"
        >
           &times;
        </button>

        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span onClick={openSignIn} className="text-blue-600 cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
