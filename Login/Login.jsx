import React from "react";
import { PiChefHatFill } from "react-icons/pi";
import { GiForkKnifeSpoon } from "react-icons/gi";
// import { FaConciergeBell } from " react-icons/pi"

const Login = () => {
  const cards = [
    {
      icon: <GiForkKnifeSpoon />,
      title: "Quality Food",
    },
    {
      icon: <PiChefHatFill />,

      title: "Classical taste",
    },
    {
      icon: <PiChefHatFill />,
      title: "Skilled chef",
    },
    {
      icon: <PiChefHatFill />,
      title: "Best service",
    },
  ];

  return (
    <section className="py-12 bg-[#F5F9F4]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8">

        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Food
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Quality of Service, Food, Ambiance, and Value of Money are the
            primary elements for choosing a restaurant. Shaif’s Cuisine is one
            of the most exquisite fine-dinning restaurant in Chittagong cities
            with a captivating view of GEC Hills, perfect ambiance, and
            scrumptious food.
          </p>
        </div>

        {/* Right Icons Grid */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-2xl">
              <div className="h-10 w-10 mb-4">{card.icon}</div>
              <h4 className="font-medium">{card.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Login;
