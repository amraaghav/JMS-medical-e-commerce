import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Category Images
  const categories = [
    { name: "Medicines", src: "/images/a2.jpg" },
    { name: "Healthcare", src: "/images/a.webp" },
    { name: "Personal Care", src: "/images/a3.jpg" },
    { name: "Medical Devices", src: "/images/bg1.png" },
    { name: "Medicines", src: "/images/a2.jpg" },
    { name: "Healthcare", src: "/images/a.webp" },
    { name: "Personal Care", src: "/images/a3.jpg" },
    { name: "Medical Devices", src: "/images/bg1.png" },
    { name: "Healthcare", src: "/images/a.webp" },
    { name: "Personal Care", src: "/images/a3.jpg" },
    { name: "Medical Devices", src: "/images/bg1.png" },
    { name: "Medical Devices", src: "/images/bg1.png" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 text-center">
      <h1 className="text-3xl">
        JMS Medical : <span className=" text-sm">Leading Online Pharmacy & Healthcare Platform</span>
      </h1>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mt-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() =>
              navigate(`/product?category=${category.name.toLowerCase()}`)
            }
          >
            <img
              src={category.src}
              alt={category.name}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-lg font-semibold">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
