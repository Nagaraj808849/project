import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {/* Outer box with glow */}
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.6)] flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center p-10 relative">
          {/* Diagonal cut using pseudo element */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-500 clip-diagonal"></div>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-extrabold mb-3">WELCOME BACK!</h2>
            <p className="text-gray-100 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>

          <form className="space-y-5">
            {/* Username */}
            <div className="flex items-center border-b border-gray-600 py-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border-b border-gray-600 py-2">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-b border-gray-600 py-2">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-5 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-gray-400 text-sm text-center mt-6">
            Already have an account?{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Custom diagonal clip style */}
      <style>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 75% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default Login;
