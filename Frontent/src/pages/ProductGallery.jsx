import { useEffect, useState } from "react";
import axios from "axios";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        console.log("API Response:", response.data); // ✅ Check API response in console
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h2>Product Image Gallery</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${product.imageUrl
                .split("/")
                .pop()}`}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                
              }}
              style={{ width: "100%", height: "auto" }}
            />

            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
