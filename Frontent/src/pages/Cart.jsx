import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b p-4">
                <div className="flex items-center">
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
             <MdDelete className="w-36 text-3xl "/>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white w-full py-2 mt-6 rounded-md text-lg font-bold hover:bg-red-600"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
