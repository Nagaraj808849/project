import React, { useState } from "react";

const UserDash = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-gradient-to-r from-amber-100 via-orange-200 to-amber-300">
      {/* Header */}
      <div className="w-full h-[15vh] flex items-center justify-center bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg">
        <p className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg font-[Poppins]">
  WELCOME TO USER DASHBOARD
</p>
      </div>

      {/* Layout */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar / Topbar */}
        <div className="w-full md:w-[20vw] min-w-[220px] h-auto md:h-full bg-white/80 backdrop-blur-md shadow-xl flex md:flex-col flex-row items-center justify-center gap-4 md:gap-6 p-4 md:py-12">
          {["Overview", "Order", "Profile"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg sm:text-xl md:text-2xl text-center font-semibold px-4 py-2 rounded-2xl cursor-pointer w-full md:w-[80%] transition-all ${
                activeTab === tab
                  ? "bg-amber-400 text-white shadow-md"
                  : "hover:bg-amber-200 hover:border-2 hover:border-amber-400"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          {activeTab === "Overview" && (
            <div className="text-xl md:text-2xl font-medium text-gray-700">
              📊 This is the Overview Section
            </div>
          )}

          {activeTab === "Order" && (
            <div className="text-xl md:text-2xl font-medium text-gray-700">
              🛒 This is the Order Section
            </div>
          )}

        {activeTab === "Profile" && (
            <div className="text-xl md:text-2xl font-medium text-gray-700">
              This is the Profile section
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
