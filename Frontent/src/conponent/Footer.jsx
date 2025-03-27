const Footer = () => {
  return (
    <footer className="bg-slate-800 py-10 px-6 mt-auto ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm m">
        {/* Know Us */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Know Us</h3>
          <ul className="space-y-1 text-white">
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Our Policies</h3>
          <ul className="space-y-1 text-white">
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Our Services</h3>
          <ul className="space-y-1 text-white">
            <li>Order Medicines</li>
            <li>Book Lab Tests</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Connect</h3>
          <div className="flex gap-3 mb-4">
            <span className="text-blue-600 text-xl cursor-pointer">📘</span>
            <span className="text-pink-500 text-xl cursor-pointer">📷</span>
            <span className="text-blue-500 text-xl cursor-pointer">🐦</span>
            <span className="text-red-600 text-xl cursor-pointer">▶️</span>
            <span className="text-black text-xl cursor-pointer">🔗</span>
          </div>

          {/* ✅ Fixed Button Styling */}
          <button className="bg-red-500 text-white px-6 py-2 w-full md:w-auto rounded-md shadow-md hover:bg-red-600 transition duration-300">
            Sign Up
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center">
        <p className="mt-4 text-xs text-white">
          © 2025 JSM Medical Shop. All rights reserved. We do not process Schedule X drugs.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
