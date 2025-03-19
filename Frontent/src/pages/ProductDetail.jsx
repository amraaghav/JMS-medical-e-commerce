import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6   flex gap-6">
      {/* Left Side - Product Image */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={`http://localhost:5000/uploads/${product.imageUrl.split("/").pop()}`}
          alt={product.name}
          className="w-80 h-80 object-cover rounded-md"
        />
      </div>

      {/* Right Side - Product Details */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>

        {/* Brand, Category, Stock */}
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className={`mt-1 font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center mt-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            4.3 ★
          </span>
          <span className="text-red-500 ml-2 text-sm font-medium">
            95 Ratings & 50 Reviews
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-3">{product.description}</p>

        {/* Price Box */}
        <div className="border p-4 mt-4 rounded-md shadow">
          <p className="text-gray-500 text-sm">MRP</p>
          <p className="text-2xl font-semibold">₹{product.price}</p>
          <p className="text-sm text-gray-500">Inclusive of all taxes</p>

          {/* Quantity Dropdown */}
          <div className="mt-4 flex items-center">
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="1">1 Combo Pack</option>
              <option value="2">2 Combo Packs</option>
              <option value="3">3 Combo Packs</option>
            </select>
            <span className="ml-2 text-gray-600">of 2 packs</span>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-red-500 text-white w-full py-2 mt-4 rounded-md text-lg font-bold hover:bg-red-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
