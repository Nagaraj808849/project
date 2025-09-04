import React, { useState } from "react";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Main Course",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1601924582971-df2de8f3f5f6?auto=format&fit=crop&w=600&q=80",
    description: "Classic cheese and tomato pizza with fresh basil.",
  },
  {
    id: 2,
    name: "Caesar Salad",
    category: "Starters",
    price: "₹199",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    description: "Fresh lettuce, croutons, parmesan, and Caesar dressing.",
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: "₹149",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    description: "Warm chocolate cake with molten center.",
  },
  {
    id: 4,
    name: "Fresh Lime Soda",
    category: "Drinks",
    price: "₹99",
    image:
      "https://images.unsplash.com/photo-1617196039897-3c46c74b40d0?auto=format&fit=crop&w=600&q=80",
    description: "Refreshing soda with lemon and mint.",
  },
];

const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

const Menu1 = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white text-center py-6 shadow-lg">
        <h1 className="text-3xl font-bold">🍴 My Restaurant</h1>
        <p className="text-lg mt-2">Delicious food made with love</p>
      </header>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 flex-wrap py-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid gap-6 px-6 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-red-600 font-semibold">{item.price}</span>
                <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
                  Add +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu1;
