import React, { useState, useEffect } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import axios from "axios";

const ListItems = () => {
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState(null); // Track the item being edited

  // ✅ Fetch all items from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // ✅ Function to delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // ✅ Function to start editing an item
  const handleEdit = (product) => {
    setEditItem(product);
  };

  // ✅ Function to update an item
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/items/${editItem._id}`, editItem);
      setProducts(products.map((item) => (item._id === editItem._id ? editItem : item)));
      setEditItem(null); // Close the edit form after updating
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Products List</h2>

      {/* ✅ Edit Form */}
      {editItem && (
        <div className="mb-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Edit Item</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Category:</label>
              <input
                type="text"
                value={editItem.category}
                onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="number"
                value={editItem.price}
                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Description:</label>
              <textarea
                value={editItem.description}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update Item
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setEditItem(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* ✅ Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">{product._id}</td>
                <td className="p-3">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:3000/uploads/${product.images[0]}`} // ✅ Fetch images from the database
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3 text-center flex justify-center space-x-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListItems;
