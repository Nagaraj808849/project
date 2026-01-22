import React from 'react';
import { Link } from 'react-router-dom';

function Homepage1() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">TastyBites</h1>
            </div>              
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-red-600">Home</a>
              <a href="#about" className="text-gray-700 hover:text-red-600">About</a>
              <a href="#menu" className="text-gray-700 hover:text-red-600">Menu</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600">Contact</a>
            </div>
            <div className="md:hidden">
              {/* Mobile menu button */}
              <button className="text-gray-700">☰</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 pb-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to TastyBites</h2>
          <p className="text-xl mb-8">Discover the finest Italian cuisine in town. Fresh ingredients, authentic flavors.</p>
          <img 
            src="img1.jpeg" 
            alt="Delicious Italian Food" 
            className="mx-auto rounded-lg shadow-xl mb-8 max-w-4xl"
          />
       <Link to="/TableOrder">
          <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Reserve a Table
          </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">About Us</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Established in 2010, TastyBites is a family-owned restaurant specializing in traditional Italian dishes. 
              We source our ingredients locally to ensure every meal is a masterpiece.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="https://images.unsplash.com/photo-1529692236671-f1dc28c0a6f4?w=800&q=80&auto=format&fit=crop" 
              alt="Our Chef" 
              className="rounded-lg shadow-md"
            />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h4>
              <p className="text-gray-600 mb-4">
                From the hills of Tuscany to your plate, we bring generations of culinary tradition to life.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Fresh pasta made daily</li>
                <li>• Award-winning wines</li>
                <li>• Cozy atmosphere for all occasions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Menu</h3>
            <p className="text-lg text-gray-600">Indulge in our signature dishes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1601924582971-df4b5a2e6d6c?w=600&q=80&auto=format&fit=crop" 
                alt="Pizza" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Margherita Pizza</h4>
              <p className="text-gray-600 mb-4">Classic tomato, mozzarella, basil.</p>
              <span className="text-red-600 font-bold text-lg">$12.99</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&q=80&auto=format&fit=crop" 
                alt="Pasta" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Carbonara</h4>
              <p className="text-gray-600 mb-4">Creamy pasta with pancetta and egg.</p>
              <span className="text-red-600 font-bold text-lg">$15.99</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1603133872878-684f56e3a403?w=600&q=80&auto=format&fit=crop" 
                alt="Dessert" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Tiramisu</h4>
              <p className="text-gray-600 mb-4">Coffee-infused dessert delight.</p>
              <span className="text-red-600 font-bold text-lg">$8.99</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-lg text-gray-600">Ready to dine? Get in touch!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Location & Hours</h4>
              <p className="text-gray-600 mb-4">123 Food Street, City, State 12345</p>
              <p className="text-gray-600 mb-4">Phone: (555) 123-4567</p>
              <p className="text-gray-600 mb-4">Email: info@tastybites.com</p>
              <p className="text-gray-600">Mon-Sun: 11AM - 10PM</p>
            </div>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <textarea 
                placeholder="Your Message" 
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h5 className="text-xl font-semibold mb-4">TastyBites Restaurant</h5>
          <p className="text-gray-300 mb-4">&copy; 2023 TastyBites. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-red-400">Privacy Policy</a>
            <a href="#" className="hover:text-red-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage1;
