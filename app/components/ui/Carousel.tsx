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

  /**
   * Optional: Update currentIndex based on most left-aligned inside the scroll area
   * It doesn't assume fixed widths, so it works regardless of margins, flex gaps, or responsive sizing
   * It's scroll-safe inside a overflow-hidden wrapper
   */

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children) as HTMLDivElement[];

      let minDiff = Infinity;
      let visibleIndex = 0;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const diff = Math.abs(cardRect.left - containerRect.left);

        if (diff < minDiff) {
          minDiff = diff;
          visibleIndex = index;
        }
      });

      setCurrentIndex(visibleIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

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
