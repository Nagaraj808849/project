import React, { useState } from "react";

const PaymentPage = () => {
  const [method, setMethod] = useState("");

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      desc: "Enter your UPI ID to pay instantly",
    },
    {
      id: "qr",
      name: "QR Code Scan",
      desc: "Scan QR code for quick payment",
    },
    {
      id: "card",
      name: "Card Payment",
      desc: "Pay using credit/debit card",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      desc: "Pay using mobile wallet",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-6">
        {/* Left: Order Summary */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="text-gray-500 mb-4">Your delicious meal details</p>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Margherita Pizza</span>
              <span>₹350</span>
            </div>
            <div className="flex justify-between">
              <span>Garlic Bread</span>
              <span>₹120</span>
            </div>
            <div className="flex justify-between">
              <span>Coke</span>
              <span>₹60</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹530</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹95.40</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹625.40</span>
            </div>
          </div>
        </div>

        {/* Right: Payment Methods */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
          <p className="text-gray-500 mb-6">
            Choose your preferred payment option
          </p>

          <div className="space-y-4">
            {paymentMethods.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                  method === m.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="w-5 h-5 text-blue-500"
                />
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Complete Payment Button */}
          <button
            className="w-full mt-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition"
            onClick={() =>
              alert(
                method
                  ? `✅ You selected ${method} payment method`
                  : "⚠️ Please select a payment method!"
              )
            }
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
