import React, { useState, useEffect, useMemo } from "react";
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

  const [view, setView] = useState("Dashboard"); // Dashboard | Orders | Settings | Users
  const [newSpecial, setNewSpecial] = useState({ name: "", price: "" });

  // Admin data sources
  const [users, setUsers] = useState(() => {
    const s = localStorage.getItem("users");
    return s ? JSON.parse(s) : [];
  });

  const [admins, setAdmins] = useState(() => {
    const s = localStorage.getItem("admins");
    return s ? JSON.parse(s) : [{ username: "admin", password: "admin123" }];
  });

  const [orders, setOrders] = useState(() => {
    const s = localStorage.getItem("orders");
    return s ? JSON.parse(s) : [];
  });

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Specials management
  const addSpecial = () => {
    if (!newSpecial.name || !newSpecial.price) return;
    const newItem = {
      id: Date.now(),
      name: newSpecial.name,
      price: Number(newSpecial.price),
      category: "Specials",
    };
    setMenu((m) => [...m, newItem]);
    setNewSpecial({ name: "", price: "" });
  };

  const removeSpecial = (id) => {
    setMenu((m) => m.filter((item) => item.id !== id));
  };

  // Users management
  const removeUser = (username) => {
    if (!confirm(`Remove user ${username}? This cannot be undone.`)) return;
    setUsers((u) => u.filter((x) => x.username !== username));
  };

  // Orders management
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      return updated;
    });
  };

  const deleteOrder = (orderId) => {
    if (!confirm(`Delete order ${orderId}?`)) return;
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const pending = orders.filter((o) => o.status === "Pending").length;
    return { totalUsers, totalOrders, revenue, pending };
  }, [users, orders]);

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
            onClick={() => setView("Users")}
            className={`hover:bg-gray-700 p-2 rounded ${
              view === "Users" ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            Users
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
          <>
            <h2 className="text-3xl font-bold mb-6">Overview</h2>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Users</div>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Orders</div>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="text-2xl font-bold">₹{stats.revenue}</div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">Pending</div>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Recent Orders</h3>
            <div className="bg-white rounded shadow p-4">
              {orders.length === 0 ? (
                <div className="text-gray-500">No orders yet.</div>
              ) : (
                <ul className="space-y-3">
                  {orders
                    .slice()
                    .reverse()
                    .slice(0, 6)
                    .map((o) => (
                      <li key={o.id} className="flex justify-between">
                        <div>
                          <div className="font-semibold">{o.id}</div>
                          <div className="text-sm text-gray-600">{o.date} {o.time} • ₹{o.total}</div>
                        </div>
                        <div className="text-sm">
                          <span className="px-2 py-1 bg-gray-100 rounded">{o.status || "Pending"}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </>
        )}

        {view === "Orders" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Orders Management</h2>

            <div className="bg-white rounded shadow p-4">
              {orders.length === 0 ? (
                <div className="text-gray-500">No orders found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Order ID</th>
                      <th className="p-2">Customer</th>
                      <th className="p-2">Total</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .slice()
                      .reverse()
                      .map((o) => (
                        <tr key={o.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{o.id}</td>
                          <td className="p-2">{o.customerName || "-"}</td>
                          <td className="p-2">₹{o.total}</td>
                          <td className="p-2">{o.date} {o.time}</td>
                          <td className="p-2">
                            <select
                              value={o.status || "Pending"}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="border rounded px-2 py-1"
                            >
                              <option>Pending</option>
                              <option>Preparing</option>
                              <option>Completed</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => deleteOrder(o.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {view === "Users" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Users</h2>

            <div className="bg-white rounded shadow p-4">
              {users.length === 0 ? (
                <div className="text-gray-500">No registered users.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Username</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.username} className="border-b hover:bg-gray-50">
                        <td className="p-2">{u.username}</td>
                        <td className="p-2">{u.email || "-"}</td>
                        <td className="p-2">
                          <button
                            onClick={() => removeUser(u.username)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
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
