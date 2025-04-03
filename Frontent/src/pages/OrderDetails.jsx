import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.address || !userDetails.phone) {
      alert("Please fill in all the details!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: selectedItems,
      user: userDetails,
      total: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "Pending",
    };

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Save updated orders
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    console.log("Order Saved:", newOrder); // Debugging Log

    // Navigate to Orders Page
    navigate("/orderpage");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold">Order Details</h2>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={userDetails.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <label className="block font-semibold">Payment Method:</label>
        <select
          name="paymentMethod"
          value={userDetails.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <button
          type="button"
          onClick={handlePlaceOrder}
          className="w-full py-2 mt-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderDetails;
