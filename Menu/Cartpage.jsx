import React, { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Pizza", price: 250, qty: 2 },
    { id: 2, name: "Burger", price: 150, qty: 1 },
    { id: 3, name: "Pasta", price: 200, qty: 3 },
  ]);

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3">Item</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">₹{item.price}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </td>
                    <td className="p-3 font-semibold">
                      ₹{item.price * item.qty}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cart Summary */}
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-bold">Total: ₹{totalAmount}</h2>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 italic">
            Your cart is empty 🛍️
          </p>
        )}
      </div>
    </div>
  );
}
