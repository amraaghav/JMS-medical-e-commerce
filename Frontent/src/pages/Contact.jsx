import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };
  const backgroundStyle = {
    backgroundImage: "url('/images/background.png')",
    backgroundSize: "cover",
  
};

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10" >
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Contact Us</h2>

      {submitted && <p className="text-green-600 text-center">Message sent successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Send Message
        </button>
      </form>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold">Our Contact Information</h3>
        <p className="text-gray-700">📍 Hospital Road, Ara, India</p>
        <p className="text-gray-700">📞 +91 6202853534</p>
        <p className="text-gray-700">📧 jsmmedicalshop@gmail.com</p>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-6">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7198.7941197271!2d84.66104415586503!3d25.558453545152595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d5f58a0d42be1%3A0xb802c68a32c1aa04!2sArrah%2C%20Bihar!5e0!3m2!1sen!2sin!4v1742232567146!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

export default Contact;
