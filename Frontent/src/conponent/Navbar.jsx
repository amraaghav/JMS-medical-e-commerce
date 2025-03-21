import { useState, useRef, useContext } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = ({ setHideHero }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setHideHero(!menuOpen); // Control hero visibility
  };

  const handleDropdownBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setDropdownOpen(false);
    }
  };

  // New function to handle dropdown link clicks
  const handleLinkClick = () => {
    setDropdownOpen(false); // Close the dropdown
  };
  const { cartItems } = useContext(CartContext); // ✅ Access cart count

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <header className="relative z-50 bg-white shadow">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              JMS <span className="text-sm">Medical</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="z-50 text-2xl text-gray-700 md:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation */}
          <nav
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none transition-transform duration-300 ${
              menuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
            }`}
          >
            <Link to="/" className="block py-2 text-gray-700 md:inline">
              HOME
            </Link>
            <Link to="/product" className="block py-2 text-gray-700 md:inline">
              MEDICINES
            </Link>
            <Link className="block py-2 text-gray-700 md:inline" to="/about">
              ABOUT
            </Link>
            <Link to="/contact" className="block py-2 text-gray-700 md:inline">
              CONTACT
            </Link>
          </nav>

          {/* User Actions */}
          <div className="relative items-center hidden space-x-4 md:flex">
            <Link to="/signup" className="text-gray-700">
              Sign up
            </Link>
            <div className="flex gap-4">
            <Link to="/cart" className="relative text-white text-lg">
                    🛒 Cart
                    {cartCount > 0 && (
                        <span className="absolute  -bottom-2 -left-2  text-black bg-red-500 rounded-full px-1 text-sm">
                            {cartCount}
                        </span>
                    )}
                </Link>
                </div>
            {/* User Icon & Dropdown */}
            <div className="relative">
              <button
                className="text-gray-700"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={handleDropdownBlur}
              >
                <FaUser />
              </button>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 z-20 w-40 bg-white border rounded-md shadow-lg top-8 "
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/Login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={handleLinkClick}
                  >
                    Sign In
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={handleLinkClick}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
