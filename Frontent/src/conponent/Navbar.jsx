import { useState, useRef } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  return (
    <>
      <header className="bg-white shadow relative z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              JMS <span className="text-sm">Medical</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 text-2xl z-50" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation */}
          <nav
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none transition-transform duration-300 ${
              menuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
            }`}
          >
            <Link to="/" className="block md:inline text-gray-700 py-2">HOME</Link>
            <Link to="/medicines" className="block md:inline text-gray-700 py-2">MEDICINES</Link>
            <a className="block md:inline text-gray-700 py-2" href="#">ABOUT</a>
            <a className="block md:inline text-gray-700 py-2" href="#">CONTACT</a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4 relative">
           
            <Link to="/signup" className="text-gray-700">Sign up</Link>
            <a className="text-gray-700" href="#"><FaShoppingCart /></a>

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
                  className="absolute top-8 right-0 bg-white shadow-lg border rounded-md w-40 z-20 "
                >
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={handleLinkClick}>Profile</Link>
                  <Link to="/signin" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={handleLinkClick}>Sign In</Link>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={handleLinkClick}>Logout</a>
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
