import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // Helper to parse price string like "₹150" to number 150
  const parsePrice = (price) => Number(price.replace(/[^0-9.-]+/g, ""));

  const totalAmount = cartItems.reduce(
    (total, item) => total + parsePrice(item.price) * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <Link
  to="/Menu1"
  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition"
>
  ← Back to Menu
</Link>


        <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3 last:border-b-0"
                >
                  <div>
                    <h2 className="font-medium text-lg">{item.name}</h2>
                    <p className="text-gray-500">₹{parsePrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      ₹{parsePrice(item.price) * item.qty}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Payment Button */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold">
                Total: ₹{totalAmount}
              </h2>
              <Link to="/PaymentDetails">
              <button className="mt-4 md:mt-0 w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition">
                Proceed to Payment
              </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
