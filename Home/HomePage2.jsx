import React from 'react'
import HomePage3 from './HomePage3'


const HomePage2 = () => {
  return (
    <div>
    <div className='w-[100vw] h-[100vh] bg-gray-400 '>
<header className="flex justify-between items-center w-[100vw] px-6 py-4 shadow-2xl bg-red-500 fixed " >
        <div className="flex items-center gap-3 ">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:scale-110 transition">
            logo
          </div>
          <h1 className="text-3xl font-bold">Restaurant Name</h1>
        </div>

        <nav className="hidden md:flex gap-10">
          <a href="#home" className="px-4 py-2 rounded-lg hover:bg-blue-200 hover:scale-110 transition font-bold">Home</a>
          <a href="#menu" className="px-3 py-2 rounded-lg hover:bg-blue-200 hover:scale-110 transition font-bold">Menu</a>
          <a href="#about" className="px-3 py-2 rounded-lg hover:bg-blue-200 hover:scale-110 transition font-bold">About</a>
          <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-blue-200 hover:scale-110 transition font-bold">Contact</a>
          <a href="#login" className="px-3 py-2 border rounded-lg hover:bg-blue-200 hover:scale-110 transition font-bold">Login</a>
          <a href="#book" className="px-3 py-2 border rounded-lg bg-yellow-400 hover:bg-yellow-500 hover:scale-110 transition font-bold">Book Table</a>
        </nav>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden text-2xl cursor-pointer">☰</div>
      </header>
      
      
      
       </div>
        <div className='w-[100vw] h-[100vh] bg-amber-500'></div>
        <div>
        <HomePage3/>
       </div>
       <div className='w-[100vw] h-[100vh] bg-blue-600'>

       </div>
     
       </div>
  )
}

export default HomePage2
