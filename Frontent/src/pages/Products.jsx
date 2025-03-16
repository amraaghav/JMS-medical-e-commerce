import React from 'react';

const Products = () => {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Nike Running Shoes",
      description: "Comfortable and stylish running shoes.",
      price: "₹4,999",
      image: "https://via.placeholder.com/200" // Replace with actual image URL
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      description: "Latest smartphone with advanced features.",
      price: "₹89,999",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "Sony Wireless Headphones",
      description: "Noise-canceling headphones with superior sound.",
      price: "₹7,499",
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold text-blue-600 mt-2">{product.price}</p>
          <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
