// src/components/OutroAnimations.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import your actual outro animation screenshots here
// MAKE SURE TO REPLACE THESE WITH YOUR OWN IMAGE PATHS!
import outro1 from '../assets/12435.png';
import outro2 from '../assets/A one .jpg';
import outro3 from '../assets/ewawa.png';
import outro4 from '../assets/Orbit.png';

// Define your outro animation works data
const outroWorks = [
  { id: 1, image: outro1, title: 'Corporate Identity Outro', description: 'A polished and modern animation for corporate branding, emphasizing brand consistency.' },
  { id: 2, image: outro2, title: 'Dynamic Event Closer', description: 'An energetic and captivating outro designed for event highlights and promotional content.' },
  { id: 3, image: outro3, title: 'Vlog & Social Media Final', description: 'A friendly and engaging outro perfect for personal vlogs and social media content, encouraging engagement.' },
  { id: 4, image: outro4, title: 'Cinematic Trailer End Tag', description: 'A dramatic and visually rich closing sequence suitable for film trailers and intros, creating a lasting impression.' },
];

const OutroAnimations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State to pause auto-scroll on hover (desktop only)
  const [isMobile, setIsMobile] = useState(false); // State to detect mobile screen size
  const intervalRef = useRef(null); // Ref for the auto-scroll interval

  // Refs for touch events
  const touchStartXRef = useRef(0);
  const touchTimeRef = useRef(0);
  const SWIPE_THRESHOLD = 50; // Minimum horizontal pixels for a swipe

  const SLIDE_INTERVAL = 4000; // Auto-scroll every 4 seconds (slightly faster)

  // Function to start the automatic scrolling
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear any existing interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % outroWorks.length);
    }, SLIDE_INTERVAL);
  }, []);

  // Function to stop the automatic scrolling
  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Effect to manage auto-scroll based on hover state (desktop) and touch interaction (mobile)
  useEffect(() => {
    if (!isHovered) { // Auto-scroll if not hovered
      startAutoScroll();
    } else { // Stop auto-scroll if hovered
      stopAutoScroll();
    }

    // Cleanup function: stop auto-scroll when component unmounts
    return () => stopAutoScroll();
  }, [isHovered, startAutoScroll, stopAutoScroll]);

  // Effect to detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px as the mobile breakpoint
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Run only once on mount

  // Handle manual navigation via dots
  const handleDotClick = (index) => {
    stopAutoScroll(); // Stop auto-scroll on manual interaction
    setCurrentIndex(index);
    startAutoScroll(); // Restart auto-scroll after a short delay
  };

  // Handle manual navigation via next button
  const handleNext = useCallback(() => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % outroWorks.length);
    startAutoScroll();
  }, [stopAutoScroll, startAutoScroll]);

  // Handle manual navigation via previous button
  const handlePrev = useCallback(() => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + outroWorks.length) % outroWorks.length);
    startAutoScroll();
  }, [stopAutoScroll, startAutoScroll]);

  // State to control animation direction (1 for next/forward, -1 for prev/backward)
  const [direction, setDirection] = useState(1);

  useEffect(() => {
      // Simple way to determine direction for auto-scroll animation
      // When currentIndex updates, it's usually moving forward in auto-scroll
      setDirection(1);
  }, [currentIndex]);

  // Touch event handlers for swipe navigation
  const handleTouchStart = useCallback((e) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchTimeRef.current = Date.now();
      stopAutoScroll(); // Temporarily stop auto-scroll on touch
  }, [stopAutoScroll]);

  const handleTouchEnd = useCallback((e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartXRef.current;
      const touchDuration = Date.now() - touchTimeRef.current;

      // Check for swipe gesture (quick horizontal movement beyond threshold)
      if (touchDuration < 500 && Math.abs(deltaX) > SWIPE_THRESHOLD) {
          if (deltaX < 0) { // Swiped left (move to next slide)
              setDirection(1);
              handleNext();
          } else { // Swiped right (move to previous slide)
              setDirection(-1);
              handlePrev();
          }
      }
      startAutoScroll(); // Resume auto-scroll after interaction
  }, [handleNext, handlePrev, startAutoScroll]);


  return (
    <div className="relative bg-black text-white w-full flex flex-col items-center py-12 sm:py-16 px-4 overflow-hidden min-h-[70vh]">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-purple-400 font-Mightail text-center">
        Outro Animation Works
      </h2>

      <div
        className="relative w-full max-w-6xl aspect-[4/1] h-auto rounded-lg shadow-xl overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)} // Desktop hover
        onMouseLeave={() => setIsHovered(false)} // Desktop hover
        onTouchStart={handleTouchStart} // Mobile touch/swipe
        onTouchEnd={handleTouchEnd} // Mobile touch/swipe
        style={{ minHeight: '180px' }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
                enter: (dir) => ({
                    x: dir > 0 ? '100%' : '-100%',
                    opacity: 0,
                    scale: 0.9,
                }),
                center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                },
                exit: (dir) => ({
                    x: dir < 0 ? '100%' : '-100%',
                    opacity: 0,
                    scale: 0.9,
                }),
            }}
            transition={{
              x: { duration: 0.7, ease: "easeOut" },
              opacity: { duration: 0.4, ease: "easeOut" },
              scale: { duration: 0.7, ease: "easeOut" },
            }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <img
              src={outroWorks[currentIndex].image}
              alt={outroWorks[currentIndex].title}
              className="w-full h-full object-cover"
            />
            {/* Overlay for title and description */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-1">
                {outroWorks[currentIndex].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-LinearSans">
                {outroWorks[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (visibility adjusted for mobile) */}
        <button
          onClick={() => { setDirection(-1); handlePrev(); }}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full text-white
            ${isMobile ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'} // Always slightly visible on mobile
            transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400`}
          aria-label="Previous slide"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={() => { setDirection(1); handleNext(); }}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full text-white
            ${isMobile ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'} // Always slightly visible on mobile
            transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400`}
          aria-label="Next slide"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Dots at the bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {outroWorks.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300
                ${index === currentIndex ? 'bg-purple-500' : 'bg-gray-400 hover:bg-gray-300'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutroAnimations;