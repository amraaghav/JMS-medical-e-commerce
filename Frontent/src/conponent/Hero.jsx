import { useState, useEffect } from "react";
import Products from "../pages/Products";

const Hero = () => {
  const medicalImages = [
    { src: "https://www.shutterstock.com/image-photo/clinic-tablet-hands-doctor-patient-260nw-2472677039.jpg", alt: "Pharmacy Store" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDCcPFaJ2FFeZrqu__H7BXInNwfR_qUGOOHg&s", alt: "Medicine Shelves" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0282LGDgnaJVO-bVSYYUJfDZ-dCHOM5uy175tS6gY7NnO9DC7IFRbruMclHG3CXhWsnM&usqp=CAU", alt: "Doctor Prescribing Medicine" },
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
