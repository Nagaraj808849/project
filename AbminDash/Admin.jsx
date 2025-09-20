import React, { useState } from "react";

const AdminDashboard = () => {
  // Menu state
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 150 },
    { id: 3, name: "Pasta", price: 200 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });

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
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center text-2xl font-bold text-red-500 border-b">
          🍴 MyRestaurant
        </div>
        <nav className="flex-1 p-4 space-y-3 text-gray-700">
          <a href="#" className="block p-2 rounded hover:bg-red-100">Dashboard</a>
          <a href="#" className="block p-2 rounded hover:bg-red-100">Menu</a>
          <a href="#" className="block p-2 rounded hover:bg-red-100">Orders</a>
          <a href="#" className="block p-2 rounded hover:bg-red-100">Payments</a>
          <a href="#" className="block p-2 rounded hover:bg-red-100">Customers</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex justify-between items-center px-6">
          <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-600">Total Orders</h2>
              <p className="text-3xl font-bold text-red-500">1,245</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-600">Revenue</h2>
              <p className="text-3xl font-bold text-green-500">₹85,430</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-600">Customers</h2>
              <p className="text-3xl font-bold text-blue-500">512</p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Recent Orders</h2>
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
                <tr className="border-b">
                  <td className="p-3">#1001</td>
                  <td className="p-3">John Doe</td>
                  <td className="p-3">₹450</td>
                  <td className="p-3 text-green-600">Completed</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">#1002</td>
                  <td className="p-3">Riya Sharma</td>
                  <td className="p-3">₹720</td>
                  <td className="p-3 text-yellow-600">Pending</td>
                </tr>
                <tr>
                  <td className="p-3">#1003</td>
                  <td className="p-3">Amit Kumar</td>
                  <td className="p-3">₹320</td>
                  <td className="p-3 text-red-600">Cancelled</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Menu Management */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Manage Menu</h2>

            {/* Add Menu Item Form */}
            <form onSubmit={handleAddItem} className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="border p-2 rounded flex-1"
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="border p-2 rounded w-32"
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">₹{item.price}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
