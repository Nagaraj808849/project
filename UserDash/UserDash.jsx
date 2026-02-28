

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/useAuth";
import { COLORS } from "../src/constants/COLORS";

export default function UserDash() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState("home"); // home | profile | orders
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({
    name: user?.username || "User",
    email: user?.email || "user@email.com",
    phone: "+91 98765 43210",
    address: "Bangalore, Karnataka",
  });

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
    
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.reverse()); // Show newest first
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateUserProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    updateProfile({ ...user, username: profile.name, email: profile.email });
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">

      {/* Content */}
      <main className="p-6 max-w-4xl mx-auto">
        {view === "home" && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">Welcome, {profile.name} 👋</h2>
            <p className="text-gray-600 mt-2">Use the profile icon to manage your account</p>
          </div>
        )}

        {view === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">👤 Update Profile</h2>
            <div className="space-y-4">
              <input
                className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <input
                className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <input
                className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <textarea
                className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
              <button
                onClick={updateUserProfile}
                className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 font-semibold transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setView("home")}
                className="w-full border border-amber-500 text-amber-600 py-2 rounded hover:bg-amber-50 font-semibold transition"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {view === "orders" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">🧾 Order Details</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No orders yet</p>
                <p className="text-gray-400 text-sm">Your orders will appear here after checkout</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date} at {order.time}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="mb-3 border-t pt-3">
                      <p className="font-semibold text-sm mb-2">Items:</p>
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-sm text-gray-600 flex justify-between">
                            <span>{item.name} × {item.qty}</span>
                            <span className="font-semibold">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-lg font-bold text-amber-600">₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setView("home")}
              className="mt-4 border border-amber-500 text-amber-600 px-4 py-2 rounded hover:bg-amber-50 font-semibold transition"
            >
              Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
}