"use client";
// app/components/Carousel.tsx
import React, { useState, useRef, useEffect } from "react";
import ProfileCard from "../home/ProfileCard";

type CarouselProps = {
  profiles: {
    name: string;
    category: string;
    accolades: string[];
    imageUrl: string;
  }[];
};

const Carousel: React.FC<CarouselProps> = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: Update currentIndex based on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;

      const index = Math.round(scrollLeft / containerWidth);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden w-full">
      <div className="flex flex-row justify-center gap-4 w-full overflow-hidden">
        {/* Scrollable Carousel Container */}
        <div
          ref={containerRef}
          className="flex space-x-4 overflow-x-auto sm:ml-60 scroll-snap-x scroll-smooth"
        >
          {/* Profiles in Carousel */}
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="flex-shrink-0 sm:w-3/4 md:w-1/3 lg:w-1/4 scroll-snap-start"
            >
              {/* Profile Card Component */}
              <ProfileCard
                name={profile.name}
                category={profile.category}
                accolades={profile.accolades}
                imageUrl={profile.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Indicator Dots */}
      <div className="flex space-x-2 mt-2">
        {profiles.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
