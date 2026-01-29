import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const initialMenu = [
  { id: 1, name: "Paneer Tikka", category: "Specials", price: 300 },
  { id: 2, name: "Mutton Curry", category: "Specials", price: 400 },
  { id: 3, name: "Veg Biryani", category: "Main Course", price: 250 },
];

export default function Admin() {
  const [menu, setMenu] = useState(() => {
    const storedMenu = localStorage.getItem("menu");
    return storedMenu ? JSON.parse(storedMenu) : initialMenu;
  });

  const [view, setView] = useState("Dashboard"); // Dashboard | Orders | Settings
  const [newSpecial, setNewSpecial] = useState({ name: "", price: "" });

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  const addSpecial = () => {
    if (!newSpecial.name || !newSpecial.price) return;
    const newItem = {
      id: Date.now(),
      name: newSpecial.name,
      price: Number(newSpecial.price),
      category: "Specials",
    };
    setMenu([...menu, newItem]);
    setNewSpecial({ name: "", price: "" });
  };

  const removeSpecial = (id) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setView("Dashboard")}
            className={`hover:bg-gray-700 p-2 rounded ${
              view === "Dashboard" ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            Dashboard
          </button>

          {/* Link to real Menu page */}
          <Link
            to="/Menu1"
            className="block hover:bg-gray-700 p-2 rounded text-white font-medium"
          >
            Menu
          </Link>

          <button
            onClick={() => setView("Orders")}
            className={`hover:bg-gray-700 p-2 rounded ${
              view === "Orders" ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setView("Settings")}
            className={`hover:bg-gray-700 p-2 rounded ${
              view === "Settings" ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {view === "Dashboard" && (
          <h2 className="text-3xl font-bold mb-6">Welcome to Dashboard</h2>
        )}

        {view === "Orders" && (
          <h2 className="text-3xl font-bold mb-6">Orders Management</h2>
        )}

        {view === "Settings" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <div className="bg-white rounded shadow p-6 space-y-4">
              <div className="flex justify-between">
                <span>Restaurant Name:</span>
                <span className="font-semibold">The Spice Hub</span>
              </div>
              <div className="flex justify-between">
                <span>Open Hours:</span>
                <span className="font-semibold">10:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Email:</span>
                <span className="font-semibold">contact@spicehub.com</span>
              </div>
              <div className="flex justify-between">
                <span>Phone Number:</span>
                <span className="font-semibold">+91 9876543210</span>
              </div>
            </div>
          </>
        )}

        {/* Specials Management only visible when view is Dashboard */}
        {view === "Dashboard" && (
          <>
            <h2 className="text-2xl font-bold mt-6 mb-4">Specials Management</h2>

            <div className="mb-6 flex gap-4">
              <input
                type="text"
                placeholder="Special Name"
                className="px-4 py-2 rounded shadow border"
                value={newSpecial.name}
                onChange={(e) =>
                  setNewSpecial({ ...newSpecial, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="px-4 py-2 rounded shadow border"
                value={newSpecial.price}
                onChange={(e) =>
                  setNewSpecial({ ...newSpecial, price: e.target.value })
                }
              />
              <button
                onClick={addSpecial}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Add Special
              </button>
            </div>

            <div className="bg-white rounded shadow p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Name</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menu
                    .filter((item) => item.category === "Specials")
                    .map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">₹{item.price}</td>
                        <td className="p-2">
                          <button
                            onClick={() => removeSpecial(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
