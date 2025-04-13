import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="mt-16 max-w-5xl mx-auto mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-lg p-4 text-center cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/uploads/${product.imageUrl
                  ?.split("/")
                  .pop()}`}
                alt={product.name}
                className="w-30 h-40 object-cover mx-auto"
              />
            </div>
            <p className="mt-3 font-semibold">{product.name}</p>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
