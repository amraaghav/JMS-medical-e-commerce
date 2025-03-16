const Footer = () => {
    return (
      <footer className="bg-black py-10 px-6 mt-5">
        {/* Top Section */}
        <div className="container mx-auto text-center mb-10">
          <h2 className="text-xl font-bold">INDIA'S LARGEST HEALTHCARE PLATFORM</h2>
          <div className="flex justify-center gap-10 mt-4 text-lg font-semibold">
            <div>260m+ <span className="text-gray-500 block text-sm">Visitors</span></div>
            <div>31m+ <span className="text-gray-500 block text-sm">Orders Delivered</span></div>
            <div>1800+ <span className="text-gray-500 block text-sm">Cities</span></div>
          </div>
          {/* App Download Section */}
          <div className="mt-6 flex justify-center gap-4">
            <input 
              type="text" 
              placeholder="Enter Phone Number" 
              className="border px-4 py-2 rounded-md"
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded-md">Send Link</button>
          </div>
        </div>
  
        {/* Middle Section */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          {/* Know Us */}
          <div>
            <h3 className="font-semibold mb-3">Know Us</h3>
            <ul className="space-y-1 text-gray-600">
              <li>About Us</li>
              <li>Contact Us</li>
          
            </ul>
          </div>
  
          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-3">Our Policies</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
             
            </ul>
          </div>
  
          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3">Our Services</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Order Medicines</li>
              <li>Book Lab Tests</li>
              
            </ul>
          </div>
  
          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex gap-3 mb-4">
              <span className="text-blue-600 text-xl cursor-pointer">📘</span>
              <span className="text-pink-500 text-xl cursor-pointer">📷</span>
              <span className="text-blue-500 text-xl cursor-pointer">🐦</span>
              <span className="text-red-600 text-xl cursor-pointer">▶️</span>
              <span className="text-black text-xl cursor-pointer">🔗</span>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Sign Up</button>
            {/* App Download */}
            
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="container mx-auto mt-10 text-center text-sm text-gray-600">
          <div className="flex justify-center gap-10">
            <div>
              <h4 className="font-semibold">Reliable</h4>
              <p>All products displayed are from verified pharmacies.</p>
            </div>
            <div>
              <h4 className="font-semibold">Secure</h4>
              <p>We use SSL encryption and PCI DSS compliance.</p>
            </div>
            <div>
              <h4 className="font-semibold">Affordable</h4>
              <p>Save up to 50% on medicines and 80% on lab tests.</p>
            </div>
          </div>
  
          
          <p className="mt-4 text-xs">
            © 2025 JSM Medical Shop. All rights reserved. We do not process Schedule X drugs.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  