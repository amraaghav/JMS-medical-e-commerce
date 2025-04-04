import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const handleAddToCart = () => {
    const userToken = localStorage.getItem("userToken");
  
    if (!userToken) {
      toast.error("Please sign in to add items to cart!");
      // window.location.href = "/login"; // Navigate to login page
      return;
    }
  
    if (!product) return;
  
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: parseInt(quantity),
      })
    );
    toast.success("Added to cart successfully!");
  };
  

  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }



  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 flex gap-6">
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={`http://localhost:5000/uploads/${product.imageUrl.split("/").pop()}`}
          alt={product.name}
          className="w-fixed h-80 object-cover rounded-md"
        />
      </div>

      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className={`mt-1 font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <p className="text-gray-600 mt-3">{product.description}</p>

        <div className="border p-4 mt-4 rounded-md shadow">
          <p className="text-2xl font-semibold">₹{product.price}</p>

          <div className="mt-4 flex items-center">
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="1">1 Combo Pack</option>
              <option value="2">2 Combo Packs</option>
              <option value="3">3 Combo Packs</option>
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-red-500 text-white w-full py-2 mt-4 rounded-md text-lg font-bold hover:bg-red-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
