import React, { useState } from "react";
import { FaCreditCard, FaGooglePay, FaWallet } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">
          Complete Your Payment
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              paymentMethod === "card"
                ? "bg-amber-500 text-black font-semibold"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <FaCreditCard /> Card
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              paymentMethod === "wallet"
                ? "bg-amber-500 text-black font-semibold"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setPaymentMethod("wallet")}
          >
            <FaWallet /> Wallets
          </button>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <form className="space-y-5">
            <input
              className="w-full h-12 px-4 rounded-md bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              className="w-full h-12 px-4 rounded-md bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
              type="text"
              placeholder="Card Number"
              maxLength="16"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full h-12 px-4 rounded-md bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
                type="text"
                placeholder="MM/YY"
                required
              />
              <input
                className="w-full h-12 px-4 rounded-md bg-white/90 text-black border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
                type="password"
                placeholder="CVV"
                maxLength="3"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-black font-semibold rounded-xl shadow-md mt-4"
            >
              PAY NOW
            </button>
          </form>
        )}

        {/* Wallet Payment */}
        {paymentMethod === "wallet" && (
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-lg shadow-md h-14 hover:scale-105 transition">
              <SiPhonepe className="text-purple-600 text-2xl" /> PhonePe
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-lg shadow-md h-14 hover:scale-105 transition">
              <FaGooglePay className="text-blue-600 text-2xl" /> Google Pay
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-lg shadow-md h-14 hover:scale-105 transition">
              <SiPaytm className="text-sky-500 text-2xl" /> Paytm
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-lg shadow-md h-14 hover:scale-105 transition">
              <FaWallet className="text-green-500 text-2xl" /> Other Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
