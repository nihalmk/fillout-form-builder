import React, { useRef, useState, useEffect, useCallback } from "react";
import Icon from "../Icons/Icon";

interface ScrollContainerProps {
  children: React.ReactNode;
  dependencies?: React.DependencyList;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  dependencies,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollArrows = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } =
        scrollContainerRef.current;
      const tolerance = 1; // Small tolerance for floating point issues
      setShowLeftArrow(scrollLeft > tolerance);
      setShowRightArrow(scrollWidth > clientWidth + scrollLeft + tolerance);
    }
  }, []);

  useEffect(() => {
    checkScrollArrows();

    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollArrows);
      window.addEventListener("resize", checkScrollArrows);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollArrows);
        window.removeEventListener("resize", checkScrollArrows);
      }
    };
  }, [checkScrollArrows, dependencies]);

  const scrollAmount = 200; // Pixels to scroll

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center w-full px-4">
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 p-2 bg-white rounded-r-lg shadow-md border border-r-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Icon image="arrow-left" />
        </button>
      )}
      <div ref={scrollContainerRef} className="flex-grow overflow-x-hidden">
        {children}
      </div>
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 bg-white rounded-l-lg shadow-md border border-l-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Icon image="arrow-right" />
        </button>
      )}
    </div>
  );
};
export default ScrollContainer;
