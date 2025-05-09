"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  autoPlayInterval?: number;
  className?: string;
}

const images = [
  {
    src: "/ad.webp", // Replace with the actual path or URL
    alt: "BlueBed Presentation Slide",
    title: "BlueBed Presentation",
    description: "A presentation showcasing BlueBed products.",
  },
  {
    src: "/ad2.png", // Replace with the actual path or URL
    alt: "Order Now Email",
    title: "Special Offer!",
    description: "Order now and get a discount!",
  },
  {
    src: "/p.png", // Replace with the actual path or URL
    alt: "Rocker Dashboard",
    title: "Rocker Analytics Dashboard",
    description: "Data visualization and analytics.",
  },
  {
    src: "/p2.png", // Replace with the actual path or URL
    alt: "Mazer Dashboard",
    title: "Mazer Admin Dashboard",
    description: "User interface for administration.",
  },
];

export default function ImageSlider({
  images: propImages = images,
  autoPlayInterval = 5000,
  className = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image loading state

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % propImages.length);
  }, [propImages.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + propImages.length) % propImages.length);
  }, [propImages.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              className={`object-cover ${isImageLoaded ? '' : 'opacity-0'}`} // Hide until image is loaded
              onLoadingComplete={() => setIsImageLoaded(true)} // Set image as loaded
            />

            {/* Caption overlay */}
            {(propImages[currentIndex].title || propImages[currentIndex].description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                {propImages[currentIndex].title && (
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{propImages[currentIndex].title}</h3>
                )}
                {propImages[currentIndex].description && (
                  <p className="text-sm md:text-base text-gray-200">{propImages[currentIndex].description}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {propImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
