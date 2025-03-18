import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">About Our Medical Store</h1>

      <p className="text-gray-700 text-lg text-center mb-8">
        Welcome to our online medical store, your trusted source for high-quality medicines and healthcare products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ✅ Our Mission */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            We aim to provide affordable and genuine healthcare products, ensuring customer satisfaction and health safety.
          </p>
        </div>

        {/* ✅ Why Choose Us */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>100% Authentic Medicines</li>
            <li>Fast & Secure Delivery</li>
            <li>24/7 Customer Support</li>
            <li>Affordable Pricing</li>
          </ul>
        </div>
      </div>

      {/* ✅ Contact Section */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-blue-600">Get in Touch</h2>
        <p className="text-gray-600 mt-2">For inquiries, reach out to us at:</p>
        <p className="text-lg font-semibold text-gray-800">support@medicalstore.com</p>
      </div>
      
    </div>
  );
};

export default About;
