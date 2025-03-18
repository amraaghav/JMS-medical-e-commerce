import { useState, useEffect } from "react";
import Products from "../pages/Products";
import SearchBar from "./SearchBar";

const Hero = () => {
  const medicalImages = [
    { src: "/images/a.webp", alt: "Pharmacy Store" },
    { src: "/images/a2.jpg" },
    { src: "/images/a3.jpg" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === medicalImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <SearchBar/>
    <section className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center bg-gray-100">
      <div className="relative w-full h-full overflow-hidden">
        {medicalImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover absolute transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0"
            }`}
          />
        ))}
      </div>
    
    </section>
    <Products/>
    </div>
    
  );
};

export default Hero;
