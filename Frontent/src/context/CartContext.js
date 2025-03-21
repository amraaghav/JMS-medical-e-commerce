import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // ✅ SAME ID => Increase quantity
        // ✅ DIFFERENT ID => Add as new row
        const existingIndex = cart.findIndex(item => item.id === product.id && item.uniqueId === product.uniqueId);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems(cart);
        toast.success("Item added to cart!");
    };

    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.info("Item removed from cart");
    };

    const updateQuantity = (index, quantity) => {
        const updatedCart = cartItems.map((item, i) =>
            i === index ? { ...item, quantity: quantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
