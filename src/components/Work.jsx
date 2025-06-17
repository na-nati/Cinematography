import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate, Link } from 'react-router-dom';
import { scroller } from "react-scroll";

// Array of Vimeo video URLs with titles and descriptions
const videos = [
  {
    url: "https://vimeo.com/1092080900/e3b4de5129?share=copy",
    title: "Orbit",
    description: "A dynamic visual narrative showcasing our recent client collaboration, exploring intricate patterns and fluid movements to represent innovation.",
  },
  {
    url: "https://vimeo.com/1092081999/e97da79b8b?share=copy",
    title: "Furniture Showcase",
    description: "An elegant presentation of bespoke furniture designs, highlighting craftsmanship, material quality, and contemporary aesthetics in various settings.",
  },
  {
    url: "https://vimeo.com/1092081163/402f6632f7?share=copy",
    title: "Chocolate Craft",
    description: "Behind the scenes of artisanal chocolate making, from bean selection to final packaging, emphasizing the passion and precision involved.",
  },
  {
    url: "https://vimeo.com/1092080665/477e7b71d4?share=copy",
    title: "Nature's Resilience",
    description: "Capturing the enduring beauty of landscapes and the perseverance of life, featuring breathtaking views and compelling natural phenomena.",
  },
];

const Otherwork = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [mutedStates, setMutedStates] = useState(
    Array(videos.length).fill(true)
  );
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);

  // Carousel Navigation Logic (Non-Circular)
  // Using useCallback to memoize these functions for useEffect dependencies
  const next = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, videos.length - 1)); // Stop at last video
    setShowVolumeIcon(false);
  }, [videos.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => Math.max(prev - 1, 0)); // Stop at first video
    setShowVolumeIcon(false);
  }, []);

  // Toggle mute state for a specific video
  const toggleMute = (index) => {
    setMutedStates((prev) => {
      const newMutedStates = prev.map((muted, i) => (i === index ? !muted : muted));
      return newMutedStates;
    });
    setShowVolumeIcon(true); // Show icon on tap
    // Set a timeout to hide the icon after a short delay
    setTimeout(() => {
      setShowVolumeIcon(false);
    }, 1000); // Icon will be visible for 1 second
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prev();
      }
      if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]); // Depend on memoized prev and next

  // Touch/Swipe Logic for Mobile
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const sensitivity = 75; // Minimum swipe distance to trigger navigation
    const distance = touchStartX - touchEndX;

    if (distance > sensitivity) {
      // Swiped left
      next();
    } else if (distance < -sensitivity) {
      // Swiped right
      prev();
    }
    setTouchStartX(0); // Reset touch coordinates
    setTouchEndX(0);
  };

  // Function to handle navigation to sections on the home page with smooth scrolling
  const handleScrollToSection = (sectionId) => {
    navigate('/'); // First navigate to the home page
    setTimeout(() => {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50, // Adjust this offset if your fixed Navbar causes overlap
      });
    }, 100); // Small delay to allow navigation to complete
  };

  return (
    <div className="relative bg-black text-white w-full flex flex-col items-center py-16 px-4 overflow-hidden">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-40 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
      >
        ← Back to Home
      </button>

      {/* Main heading for the work section */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-purple-400 font-Mightail text-center">My Works</h1>

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

            let currentTranslateX = '0px'; // Initialize with a default value

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
                key={index} // Unique key for each video item, essential for Framer Motion
                className={`
                  absolute flex items-center justify-center aspect-video rounded-2xl shadow-xl overflow-hidden
                  ${widthClass}
                  left-1/2 -translate-x-1/2
                  ${isMiddle ? 'cursor-pointer' : ''}
                `}
                // Animate properties for position (x), scale, opacity, and zIndex
                animate={{
                  x: currentTranslateX, // This will be *additional* translation from the centered position
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
                {/* Transparent overlay to capture clicks for the middle video */}
                {isMiddle && (
                  <div
                    className="absolute inset-0 z-10" // z-10 ensures it's above ReactPlayer but below mute icon
                    onClick={() => toggleMute(current)} // The click handler
                    style={{ cursor: 'pointer' }} // Visual cursor feedback
                  ></div>
                )}

                <ReactPlayer
                  url={video.url} // Access video URL from the object
                  playing={isMiddle} // Play only when it's the current video
                  loop // Loop the video continuously
                  volume={mutedStates[index] ? 0 : 1} // Control volume explicitly (0 for muted, 1 for unmuted)
                  controls={false} // Hide default player controls
                  width="100%" // Make player fill its container's width
                  height="100%" // Make player fill its container's height
                  config={{
                    vimeo: { // Vimeo specific player options
                      playerOptions: { dnt: true, byline: false, portrait: false, title: false }
                    }
                  }}
                />
                {/* Mute/Unmute Icon Overlay - Remains for visual feedback, will fade out */}
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

      {/* Display current video title and description below the carousel */}
      <motion.div
        key={current + "_description"} // Unique key to re-trigger animation on current video change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-8 px-4 max-w-2xl"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 font-Mightail">
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
              setShowVolumeIcon(false); // Hide icon when navigating via dots
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

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-gray-400 text-center py-6 min-h-[25vh] flex flex-col justify-around items-center font-LinearSans mt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between w-full">
          {/* Left side: Description */}
          <div className="text-center md:text-left mb-4 md:mb-0 w-full md:w-1/3 flex flex-col justify-center items-center md:items-start">
            <h4 className="font-bold text-lg mb-2 text-purple-300">My Vision</h4>
            <p className="text-sm">
              As a dedicated cinematographer, I blend technical precision with artistic vision to tell compelling stories. My services span from commercial ads to impactful documentaries, focusing on visual excellence and emotional resonance.
            </p>
          </div>

          {/* Middle: Navigation Links and Social Media Icons */}
          <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-1/3">
            <nav className="mb-4 md:mb-2">
              <ul className="flex flex-col items-center gap-2 text-lg">
                <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                <li><button onClick={() => handleScrollToSection('service')} className="hover:text-purple-400 transition-colors">Services</button></li>
                <li><button onClick={() => handleScrollToSection('skill')} className="hover:text-purple-400 transition-colors">Skills</button></li>
                <li><button onClick={() => handleScrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button></li>
              </ul>
            </nav>
            <div className="flex justify-center md:justify-center gap-6 mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaFacebook size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaTwitter size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaInstagram size={24} /></a>
            </div>
          </div>

          {/* Right side: Contact Me Button */}
          <div className="flex justify-center w-full md:w-1/3 md:justify-end md:self-start">
            <button
              onClick={() => handleScrollToSection('contact')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg mt-4"
            >
              Contact Me
            </button>
          </div>
        </div>
        {/* Copyright */}
        <div className="container mx-auto px-4 mt-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cinematographer Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Otherwork;