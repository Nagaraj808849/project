import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 300 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 700 },
  { name: "Fri", sales: 600 },
  { name: "Sat", sales: 800 },
  { name: "Sun", sales: 650 },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-red-700 to-red-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">🍴 Resto Admin</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-yellow-300">Dashboard</a>
          <a href="#" className="block hover:text-yellow-300">Orders</a>
          <a href="#" className="block hover:text-yellow-300">Menu</a>
          <a href="#" className="block hover:text-yellow-300">Payments</a>
          <a href="#" className="block hover:text-yellow-300">Reports</a>
          <a href="#" className="block hover:text-yellow-300">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome, Admin 👋</p>
        </header>

      </div>
    </div>
  );
};

export default AdminDashboard;
