import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching product details");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    console.log("Added to cart", product);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-4">Price:₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
