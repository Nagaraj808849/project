import { useState, useEffect } from "react";

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Helper to parse price string like "₹150" to number 150
  const parsePrice = (price) => Number(price.replace(/[^0-9.-]+/g, ""));

  // Total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + parsePrice(item.price) * item.qty,
    0
  );

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      // Optionally, clear cart after payment
      localStorage.removeItem("cart");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Restaurant Checkout</h1>
        <p className="text-center text-gray-500 mb-6">Confirm your order & pay</p>

        {/* Order Summary */}
        <div className="border rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-3">Your Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.name} × {item.qty}</span>
              <span>₹{parsePrice(item.price) * item.qty}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Pay Now */}
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl"
        >
          Pay Now
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          * Dummy restaurant payment for demo
        </p>

        {/* Processing Animation */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-72 text-center shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-bold text-green-600 animate-bounce">₹</div>
              </div>
              <p className="font-semibold">Processing Payment...</p>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl">
              <h2 className="text-xl font-bold mb-2 text-green-600">
                Payment Successful 🎉
              </h2>
              <p className="text-gray-600 mb-4">Your food order has been confirmed.</p> 
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
