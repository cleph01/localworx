"use client";
// app/components/Carousel.tsx
import React, { useState } from "react";
import ProfileCard from "./home/ProfileCard";

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

  // Handle the next button click to scroll right
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, profiles.length - 1)
    );
  };

  // Handle the previous button click to scroll left
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="flex flex-row justify-center gap-4 w-full mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div className="flex space-x-4 overflow-x-auto">
        {/* Profiles in Carousel */}
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex-shrink-0 sm:w-3/4 md:w-1/3 lg:w-1/4 mx-2"
          >
            <ProfileCard
              name={profile.name}
              category={profile.category}
              accolades={profile.accolades}
              imageUrl={profile.imageUrl}
            />
          </div>
        ))}
      </div>

      {/* Move left side of the carousel */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full shadow-lg"
        onClick={handlePrev}
      >
        &lt;
      </button>

      {/* Move right side of the carousel */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full shadow-lg"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
