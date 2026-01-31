import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../src/context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Homepage1");
    }
  }, [isAuthenticated, navigate]);

  // 🔥 Create default admin on first load
  useEffect(() => {
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const defaultAdmin = {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      id: 1,
    };

    const exists = admins.find((a) => a.email === defaultAdmin.email);
    if (!exists) {
      admins.push(defaultAdmin);
      localStorage.setItem("admins", JSON.stringify(admins));
    }
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    // 🔐 Check admin login
    const admin = admins.find(
      (a) =>
        (a.username === loginData.username || a.email === loginData.username) &&
        a.password === loginData.password
    );

    if (admin) {
      login(admin);
      navigate("/Admin");
      return;
    }

    // 👤 Check user login
    const user = users.find(
      (u) =>
        (u.username === loginData.username || u.email === loginData.username) &&
        u.password === loginData.password
    );

    if (user) {
      login({ ...user, role: "user" });
      navigate("/Homepage1");
      return;
    }

    setError("Invalid Username or Password");
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
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
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
