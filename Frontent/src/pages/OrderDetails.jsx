import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || {};
  const products = useSelector((state) => state.cart.cartItems);
  const [orders, setOrders] = useState([]);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const savedItems = selectedItems || JSON.parse(localStorage.getItem("selectedItems"));
    if (savedItems) {
      localStorage.setItem("selectedItems", JSON.stringify(savedItems));
      const selectedProducts = savedItems.map((id) =>
        products.find((product) => product.id === id)
      );
      setOrders(selectedProducts);
    }

    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setUserAddress(JSON.parse(storedAddress));
    }
  }, [selectedItems, products]);

  const handleAddAddress = () => {
    navigate("/address");
  };

  const handlePayment = async () => {
    const totalAmount = orders.reduce((acc, item) => acc + item.price * item.quantity, 0);

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await res.json();

      const options = {
        key:"rzp_test_xfdz8hdehyaXJT", // Your Razorpay key
        amount: data.amount,
        currency: data.currency,
        name: "Your Medical Store",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          alert("✅ Payment Successful!");

          const newOrder = {
            total: totalAmount,
            user: {
              name: userAddress?.fullName,
              address: `${userAddress?.locality}, ${userAddress?.address}, ${userAddress?.city}, ${userAddress?.state} - ${userAddress?.pincode}`,
              phone: userAddress?.mobile,
              paymentMethod: "Razorpay",
            },
            items: orders.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: `http://localhost:5000/uploads/${item.image.split("/").pop()}`,
            })),
          };
          

          // ✅ Token-based Authorization
          const token =localStorage.getItem("userToken");


          try {
            await fetch("http://localhost:5000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newOrder), // no need to add userId manually
            });
            
          } catch (error) {
            console.error("Error saving order to MongoDB:", error);
          }

          // Optional: Save locally
          const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
          localStorage.setItem("orders", JSON.stringify([newOrder, ...previousOrders]));

          // 🔁 Redirect
          navigate("/orderpage");
        },
        prefill: {
          name: userAddress?.fullName,
          contact: userAddress?.mobile,
        },
        theme: {
          color: "#22c55e",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">🛒 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border rounded-lg p-6 mb-8 shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex">
                <img
                  src={`http://localhost:5000/uploads/${order.image.split("/").pop()}`}
                  alt={order.name}
                  className="w-28 h-28 object-cover rounded"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold">{order.name}</p>
                  <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">₹{order.price}</p>
              </div>
            </div>
            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Bill Summary</h3>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Item total (MRP)</span>
                <span>₹{order.price * order.quantity}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Platform fee</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total discount</span>
                <span className="text-green-600">- ₹0</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Shipping fee</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>To be paid</span>
                <span>₹{order.price * order.quantity}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-700 font-medium">Delivering to</span>
                {userAddress ? (
                  <div className="mt-1 text-gray-800 leading-6">
                    <p>{userAddress.fullName} - {userAddress.mobile}</p>
                    <p>{userAddress.locality}, {userAddress.address}</p>
                    <p>{userAddress.city} - {userAddress.pincode}, {userAddress.state}</p>
                  </div>
                ) : (
                  <p className="text-red-500 mt-1">No address found</p>
                )}
              </div>
              <button
                onClick={handleAddAddress}
                className="text-blue-600 text-sm underline"
              >
                {userAddress ? "Change Address" : "Add Address"}
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
              >
                Pay Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetails;
