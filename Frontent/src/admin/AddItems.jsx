import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    branch: "",
    price: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully!");
      navigate("/admin/list-items");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("❌ Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required className="w-full border p-2 mb-4 rounded" />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required className="w-full border p-2 mb-4 rounded" />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required className="w-full border p-2 mb-4 rounded" />
        <input type="text" name="branch" value={product.branch} onChange={handleChange} placeholder="Branch" required className="w-full border p-2 mb-4 rounded" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required className="w-full border p-2 mb-4 rounded" />
        <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" required className="w-full border p-2 mb-4 rounded" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full mb-4" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">➕ Add Product</button>
      </form>
    </div>
  );
};

export default AddItem;
