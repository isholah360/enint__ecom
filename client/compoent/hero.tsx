"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const slides = [
  {
    id: 1,
    image: "/asset/ad1.png",
    title: "Summer Sale",
    subtitle: "Refresh your wardrobe with our collections",
    discount: "30% Off",
    cta: "Shop Now",
    link: "/product",
    backgroundColor: "#D2E0FB", // skyblue
  },
  {
    id: 2,
    image: "/asset/ad2.png",
    title: "Winter Collection",
    subtitle: "Stay cozy and stylish this winter",
    discount: "25% Off",
    cta: "Explore",
    link: "/product",
    backgroundColor: "#FAEDCE", // light
  },
  {
    id: 3,
    image: "/asset/ad5.png",
    title: "New Arrivals",
    subtitle: "Check out the latest trends and styles",
    discount: "15% Off",
    cta: "Discover",
    link: "/product",
    backgroundColor: "#F7B5CA", // lites
  },
  {
    id: 4,
    image: "/asset/ad3.png",
    title: "Clearance Sale",
    subtitle: "Grab the best deals before they’re gone",
    discount: "50% Off",
    cta: "Shop Clearance",
    link: "/product",
    backgroundColor: "#F5EDED", // lits
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP animations on slide change
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
    );
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.6 }
    );
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 3 seconds autoplay

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden hero-out"
      style={{ backgroundColor: slides[currentIndex].backgroundColor }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out hero-in ${
            index === currentIndex ? "opacity-100 show" : "opacity-0 no-show"
          }`}
        >
          <div className="flex h-full px-[5%] gap-x-5 summer-sales">
            <div className="w-1/2 flex flex-col justify-center p-4 text-black hero-contents">
              <h1 ref={titleRef} className="text-5xl font-bold slide-title">
                {slide.title}
              </h1>
              <h2
                ref={subtitleRef}
                className="text-3xl font-semibold slide-subtitle"
              >
                {slide.subtitle}
              </h2>
              <p className="text-3xl font-semibold dicount">{slide.discount}</p>
              <a
                ref={buttonRef}
                href={slide.link}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white w-max rounded hover:bg-blue-700 transition hero-call"
              >
                {slide.cta}
              </a>
            </div>
            <div className="w-1/2 main-img-div">
              <div className="w-full h-full img-div">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-[95%] h-full hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="nav-buttons">
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Hero;
