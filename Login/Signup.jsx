import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../src/context/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Homepage1");
    }
  }, [isAuthenticated, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/Login");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Navigation Bar */}
      <nav className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">🍴 Golden Essence</h1>
        <Link to="/" className="font-medium hover:text-amber-200 transition hidden md:block">Home</Link>
        <button
          onClick={() => navigate(-1)}
          className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded font-semibold transition"
        >
          ← Back
        </button>
      </nav>

      <div className="flex justify-center items-center flex-1">
        <div className="w-[850px] h-[500px] flex rounded-lg shadow-2xl relative overflow-hidden border border-amber-400">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-amber-600/30 blur-2xl"></div>

        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-amber-500 to-amber-600 text-white flex flex-col justify-center items-center p-8 relative z-10">
          <h2 className="text-3xl font-extrabold">WELCOME</h2>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-white flex flex-col justify-center p-10 relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-amber-900">Sign Up</h2>

          <form className="space-y-6 text-gray-800" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-400"
                required
              />
              <FaUser className="absolute left-2 top-3 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-400"
                required
              />
              <FaEnvelope className="absolute left-2 top-3 text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-400"
                required
              />
              <FaLock className="absolute left-2 top-3 text-gray-400" />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-400"
                required
              />
              <FaLock className="absolute left-2 top-3 text-gray-400" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition font-semibold text-white"
            >
              Sign Up
            </button>
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/Login" className="text-amber-600 font-bold hover:text-amber-700">
              Login
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;
