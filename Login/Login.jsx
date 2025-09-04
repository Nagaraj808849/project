import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-[850px] h-[500px] flex rounded-lg shadow-2xl relative overflow-hidden border border-cyan-400">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-500/30 blur-2xl"></div>

        {/* Left Side (Login Form) */}
        <div className="w-1/2 bg-gray-900 flex flex-col justify-center p-10 relative z-10 clip-path-left">
          <h2 className="text-2xl font-semibold mb-6 text-white">Login</h2>

          <form className="space-y-6 text-white">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-400"
              />
              <FaUser className="absolute left-2 top-3 text-cyan-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-400"
              />
              <FaLock className="absolute left-2 top-3 text-cyan-400" />
            </div>

            {/* Button */}
            <button className="w-full py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-500 hover:to-cyan-400 transition font-semibold">
              Login
            </button>
          </form>

          <div className=" flex ">
            <p className="mt-4 text-sm text-gray-400">
            Don’t have an account?{" "}
              <Link to="/Signup">
          <button className="w-[150px] sm:w-[180px] h-[45px] sm:h-[50px]   text-blue-600 font-bold text-base sm:text-lg  flex items-center justify-center gap-2 hover:shadow-2xl hover:bg-black transition-all duration-300">
            Signup
          </button>
        </Link>
          </p>
          </div>
        </div>

        {/* Right Side (Welcome Message) */}
        <div className="w-1/2 bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex flex-col justify-center items-center p-8 relative z-10">
          <h2 className="text-3xl font-extrabold">WELCOME BACK!</h2>
          <p className="mt-4 text-sm text-gray-100 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
 