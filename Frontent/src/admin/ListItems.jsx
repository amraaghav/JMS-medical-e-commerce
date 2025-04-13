import React, { useState, useEffect } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import axios from "axios";

const ListItems = () => {
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("❌ Delete failed:", error.response?.data || error.message);
    }
  };

  const handleEdit = (product) => {
    setEditItem(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { name, brand, category, price, stock, description } = editItem;
      await axios.put(`http://localhost:5000/api/products/${editItem._id}`, {
        name,
        brand,
        category,
        price,
        stock,
        description,
      });
      setEditItem(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 All Products</h2>

      {/* ✏️ Edit Form */}
      {editItem && (
        <div className="mb-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Edit Item</h3>
          <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Name"
            />
            <input
              type="text"
              value={editItem.brand}
              onChange={(e) =>
                setEditItem({ ...editItem, brand: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Brand"
            />
            <input
              type="text"
              value={editItem.category}
              onChange={(e) =>
                setEditItem({ ...editItem, category: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Category"
            />
            <input
              type="number"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({ ...editItem, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Price"
            />
            <input
              type="number"
              value={editItem.stock}
              onChange={(e) =>
                setEditItem({ ...editItem, stock: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Stock"
            />
            <textarea
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
              className="col-span-2 w-full p-2 border rounded"
              placeholder="Description"
            />
            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 📄 Product List */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr className="text-sm text-gray-700">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {product.imageUrl ? (
                      <img
                        src={`http://localhost:5000/uploads/${product.imageUrl
                          .split("/")
                          .pop()}`}
                        alt={product.name}
                        className="w-100 h-14 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.brand}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.description}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FiEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete "${product.name}"?`
                            )
                          ) {
                            handleDelete(product._id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListItems;
