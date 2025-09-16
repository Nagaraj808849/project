import React from "react";

const PortfolioLanding = () => {
  return (
    <div className="bg-[#0b0d17] min-h-screen text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6">
        <div className="text-2xl font-bold text-cyan-400">VirTuo</div>
        <ul className="hidden md:flex space-x-8 text-gray-300">
          <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer">Services</li>
          <li className="hover:text-cyan-400 cursor-pointer">About</li>
          <li className="hover:text-cyan-400 cursor-pointer">Resume</li>
          <li className="hover:text-cyan-400 cursor-pointer">Portfolio</li>
          <li className="hover:text-cyan-400 cursor-pointer">Pricing</li>
          <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
          <li className="hover:text-cyan-400 cursor-pointer">Blog</li>
        </ul>
        <div className="flex space-x-4 text-gray-400 text-xl">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-12 py-20">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <p className="text-gray-400 uppercase">Hello</p>
          <h1 className="text-5xl font-bold leading-snug">
            I’m <span className="text-white">Jane Cooper</span> <br />
            A <span className="text-cyan-400">UI/UX Designer.</span>
          </h1>
          <p className="text-gray-400 max-w-lg">
            A personal portfolio is a collection of your work, achievements, and
            skills that highlights your abilities and professional growth.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition">
            View Portfolio →
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-700 opacity-20 rounded-full blur-3xl"></div>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/15/54/restaurant-2027017_960_720.png" 
            alt="profile"
            className="relative z-10 w-[350px] md:w-[400px] rounded-xl"
          />
          <h2 className="absolute bottom-0 right-0 text-6xl font-extrabold opacity-20">
            WEB DESIGNER
          </h2>
        </div>
      </section>
    </div>
  );
};

export default PortfolioLanding;
