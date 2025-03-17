import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/items/${id}`)
        .then((res) => {
          setProduct(res.data);
          setImages(res.data.images || []);
        })
        .catch((err) => console.error("Error fetching item:", err));
    }
  }, [id]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    images.forEach((image) => formData.append("images", image));

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/items/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/api/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/list-items");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? "Update Item" : "Add New Item"}</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, index) => (
            <label key={index} className="relative cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(index, e)} />
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                {images[index] ? (
                  <img src={URL.createObjectURL(images[index])} alt="Preview" className="w-full h-full object-cover rounded-md" />
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="text-gray-500 text-2xl" />
                    <span className="text-sm">Upload</span>
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Product Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Product Category</label>
            <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Product Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;