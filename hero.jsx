import React from 'react'

const hero = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">Digital Restaurant</h1>
        <ul className="flex gap-6 text-gray-700">
          <li className="hover:text-red-500 cursor-pointer">Home</li>
          <li className="hover:text-red-500 cursor-pointer">Menu</li>
          <li className="hover:text-red-500 cursor-pointer">Order</li>
          <li className="hover:text-red-500 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 bg-red-100">
        <h2 className="text-4xl font-bold mb-4">Order Your Favorite Food</h2>
        <p className="text-lg text-gray-700 mb-6">
          Fast delivery. Fresh ingredients. Delicious taste.
        </p>
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
          Explore Menu
        </button>
      </section>

      {/* Menu Section */}
      <section className="py-10 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { name: "Pizza", price: "$8", img: "https://via.placeholder.com/200" },
          { name: "Burger", price: "$5", img: "https://via.placeholder.com/200" },
          { name: "Pasta", price: "$7", img: "https://via.placeholder.com/200" },
        ].map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition">
            <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.price}</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        © {new Date().getFullYear()} Digital Restaurant. All rights reserved.
      </footer>
    </div>
  )
}

export default hero
