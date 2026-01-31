import { ShoppingCart, Home, Menu, Phone, HelpCircle, ChevronRight, ChevronLeft, UtensilsCrossed, User, LogOut } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/useAuth";



export default function Navigation() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollRight1 = () => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft1 = () => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleProtectedAction = (path) => {
    if (!user) {
      navigate("/Login");
    } else {
      navigate(path);
    }
  };

  const scrollRight2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const interiors1 = [
    { url: "https://www.properties.market/ae/blog/wp-content/uploads/2023/08/Best-Restaurant-Interior-Design-Ideas-for-a-Luxurious-Ambiance.png", name: "Luxury Lounge" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKXC1gJvZBygA1c_Z7aufOOiGyYXPTAl9hA&s", name: "Modern Dining" },
    { url: "https://image.made-in-china.com/202f0j00vjsVGDznnZgY/Low-Price-Banquet-Hall-Villa-Restaurant-Big-Luxury-Stainless-Steel-LED-Chandelier.webp", name: "Chandelier Elegance" },
    { url: "https://m.media-amazon.com/images/I/61KOHFhWbpL._UF1000,1000_QL80_.jpg", name: "Cozy Corners" },
    { url: "https://i.pinimg.com/736x/86/c8/38/86c838458f7545d8b9fa313f39da0f56.jpg", name: "Garden Cafe" },
  ];

  const interiors2 = [
    { url: "https://images.venuebookingz.com/17948-1550558769-wm-IMG-20190219-WA0028.jpg", name: "Elegant Hall" },
    { url: "https://images.picxy.com/cache/2020/4/27/117bfb820202ec7224c73745d5f76e43.jpg", name: "Banquet Space" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oKBr_XUJIZZwoAORYBbTyyBYcCGSe5HB7WvwYPdlRYBkDkVN7zBdm3LZhb1SJqadv0o&usqp=CAU", name: "Party Room" },
    { url: "https://i.ytimg.com/vi/RP2f34BlHhw/maxresdefault.jpg", name: "Event Setup" },
    { url: "https://www.avikalp.com/cdn/shop/products/MWZ3112_wallpaper1.jpg?v=1746038321", name: "Sleek & Modern" },
  ];

  return (
    <div className="w-full overflow-x-hidden">
    
     
      <section
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://www.properties.market/ae/blog/wp-content/uploads/2023/08/Best-Restaurant-Interior-Design-Ideas-for-a-Luxurious-Ambiance.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <nav className="absolute top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">🍴 Golden Essence</h1>
            <ul className="flex space-x-8">
              <li><a href="#home" className="flex items-center gap-2 text-white font-medium hover:text-amber-600"><Home size={20}/> Home</a></li>
              <li>
                <button onClick={() => handleProtectedAction("/Menu1")} className="flex items-center gap-2 text-white font-medium hover:text-amber-600">
                  <Menu size={20}/> Menu
                </button>
              </li>
              <li><a href="#interiors" className="flex items-center gap-2 text-white font-medium hover:text-amber-600"><HelpCircle size={20}/> Interiors</a></li>
              <li><a href="#book" className="flex items-center gap-2 text-white font-medium hover:text-amber-600"><UtensilsCrossed size={20}/> Book</a></li>
              <li><a href="#contact" className="flex items-center gap-2 text-white font-medium hover:text-amber-600"><Phone size={20}/> Contact</a></li>
            </ul>
            <div className="flex items-center gap-6">
              <button onClick={() => handleProtectedAction("/Cart")} className="relative cursor-pointer text-white hover:text-amber-600">
                <ShoppingCart size={24}/>
              </button>
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative cursor-pointer text-white hover:text-amber-600"
                  >
                    <User size={24}/>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold text-sm">{user.username}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                      <Link to="/UserDash">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Profile
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/Login">
                    <button className="bg-black hover:bg-amber-200 text-white px-4 py-2 rounded-lg transition">
                      Login
                    </button>
                  </Link>
                  <Link to="/Signup">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition">
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-5xl font-extrabold drop-shadow-lg">Welcome to Golden Essence</h2>
          <p className="mt-4 text-lg">A t aste of prestige, plated in perfection</p>
          {!user && (
            <p className="mt-6 text-amber-300 text-lg font-semibold">
              👉 Click any button to Login or Signup and explore our restaurant
            </p>
          )}
        </div>
      </section>

      
      <section id="interiors" className="h-screen w-full bg-gradient-to-br from-amber-50 to-white relative px-10 py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">Interiors</h2>
        
        
        <div className="relative mb-12">
          <div ref={scrollRef1} className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-6 scrollHide">
            {interiors1.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-72 h-64 rounded-2xl shadow-xl relative overflow-hidden bg-white">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.url})` }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm py-2 text-center">
                  <p className="text-gray-800 font-semibold text-lg">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollLeft1} className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition">
            <ChevronLeft size={24}/>
          </button>
          <button onClick={scrollRight1} className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition">
            <ChevronRight size={24}/>
          </button>
        </div>
        
       
        <h3 className="text-2xl font-bold text-gray-800 mt-1 drop-shadow-sm text-center ">Party Halls / Events</h3>
        <div className="relative">
          <div ref={scrollRef2} className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-6">
            {interiors2.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-72 h-64 rounded-2xl shadow-xl relative overflow-hidden bg-white">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.url})` }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm py-2 text-center">
                  <p className="text-gray-800 font-semibold text-lg">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollLeft2} className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition">
            <ChevronLeft size={24}/>
          </button>
          <button onClick={scrollRight2} className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition">
            <ChevronRight size={24}/>
          </button>
        </div>
      </section>

   
      <div className="h-20 md:h-32"></div> 

     
      <section 
        id="book" 
        className="h-screen w-full bg-cover bg-center relative px-10 py-16 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://thumbs.dreamstime.com/b/luxury-table-settings-fine-dining-glassware-beautiful-blurred-background-events-weddings-preparation-holiday-passover-139822267.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-10 justify-center ">
            <UtensilsCrossed size={40} className="text-amber-300"/> 
            <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">Book a Table</h2>
          </div>
          <p className="text-lg text-white mb-6">Reserve your spot and enjoy a luxurious dining experience at Golden Essence.</p>
          <button
            onClick={() => handleProtectedAction("/TableOrder")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition mt-8"
          >
            Reserve Now
          </button>
        </div>
      </section>
    </div>
  );
}