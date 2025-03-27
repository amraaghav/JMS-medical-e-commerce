import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <p className="font-bold text-lg">₹{product.price}</p>
            <button 
                onClick={() => addToCart(product)} 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;
