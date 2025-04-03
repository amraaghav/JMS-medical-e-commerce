import { useState, useEffect } from "react";
import Products from "../pages/Products";
import SearchBar from "./SearchBar";

import Home from "../pages/Home";

const Hero = () => {
  const medicalImages = [
    { src: "/images/Banner.jpg", alt: "Pharmacy Store" },
    { src: "/images/Banner.jpg" },
    { src: "/images/Banner.jpg" },
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
         className={`w-full h-full object-fill absolute transition-opacity duration-700 ease-in-out ${
           index === current ? "opacity-100 z-10" : "opacity-0"
         }`}
       />
       
        ))}
      </div>
    
    </section>
        <Home/>
    </div>
    
  );
};

export default Hero;
