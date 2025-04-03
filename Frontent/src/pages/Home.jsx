import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Category Images
  const categories = [
    { name: "Diabetes", src: "/images/Diabetes.jpg" },
    { name: "Healthcare", src: "/images/Bone.jpg" },
    { name: "GreenTea", src: "/images/GreenTea.jpg" },
    { name: "Kidney Cares", src: "/images/Kidney Care.jpg" },
    { name: "Derma Care", src: "/images/Derma Care.jpg" },
    { name: "Heart Care", src: "/images/Heart Care.jpg" },
    { name: "Protein Power", src: "/images/Protein Power.jpg" },
    { name: "Medical Devices", src: "/images/Honey.jpg" },
    { name: "Patanjali chayawanprash", src: "/images/Patanjali chayawanprash.jpg" },
    { name: "Prostate Veg Capsule", src: "/images/Prostate Veg Capsule.jpg" },
    { name: "Zandu honey", src: "/images/Zandu honey.jpg" },
    { name: "Kayam Ayurvedic", src: "/images/Kayam Ayurvedic.jpg" },
  ];

  return (
    <div className="max-w-full mx-auto mt-10 text-center mb-11 ">
      <h1 className="text-3xl">
        JMS Medical : <span className=" text-sm">Leading Online Pharmacy & Healthcare Platform</span>
      </h1>
 
      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mt-6 p-5  ">
  {categories.map((category, index) => (
    <div
      key={index}
      className="cursor-pointer transition-transform transform hover:scale-105 flex flex-col items-center"
      onClick={() => navigate(`/product?category=${category.name.toLowerCase()}`)}
    >
      <div className="w-100 h-24 md:h-28 lg:h-32 flex  items-center justify-between ">
        <img
          src={category.src}
          alt={category.name}
          className="w-full h-full object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
        />
      </div>
      <p className="mt-3 text-lg font-semibold text-center">{category.name}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default Home;
