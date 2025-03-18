import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cart", { withCredentials: true })
      .then((res) => {
        setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching cart");
        setLoading(false);
      });
  }, []);

  const handleRemoveFromCart = (id) => {
    axios.delete(`http://localhost:5000/api/cart/${id}`, { withCredentials: true })
      .then(() => {
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.product._id !== id),
        }));
      })
      .catch((err) => console.error("Remove Error:", err));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart?.items.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        cart.items.map((item) => (
          <div key={item.product._id} className="border-b p-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{item.product.name}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.product._id)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
