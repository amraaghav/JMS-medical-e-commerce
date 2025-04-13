import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  // Calculate total amount
  const totalAmount = selectedItems.reduce((total, id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? total + item.price * item.quantity : total;
  }, 0);

  // Handle single checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };
  const navigate = useNavigate();
  const handleOrderNow = () => {
    navigate("/order-details", { state: { selectedItems } });
  };

  // Handle select all / unselect all
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]); // Uncheck all
    } else {
      setSelectedItems(cartItems.map((item) => item.id)); // Select all
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      ) : (
        <>
         

          <div className="mt-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b p-4 items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mr-3 w-5 h-5"
                  />
                  <img
                    src={`http://localhost:5000/uploads/${item.image.split("/").pop()}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">₹{item.price} x {item.quantity}</p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-300 active:text-red-500 hover:text-red-500"
                >
                  <MdDelete className="w-6 text-3xl" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-lg font-semibold flex justify-between">
            <span>Total Amount (Selected Items):</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
            
          <button
  onClick={handleOrderNow}
  disabled={selectedItems.length === 0}
  className={`w-full py-2 mt-4 rounded-md text-lg font-bold ${
    selectedItems.length > 0
      ? "bg-green-500 text-white hover:bg-green-600"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Order Now
</button>
        </>
      )}
    </div>
  );
};

export default Cart;
