import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/items/${id}`)
      .then((res) => {
        console.log("Fetched Product:", res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Error fetching product details");
        setLoading(false);
      });
  }, [id]);
  if (loading) return <p className="text-center text-gray-500">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

      <div className="grid grid-cols-4 gap-4">
        {/* ✅ Thumbnail Images */}
        <div className="col-span-1 flex flex-col space-y-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/uploads/${img}`}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover border-2 cursor-pointer ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* ✅ Main Image */}
        <div className="col-span-3">
          <img
            src={`http://localhost:3000/uploads/${selectedImage}`}
            alt="Selected Product"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* ✅ Product Description */}
      <p className="text-gray-600 mt-4">{product.description}</p>
      <p className="text-lg font-bold text-blue-600 mt-2">₹{product.price}</p>

      {/* ✅ Buy and Add to Cart Buttons */}
      <div className="mt-4 flex space-x-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">Buy Now</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
