import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Added social icons
import ReactPlayer from "react-player";
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import { scroller } from "react-scroll"; // Import scroller for internal navigation

// Array of Vimeo video URLs with titles and descriptions
const videos = [
  {
    url: "https://vimeo.com/1092080900/e3b4de5129?share=copy",
    title: "orbit",
    description: "nvaiofbgveialjvnmdlsnbcx.",
  },
  {
    url: "https://vimeo.com/1092081999/e97da79b8b?share=copy",
    title: "ferniture",
    description: "Cinematic eihfiehag.",
  },
  {
    url: "https://vimeo.com/1092081163/402f6632f7?share=copy",
    title: "nib",
    description: "chocolet.",
  },
  {
    url: "https://vimeo.com/1092080665/477e7b71d4?share=copy",
    title: "nib",
    description: "A visual poem depicting resilience in harsh landscapes.",
  },
];

const Work = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // State for the currently active video index in the carousel
  const [current, setCurrent] = useState(0);
  // State to manage mute/unmute status for each video independently
  const [mutedStates, setMutedStates] = useState(
    Array(videos.length).fill(true) // All videos start muted by default
  );
  // New state to control the visibility of the volume icon (for visual feedback on tap)
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);

  // Function to navigate to the next video in the carousel
  const next = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
    setShowVolumeIcon(false); // Hide icon on navigation
  };

  // Function to navigate to the previous video in the carousel
  const prev = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
    setShowVolumeIcon(false); // Hide icon on navigation
  };

  // Function to toggle the mute state for a specific video by its index
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

  // Function to handle navigation to sections on the home page with scrolling
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

  // Effect hook to add and remove keyboard event listener for navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
      }
      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % videos.length);
      }
      setShowVolumeIcon(false); // Hide icon if navigation via keyboard
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videos.length]); // Depend on videos.length for array size safety

  return (
    <div className="relative bg-black text-white min-h-screen w-full overflow-hidden flex flex-col justify-center items-center pt-24 pb-10"> {/* Adjusted pt-10 to pt-24 for header spacing */}
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')} // Navigate back to home
        className="absolute top-6 left-6 z-40 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
      >
        ← Back to Home
      </button>

      {/* Main heading for the work section */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-purple-400 font-Mightail">My Works</h1>

      {/* Container for the video carousel and its controls */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center">
        {/* Previous Video Button (left arrow) */}
        <button
          onClick={prev}
          className="absolute left-4 sm:left-8 z-30 bg-white/10 hover:bg-white/20 p-4 sm:p-5 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Previous video"
        >
          <FaChevronLeft size={30} />
        </button>

        {/* Inner carousel track that holds all video elements */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {videos.map((video, index) => {
            // Calculate the position of each video relative to the 'current' video
            let positionRelativeToCurrent = index - current;

            // Handle circularity for smooth transitions (e.g., when moving from last to first video)
            // If the video is far to the right, bring it to the left side
            if (positionRelativeToCurrent > videos.length / 2) {
              positionRelativeToCurrent -= videos.length;
            }
            // If the video is far to the left, bring it to the right side
            else if (positionRelativeToCurrent < -videos.length / 2) {
              positionRelativeToCurrent += videos.length;
            }

            // Determine if this is the currently active (middle) video
            const isMiddle = positionRelativeToCurrent === 0;

            // Define responsive offsets for the center of each video slot from the carousel center
            let currentTranslateX = '0px'; // Default for off-screen videos

            if (positionRelativeToCurrent === -1) { // Left video slot
                if (window.innerWidth >= 1024) currentTranslateX = '-450px'; // desktop px
                else if (window.innerWidth >= 768) currentTranslateX = '-45vw'; // md vw
                else if (window.innerWidth >= 640) currentTranslateX = '-40vw'; // sm vw
                else currentTranslateX = '-35vw'; // mobile vw
            } else if (positionRelativeToCurrent === 0) { // Middle video slot
                currentTranslateX = '0px';
            } else if (positionRelativeToCurrent === 1) { // Right video slot
                if (window.innerWidth >= 1024) currentTranslateX = '450px'; // desktop px
                else if (window.innerWidth >= 768) currentTranslateX = '45vw'; // md vw
                else if (window.innerWidth >= 640) currentTranslateX = '40vw'; // sm vw
                else currentTranslateX = '35vw'; // mobile vw
            } else { // Videos outside the immediate 3-video view, push them completely off-screen
                currentTranslateX = positionRelativeToCurrent > 0 ? '150vw' : '-150vw';
            }

            // Define styling for center vs. side videos
            const scale = isMiddle ? 1.05 : 0.75; // Middle is slightly larger/bolder, sides slightly larger (0.75)
            const opacity = isMiddle ? 1 : 0.5; // Middle is fully opaque, sides more visible (0.5)
            const zIndex = isMiddle ? 2 : 1; // Ensure middle video is on top

            // Determine the width class for responsive sizing
            const widthClass = isMiddle
              ? 'w-[98vw] sm:w-[90vw] md:w-[80vw] lg:w-[900px]' // Larger and responsive for center
              : 'w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[650px]'; // Larger and responsive for sides


            return (
              <motion.div
                key={index} // Unique key for each video item, essential for Framer Motion
                className={`
                  absolute flex items-center justify-center aspect-video rounded-2xl shadow-xl overflow-hidden
                  ${widthClass} /* Apply dynamic width */
                  left-1/2 -translate-x-1/2 /* Center horizontally first, then apply x offset */
                  ${isMiddle ? 'cursor-pointer' : ''} /* Add cursor-pointer only for the middle video */
                `}
                // onClick removed from here and moved to the transparent overlay below
                // Animate properties for position (x), scale, opacity, and zIndex
                animate={{
                  x: currentTranslateX, // This will be *additional* translation from the centered position
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 }, // Smooth spring animation for x
                  scale: { duration: 0.3 }, // Faster scale animation
                  opacity: { duration: 0.2 }, // Faster opacity animation
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

                {/* Removed Loading Indicator */}
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

                {/* Video Title and Description Overlay */}
                <motion.div
                  className={`
                    absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4
                    text-center transition-opacity duration-300 pointer-events-none z-15
                    ${isMiddle ? 'opacity-100' : 'opacity-0'}
                  `}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: isMiddle ? '0%' : '100%', opacity: isMiddle ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 font-Mightail">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-LinearSans">
                    {video.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Next Video Button (right arrow) */}
        <button
          onClick={next}
          className="absolute right-4 sm:right-8 z-30 bg-white/10 hover:bg-white/20 p-4 sm:p-5 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Next video"
        >
          <FaChevronRight size={30} />
        </button>
      </div>

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
      <footer className="w-full bg-gray-900 text-gray-400 text-center py-6 min-h-[25vh] flex flex-col justify-around items-center font-LinearSans">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between w-full"> {/* For responsiveness: column on mobile, row on md+ */}
          
          {/* Left side: Description */}
          <div className="text-center md:text-left mb-4 md:mb-0 w-full md:w-1/3 flex flex-col justify-center items-center md:items-start"> {/* Centered on mobile, left-aligned flex container on md+ */}
            <h4 className="font-bold text-lg mb-2 text-purple-300">My Vision</h4>
            <p className="text-sm">
              As a dedicated cinematographer, I blend technical precision with artistic vision to tell compelling stories. My services span from commercial ads to impactful documentaries, focusing on visual excellence and emotional resonance.
            </p>
          </div>

          {/* Middle: Navigation Links (column) and Social Media Icons (row beside links column on md+, below on mobile) */}
          <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-1/3"> {/* Stack and center on mobile, flex-1 and centered on md+ */}
            {/* Navigation Links (always column, centered on mobile, centered in its flex-1 space on md+) */}
            <nav className="mb-4 md:mb-2"> {/* Increased bottom margin for mobile stack, reduced for desktop */}
              <ul className="flex flex-col items-center gap-2 text-lg"> {/* Always column, centered */}
                <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                <li><button onClick={() => handleScrollToSection('service')} className="hover:text-purple-400 transition-colors">Services</button></li>
                <li><button onClick={() => handleScrollToSection('skill')} className="hover:text-purple-400 transition-colors">Skills</button></li>
                <li><button onClick={() => handleScrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button></li>
              </ul>
            </nav>
            {/* Social Media Icons (centered on mobile, centered in its flex-1 space on md+) */}
            <div className="flex justify-center md:justify-center gap-6 mt-4"> {/* Center on mobile, horizontal row */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaFacebook size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaTwitter size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaInstagram size={24} /></a>
            </div>
          </div>

          {/* Right side: Contact Me Button */}
          <div className="flex justify-center w-full md:w-1/3 md:justify-end md:self-start"> {/* Center on mobile, flex-1 and right-aligned on md+ */}
            <button
              onClick={() => handleScrollToSection('contact')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg mt-4" /* Consistent margin top for stacking */
            >
              Contact Me
            </button>
          </div>
        </div>
        {/* Copyright outside the flex container to ensure it's at the very bottom, centered */}
        <div className="container mx-auto px-4 mt-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cinematographer Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Work;
