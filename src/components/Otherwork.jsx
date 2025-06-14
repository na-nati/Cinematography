import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router-dom';

// Array of Vimeo video URLs with titles and descriptions
const videos = [
  {
    url: "https://vimeo.com/1092080900/e3b4de5129?share=copy",
    title: "Orbit",
    description: "A dynamic visual narrative showcasing our recent client collaboration.",
  },
  {
    url: "https://vimeo.com/1092081999/e97da79b8b?share=copy",
    title: "Furniture Showcase",
    description: "An elegant presentation of bespoke furniture designs.",
  },
  {
    url: "https://vimeo.com/1092081163/402f6632f7?share=copy",
    title: "Chocolate Craft",
    description: "Behind the scenes of artisanal chocolate making.",
  },
  {
    url: "https://vimeo.com/1092080665/477e7b71d4?share=copy",
    title: "Nature's Resilience",
    description: "Capturing the enduring beauty of landscapes.",
  },
];

const OtherWork = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [mutedStates, setMutedStates] = useState(
    Array(videos.length).fill(true)
  );
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);

  // --- 1. Stop Circular Carousel Behavior ---
  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, videos.length - 1)); // Stop at last video
    setShowVolumeIcon(false);
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0)); // Stop at first video
    setShowVolumeIcon(false);
  };

  const toggleMute = (index) => {
    setMutedStates((prev) => {
      const newMutedStates = prev.map((muted, i) => (i === index ? !muted : muted));
      return newMutedStates;
    });
    setShowVolumeIcon(true);
    setTimeout(() => {
      setShowVolumeIcon(false);
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrent((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "ArrowRight") {
        setCurrent((prev) => Math.min(prev + 1, videos.length - 1));
      }
      setShowVolumeIcon(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videos.length]);

  // --- 3. Enable Touch/Swipe for Carousel on Mobile ---
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const sensitivity = 50; // Minimum swipe distance to trigger navigation
    if (touchStartX - touchEndX > sensitivity) {
      // Swiped left
      next();
    }
    if (touchStartX - touchEndX < -sensitivity) {
      // Swiped right
      prev();
    }
    setTouchStartX(0); // Reset touch coordinates
    setTouchEndX(0);
  };

  const handleViewMoreWorks = () => {
    navigate('/works');
  };

  return (
    <div className="relative bg-black text-white min-h-screen w-full overflow-hidden flex flex-col justify-center items-center py-10">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-purple-400 font-Mightail">Works</h1>

      {/* Container for the video carousel and its controls */}
      <div
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center"
        onTouchStart={handleTouchStart} // Touch events for swipe
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Video Button (left arrow) - Disabled at start */}
        <button
          onClick={prev}
          disabled={current === 0} // Disable if at the first video
          className={`absolute left-4 sm:left-8 z-30 bg-white/10 p-4 sm:p-5 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
            ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}` // Styling for disabled state
          }
          aria-label="Previous video"
        >
          <FaChevronLeft size={30} />
        </button>

        {/* Inner carousel track that holds all video elements */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {videos.map((video, index) => {
            let positionRelativeToCurrent = index - current;

            // Simplified position calculation for non-circular
            let currentTranslateX = '0px';

            if (positionRelativeToCurrent === -1) { // Left video slot
                if (window.innerWidth >= 1024) currentTranslateX = '-450px';
                else if (window.innerWidth >= 768) currentTranslateX = '-45vw';
                else if (window.innerWidth >= 640) currentTranslateX = '-40vw';
                else currentTranslateX = '-35vw';
            } else if (positionRelativeToCurrent === 0) { // Middle video slot
                currentTranslateX = '0px';
            } else if (positionRelativeToCurrent === 1) { // Right video slot
                if (window.innerWidth >= 1024) currentTranslateX = '450px';
                else if (window.innerWidth >= 768) currentTranslateX = '45vw';
                else if (window.innerWidth >= 640) currentTranslateX = '40vw';
                else currentTranslateX = '35vw';
            } else { // Videos outside the immediate 3-video view
                currentTranslateX = positionRelativeToCurrent > 0 ? '150vw' : '-150vw';
            }

            const isMiddle = positionRelativeToCurrent === 0;
            const scale = isMiddle ? 1.05 : 0.75;
            const opacity = isMiddle ? 1 : 0.5;
            const zIndex = isMiddle ? 2 : 1;

            const widthClass = isMiddle
              ? 'w-[98vw] sm:w-[90vw] md:w-[80vw] lg:w-[900px]'
              : 'w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[650px]';

            return (
              <motion.div
                key={index}
                className={`
                  absolute flex items-center justify-center aspect-video rounded-2xl shadow-xl overflow-hidden
                  ${widthClass}
                  left-1/2 -translate-x-1/2
                  ${isMiddle ? 'cursor-pointer' : ''}
                `}
                animate={{
                  x: currentTranslateX,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  scale: { duration: 0.3 },
                  opacity: { duration: 0.2 },
                }}
              >
                {isMiddle && (
                  <div
                    className="absolute inset-0 z-10"
                    onClick={() => toggleMute(current)}
                    style={{ cursor: 'pointer' }}
                  ></div>
                )}

                <ReactPlayer
                  url={video.url}
                  playing={isMiddle}
                  loop
                  volume={mutedStates[index] ? 0 : 1}
                  controls={false}
                  width="100%"
                  height="100%"
                  config={{
                    vimeo: {
                      playerOptions: { dnt: true, byline: false, portrait: false, title: false }
                    }
                  }}
                />
                <AnimatePresence>
                  {isMiddle && showVolumeIcon && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        absolute z-20 bg-black/60 text-white rounded-full
                        flex items-center justify-center p-3 sm:p-4
                        bottom-4 right-4 sm:bottom-6 sm:right-6
                      `}
                    >
                      {mutedStates[current]
                        ? <FaVolumeMute size={22} />
                        : <FaVolumeUp size={22} />
                      }
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Next Video Button (right arrow) - Disabled at end */}
        <button
          onClick={next}
          disabled={current === videos.length - 1} // Disable if at the last video
          className={`absolute right-4 sm:right-8 z-30 bg-white/10 p-4 sm:p-5 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
            ${current === videos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}` // Styling for disabled state
          }
          aria-label="Next video"
        >
          <FaChevronRight size={30} />
        </button>
      </div>

      {/* --- 2. Move Description Below Video --- */}
      {/* Display current video title and description below the carousel */}
      <motion.div
        key={current} // Key change to re-trigger animation on current change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-8 px-4 max-w-2xl"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2 font-Mightail">
          {videos[current].title}
        </h3>
        <p className="text-base sm:text-lg text-gray-300 font-LinearSans">
          {videos[current].description}
        </p>
      </motion.div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 gap-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setShowVolumeIcon(false);
            }}
            className={`
              p-2 rounded-full cursor-pointer transition-all duration-300
              ${index === current ? 'bg-purple-600 w-4 h-4' : 'bg-gray-700 w-3 h-3'}
              hover:scale-125 focus:outline-none focus:ring-2 focus:ring-purple-400
            `}
            aria-label={`Go to video ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Button to navigate to the full /works page */}
      <button
        onClick={handleViewMoreWorks}
        className="
          mt-16 px-10 py-5 bg-purple-600 text-white text-xl font-bold
          rounded-full shadow-lg hover:bg-purple-700
          transform transition-all duration-300 ease-in-out hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-75
        "
      >
        View More Works
      </button>
    </div>
  );
};

export default OtherWork;