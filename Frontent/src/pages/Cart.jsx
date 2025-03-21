import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
    const { cartItems, removeItem, updateQuantity } = useContext(CartContext);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-4">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-4">
                            <img 
                                src={item.imageUrl || `http://localhost:5000/uploads/${item.image}`} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded-md" 
                            />
                            <p className="font-semibold flex-1 ml-4">{item.name}</p>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                    className="px-2 py-1 border rounded-md text-lg"
                                >-</button>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                    className="w-16 border rounded-md p-1 text-center mx-2"
                                />
                                <button 
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                    className="px-2 py-1 border rounded-md text-lg"
                                >+</button>
                            </div>
                            <p className="font-semibold w-20 text-center">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeItem(index)} className="text-red-500 font-bold">X</button>
                        </div>
                    ))}
                    <div className="text-right font-bold text-lg mt-4">
                        Total: ₹{getTotalPrice()}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Proceed to Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
