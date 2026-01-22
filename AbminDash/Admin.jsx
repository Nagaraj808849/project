import React, { useState } from "react";

const AdminDashboard = () => {
  // Menu state
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 150 },
    { id: 3, name: "Pasta", price: 200 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [selectedPage, setSelectedPage] = useState("Dashboard"); // active page
  const [searchQuery, setSearchQuery] = useState(""); // search bar input

  // Orders data
  const orders = [
    { id: "#1001", customer: "John Doe", amount: 450, status: "Completed" },
    { id: "#1002", customer: "Riya Sharma", amount: 720, status: "Pending" },
    { id: "#1003", customer: "Amit Kumar", amount: 320, status: "Cancelled" },
  ];

  // Filter and sort orders
  const filteredOrders = orders
    .filter(
      (order) =>
        order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.customer.localeCompare(b.customer));

  // Add new menu item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    setMenuItems([
      ...menuItems,
      { id: Date.now(), name: newItem.name, price: Number(newItem.price) },
    ]);

    setNewItem({ name: "", price: "" });
  };

  // Delete item
  const handleDelete = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center text-2xl font-extrabold text-red-500 border-b">
          🍴 MyRestaurant
        </div>
        <nav className="flex-1 p-5 space-y-3 text-gray-700">
          {["Dashboard", "Menu", "Orders"].map((page) => (
            <button
              key={page}
              onClick={() => setSelectedPage(page)}
              className={`block w-full text-left p-3 rounded-lg font-medium transition ${
                selectedPage === page
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-100"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex justify-between items-center px-6 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">{selectedPage}</h1>
          <div className="flex items-center gap-4">
            {/* Show search bar only in Orders page */}
            {selectedPage === "Orders" && (
              <input
                type="text"
                placeholder="Search by customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              />
            )}
            <button className="relative">
              🔔
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-8 overflow-y-auto">
          {/* === Dashboard Page === */}
          {selectedPage === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-tr from-red-500 to-red-400 text-white p-6 rounded-2xl shadow-md">
                <h2 className="opacity-80">Total Orders</h2>
                <p className="text-3xl font-extrabold">1,245</p>
              </div>
              <div className="bg-gradient-to-tr from-green-500 to-green-400 text-white p-6 rounded-2xl shadow-md">
                <h2 className="opacity-80">Revenue</h2>
                <p className="text-3xl font-extrabold">₹85,430</p>
              </div>
              <div className="bg-gradient-to-tr from-blue-500 to-blue-400 text-white p-6 rounded-2xl shadow-md">
                <h2 className="opacity-80">Customers</h2>
                <p className="text-3xl font-extrabold">512</p>
              </div>
            </div>
          )}

          {/* === Orders Page === */}
          {selectedPage === "Orders" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Recent Orders
              </h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">{order.customer}</td>
                        <td className="p-3">₹{order.amount}</td>
                        <td
                          className={`p-3 font-medium ${
                            order.status === "Completed"
                              ? "text-green-600"
                              : order.status === "Pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-4 text-center text-gray-500 italic"
                      >
                        No orders match your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* === Menu Page === */}
          {selectedPage === "Menu" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Manage Menu
              </h2>

              {/* Add Menu Item Form */}
              <form
                onSubmit={handleAddItem}
                className="flex flex-col md:flex-row gap-4 mb-6"
              >
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="border p-2 rounded-lg flex-1"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  className="border p-2 rounded-lg w-32"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Add
                </button>
              </form>

              {/* Menu Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3">Item Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {menuItems.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center text-gray-500 p-3">
                        No items in menu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
