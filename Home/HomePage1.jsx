import React from "react";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-red-600">RestoManage</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-red-600">Features</a>
          <a href="#about" className="hover:text-red-600">About</a>
          <a href="#contact" className="hover:text-red-600">Contact</a>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Restaurant Management <br /> Made Easy 🍽️
          </h2>
          <p className="text-lg md:text-xl">
            Manage your tables, staff, and orders seamlessly with our smart
            Restaurant Management System.
          </p>
          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Try Demo
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/15/54/restaurant-2027017_960_720.png"
            alt="restaurant illustration"
            className="rounded-xl shadow-lg w-4/5"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-10 py-20 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose RestoManage?
        </h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-semibold mb-2">📅 Table Booking</h4>
            <p>Easy reservation system for your customers and staff.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-semibold mb-2">🍔 Order Management</h4>
            <p>Manage online & offline food orders efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-semibold mb-2">👨‍🍳 Staff Handling</h4>
            <p>Track and assign tasks to your employees seamlessly.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-10 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/20/00/30/restaurant-1990466_1280.jpg"
            alt="about us"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-10 mt-8 md:mt-0 space-y-4">
          <h3 className="text-3xl font-bold">About Us</h3>
          <p>
            RestoManage is a modern solution built for restaurants, cafes, and
            hotels to handle their operations smoothly. With user-friendly
            dashboards and analytics, you can boost productivity and customer
            satisfaction.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="px-10 py-16 bg-red-600 text-white text-center"
      >
        <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
        <p>Email: support@restomanage.com | Phone: +91 9876543210</p>
        <p className="mt-4">© 2025 RestoManage. All rights reserved.</p>
      </section>
    </div>
  );
};

export default LandingPage;
