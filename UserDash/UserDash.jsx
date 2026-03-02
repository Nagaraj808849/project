import React, { useState, useEffect } from "react";
import { LayoutDashboard, ClipboardList, LogOut, User } from "lucide-react";

export default function UserDash() {
  const [active, setActive] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [showBigImage, setShowBigImage] = useState(false);

  const [profile, setProfile] = useState({
    name: "User Name",
    email: "user@email.com",
    photo: null,
  });

  const [allOrders, setAllOrders] = useState([
    {
      id: 101,
      items: "Pizza x2",
      amount: 850,
      status: "Preparing",
      userEmail: "user@email.com",
    },
    {
      id: 102,
      items: "Burger x1",
      amount: 420,
      status: "Served",
      userEmail: "other@email.com",
    },
    {
      id: 103,
      items: "Biryani x3",
      amount: 900,
      status: "Pending",
      userEmail: "user@email.com",
    },
  ]);

  const myOrders = allOrders.filter(
    (order) => order.userEmail === profile.email
  );

  const totalExpense = myOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  // 🔁 Auto status change every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setAllOrders((prev) =>
        prev.map((order) => {
          if (order.status === "Pending") {
            return { ...order, status: "Preparing" };
          }
          if (order.status === "Preparing") {
            return { ...order, status: "Served" };
          }
          return order;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setSuccessMessage("Profile Updated Successfully ✅");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (!loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-orange-50">
        <button
          onClick={() => setLoggedIn(true)}
          className="bg-orange-400 text-white px-6 py-2 rounded-xl"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-orange-50 relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg text-gray-700 flex flex-col p-5 space-y-6">
        <h1 className="text-2xl font-bold text-orange-500">
          Restaurant Panel
        </h1>

        <button
          onClick={() => setActive("dashboard")}
          className={`flex items-center gap-2 p-2 rounded-xl ${
            active === "dashboard"
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-orange-50"
          }`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>

        <button
          onClick={() => setActive("orders")}
          className={`flex items-center gap-2 p-2 rounded-xl ${
            active === "orders"
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-orange-50"
          }`}
        >
          <ClipboardList size={18} /> Orders
        </button>

        <button
          onClick={() => setActive("profile")}
          className={`flex items-center gap-2 p-2 rounded-xl ${
            active === "profile"
              ? "bg-orange-100 text-orange-600"
              : "hover:bg-orange-50"
          }`}
        >
          <User size={18} /> Profile
        </button>

        <button
          onClick={() => setLoggedIn(false)}
          className="flex items-center gap-2 p-2 rounded-xl text-red-400 mt-auto hover:bg-red-50"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {active === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              Welcome, {profile.name}
            </h2>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-600">
                My Total Expense
              </h3>
              <p className="text-3xl font-bold text-orange-500 mt-2">
                ₹{totalExpense}
              </p>
            </div>
          </div>
        )}

        {active === "orders" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              My Orders
            </h2>

            <div className="space-y-4">
              {myOrders.length === 0 ? (
                <p>No Orders Found</p>
              ) : (
                myOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow p-6 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        Items: {order.items}
                      </p>
                      <p className="text-sm text-gray-600">
                        Amount: ₹{order.amount}
                      </p>
                    </div>

                    <span
                      className={`px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center ${
                        order.status === "Pending"
                          ? "bg-yellow-100 py-4 text-blue-700"
                          : order.status === "Preparing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {active === "profile" && (
          <div>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              User Profile
            </h2>

            <div className="bg-white rounded-2xl shadow max-w-xl p-6 space-y-4">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={profile.photo || "https://via.placeholder.com/120"}
                  alt="Profile"
                  onClick={() => setShowBigImage(true)}
                  className="w-28 h-28 rounded-full object-cover border cursor-pointer"
                />
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
              </div>

              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
              />

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
              />

              <button
                onClick={handleSaveProfile}
                className="w-full bg-orange-400 text-white py-2 rounded-xl hover:bg-orange-500"
              >
                Save Changes
              </button>

              {successMessage && (
                <p className="text-green-600 text-center font-semibold">
                  {successMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Big Image Modal with Back Button */}
      {showBigImage && (
        <div className="fixed inset-0 bg-opacity-150 flex flex-col items-center justify-center">
          <img
            src={profile.photo || "https://via.placeholder.com/250"}
            alt="Big Profile"
            className="w-64 h-64 rounded-full object-cover border-4 border-white mb-6"
          />

          <button
            onClick={() => setShowBigImage(false)}
            className="bg-orange-400 text-white px-6 py-2 rounded-xl hover:bg-orange-500"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}