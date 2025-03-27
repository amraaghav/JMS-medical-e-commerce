// import { createContext, useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid"; // ✅ Unique ID Generator
// import { toast } from "react-toastify"; // ✅ Notification for feedback

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);

//     // ✅ Load cart from localStorage on mount
//     useEffect(() => {
//         const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCartItems(storedCart);
//     }, []);

//     // ✅ Update cart state and localStorage
//     const updateCartState = (cart) => {
//         setCartItems([...cart]);
//         localStorage.setItem("cart", JSON.stringify(cart));
//     };

//     const addToCart = (product, quantity = 1) => {
//         if (!product || !product._id) {  
//             console.error("❌ Invalid Product Data:", product); 
//             return;
//         }
    
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
//         console.log("🔍 Existing Cart Data:", cart);
    
//         const existingItem = cart.find((item) => item.id === String(product._id)); 
    
//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             const newCartItem = {
//                 cartId: uuidv4(),
//                 id: String(product._id),  // ✅ Convert ObjectId to string
//                 name: product.name,
//                 price: product.price,
//                 image: product.imageUrl,
//                 quantity,
//             };
//             console.log("🆕 Adding New Item:", newCartItem);
//             cart.push(newCartItem);
//         }
    
//         localStorage.setItem("cart", JSON.stringify(cart));
//         setCartItems(cart);
    
//         console.log("🛒 Updated Cart:", JSON.parse(localStorage.getItem("cart")));
    
//         toast.success(`${product.name} added to cart!`);
//     };
    
    

//     // ✅ Remove item from cart
//     const removeItem = (cartId) => {
//         const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
//         updateCartState(updatedCart);
//         toast.info("Item removed from cart.");
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeItem }}>
//             {children}
//         </CartContext.Provider>
//     );
// };
