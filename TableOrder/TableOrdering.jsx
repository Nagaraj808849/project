import React, { useState } from "react";
import {useForm} from "react-hook-form"

const TableOrder = () => {
  const {register,handleSubmit}=useForm();
  const {data2,setdata1}=useState([])

  function submit(data)
  {
   
    setdata1(data.username)
    console.log(data2);
  }
 
  return (
    
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-3xl md:text-4xl font-bold text-amber-400 tracking-wide">
          Reservation
        </p>
        <p className="text-xl md:text-2xl font-semibold mt-2 text-white">
          BOOK A TABLE ONLINE
        </p>
      </div>

      {/* Form */}
      <form className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-lg" onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="w-full h-12 px-4 rounded-md bg-white/90 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
            type="text"
            {...register("username")}
            placeholder="USER NAME"
            required
          />
          <input
            className="w-full h-12 px-4 rounded-md bg-white/90 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
            type="email"
           {...register("email")}

            placeholder="USER EMAIL"
            required
          />
          
          <input
            className="w-full h-12 px-4 rounded-md bg-white/90 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
            type="datetime-local"
             {...register("date&time")}

            required
          />
          <input
            className="w-full h-12 px-4 rounded-md bg-white/90 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
            list="browse"
            {...register("no of peoples")}

            placeholder="NO OF PEOPLE"
            required
          />
          
          <datalist id="browse">
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="7" />
            <option value="8" />
            <option value="9" />
          </datalist>

          {/* Full width textarea */}
          <textarea
            className="w-full h-28 px-4 py-3 rounded-md bg-white/90 border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none md:col-span-2 resize-none"
            placeholder="SPECIAL ATTENTIONS"
             {...register("special attention")}

            required
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-40 h-12 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-black font-semibold rounded-xl shadow-md"
          >
            BOOK TABLE
          </button>
        </div>
      </form>
    </div>
   
  );
};

export default TableOrder;
