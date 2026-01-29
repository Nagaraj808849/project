import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (user) =>
        user.username === loginData.username &&
        user.password === loginData.password
    );

    if (!validUser) {
      alert("Invalid Username or Password");
      return;
    }

    // Save logged-in user session
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    alert("Login Successful!");
    navigate("/"); // change to your home/dashboard route
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-[850px] h-[500px] flex rounded-lg shadow-2xl relative overflow-hidden border border-cyan-400">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-500/30 blur-2xl"></div>

        {/* Left Side */}
        <div className="w-1/2 bg-gray-900 flex flex-col justify-center p-10 relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-white">Login</h2>

          <form className="space-y-6 text-white" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:border-cyan-400 focus:outline-none"
                required
              />
              <FaUser className="absolute left-2 top-3 text-cyan-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:border-cyan-400 focus:outline-none"
                required
              />
              <FaLock className="absolute left-2 top-3 text-cyan-400" />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 font-semibold hover:from-teal-500 hover:to-cyan-400 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Don’t have an account?
            <Link to="/Signup" className="text-blue-500 ml-2 text-[16px]">
              Signup
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex flex-col justify-center items-center p-8 relative z-10">
          <h2 className="text-3xl font-extrabold">WELCOME BACK!</h2>
          <p className="mt-4 text-sm text-gray-100 text-center">
            Login to access your account and continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
