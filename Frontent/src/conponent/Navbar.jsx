import { useState, useRef, useEffect } from "react";
import { FaUser, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ setHideHero }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setHideHero(!menuOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 bg-white shadow">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          JMS <span className="text-sm">Medical</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="z-50 text-2xl text-gray-700 md:hidden" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:block"
          }`}
        >
          <Link to="/" className="block py-2 text-gray-700 md:inline">HOME</Link>
          <Link to="/product" className="block py-2 text-gray-700 md:inline">MEDICINES</Link>
          <Link to="/about" className="block py-2 text-gray-700 md:inline">ABOUT</Link>
          <Link to="/contact" className="block py-2 text-gray-700 md:inline">CONTACT</Link>
        </nav>

        {/* Right Section */}
        <div className="relative  items-center hidden space-x-4 md:flex">
          <Link to="/login" className="text-gray-700">Sign In</Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-700 text-lg">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button className="text-gray-700" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUser />
            </button>

            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 z-20 w-40 bg-white border rounded-md shadow-lg top-8">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</Link>
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Order</Link>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
