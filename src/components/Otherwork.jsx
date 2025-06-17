import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Maximize, Minimize } from 'lucide-react';
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router-dom';

// Import the companies data from your central file
import { companies } from '../data/companiesData'; // Adjust path if needed

const Otherwork = () => {
  const navigate = useNavigate();

  // Ref for the entire video showcase section to scroll to it
  const videoSectionRef = useRef(null);
  // Using a Map to store refs for each individual ReactPlayer in the carousel
  const videoRefs = useRef(new Map());

  // State to manage the currently selected company
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  // States for the video carousel
  const [current, setCurrent] = useState(0); // Renamed from currentVideoIndex to 'current'
  const [mutedStates, setMutedStates] = useState({});
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null); // Duration state (not displayed but kept for consistency)
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Utility function to format duration (seconds to MM:SS) - still exists for onDuration prop, but not displayed
  const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds === null) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  // Effect to scroll to the video section and reset carousel/mute state when a new company is selected
  useEffect(() => {
    // Scroll to the entire video showcase section when selectedCompany changes
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Aligns to very top
    }

    setCurrent(0); // Reset to the first video of the new company
    setShowVolumeIcon(false);
    setVideoDuration(null); // Reset duration on company change
    const initialMuteState = {};
    if (selectedCompany && selectedCompany.videos) {
      selectedCompany.videos.forEach((video, index) => {
        initialMuteState[index] = true; // Initialize based on index for carousel
      });
    }
    setMutedStates(initialMuteState);
  }, [selectedCompany]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Callback to set ref for each video player
  const setVideoPlayerRef = useCallback((node, index) => {
    if (node) {
      videoRefs.current.set(index, node);
    } else {
      videoRefs.current.delete(index);
    }
  }, []);

  // Toggle Fullscreen function for a specific video
  const toggleFullscreen = useCallback((indexToFullscreen) => {
    const playerInstance = videoRefs.current.get(indexToFullscreen);
    if (playerInstance && playerInstance.wrapper) {
      if (!document.fullscreenElement) {
        playerInstance.wrapper.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode for video ${indexToFullscreen}: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  }, []);

  // Carousel Navigation Logic
  const handleNextVideo = useCallback(() => {
    if (selectedCompany && selectedCompany.videos && current < selectedCompany.videos.length - 1) {
      setCurrent((prev) => prev + 1);
      setShowVolumeIcon(false);
    }
  }, [selectedCompany, current]);

  const handlePrevVideo = useCallback(() => {
    if (selectedCompany && selectedCompany.videos && current > 0) {
      setCurrent((prev) => prev - 1);
      setShowVolumeIcon(false);
    }
  }, [selectedCompany, current]);

  // Toggle mute state for the CURRENT video in the carousel
  const toggleMute = useCallback(() => {
    setMutedStates((prev) => {
      const newMutedStates = { ...prev, [current]: !prev[current] };
      return newMutedStates;
    });
    setShowVolumeIcon(true);
    setTimeout(() => {
      setShowVolumeIcon(false);
    }, 1000);
  }, [current]); // Dependency: re-run when 'current' video changes

  // Keyboard Navigation for video carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevVideo();
      }
      if (e.key === "ArrowRight") {
        handleNextVideo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevVideo, handleNextVideo]);

  // Touch/Swipe Logic for Video Carousel
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const sensitivity = 75;
    const distance = touchStartX - touchEndX;

    if (distance > sensitivity) {
      handleNextVideo();
    } else if (distance < -sensitivity) {
      handlePrevVideo();
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const currentVideoData = selectedCompany?.videos?.[current];

  return (
    <div className="relative bg-black text-white w-full flex flex-col items-center py-12 sm:py-16 px-4 overflow-hidden min-h-screen">
      {/* Main heading for the work section */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-purple-400 font-Mightail text-center">My Works</h1>

      {/* Two-column layout container - equally split (w-1/2 for lg screens), stacked on smaller */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 sm:gap-8 mt-4">
        {/* Left Side: Company Logos / Clients List - takes full width on small screens, 1/2 on large */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-black rounded-xl shadow-lg ">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-purple-300 mb-6 sm:mb-8 font-Mightail">
            Clients
          </h2>
          {/* Adjusted grid for better mobile responsiveness */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className={`
                  relative flex flex-col items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 group overflow-hidden
                  min-h-[200px] sm:min-h-[220px] lg:min-h-[230px] xl:min-h-[250px]
                  ${selectedCompany.id === company.id ? 'shadow-xl scale-105 border-purple-500' : 'hover:shadow-lg border-transparent'}
                  bg-gray-800 border-2
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background image (company's logo) */}
                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-300 ease-in-out
                    group-hover:opacity-30
                    ${selectedCompany.id === company.id ? 'opacity-30' : 'opacity-5'}
                  `}
                  style={{
                    backgroundImage: `url(${company.logo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                {/* Dark overlay for readability */}
                <div
                  className={`absolute inset-0 z-0 bg-black transition-opacity duration-300 ease-in-out
                    ${selectedCompany.id === company.id ? 'opacity-60' : 'opacity-80'}
                    group-hover:opacity-60
                  `}
                ></div>

                {/* Content (Logo, Name, Description, Button) */}
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full mb-2"
                  draggable={false}
                />
                <p className="relative z-10 text-sm sm:text-base font-semibold text-white text-center font-LinearSans">{company.name}</p>
                {/* Company description - adjusted font size and line clamp for mobile */}
                <p className="relative z-10 text-xs text-gray-300 text-center mt-1 font-LinearSans leading-tight overflow-hidden line-clamp-3">
                  {company.description}
                </p>

                {/* "Show Works" Button (always visible) */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompany(company);
                  }}
                  className="relative z-20 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg shadow-md
                             opacity-100 transition-opacity duration-300
                             mt-3 whitespace-nowrap text-sm sm:text-base
                             hover:bg-purple-700 transform hover:scale-105"
                  aria-label={`Show works for ${company.name}`}
                  initial={{ opacity: 1, y: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Show Works
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Dynamic Video Carousel - takes full width on small screens, 1/2 on large */}
        <div
          ref={videoSectionRef}
          className="w-full lg:w-1/2 p-4 sm:p-6 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
        >
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-300 mb-4 font-Mightail text-center flex items-center justify-center"
          >
            {/* Company Logo in front of the name */}
            {selectedCompany.logo && (
              <img
                src={selectedCompany.logo}
                alt={`${selectedCompany.name} Logo`}
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full mr-2"
                draggable={false}
              />
            )}
            {selectedCompany.name}
          </h2>

          {selectedCompany.videos && selectedCompany.videos.length > 0 ? (
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center"
              onTouchStart={handleTouchStart} // Touch events for swipe
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous Video Button (left arrow) - Increased z-index */}
              <button
                onClick={handlePrevVideo}
                disabled={current === 0} // Disable if at the first video
                className={`absolute left-2 sm:left-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                  ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`} // Styling for disabled state
                aria-label="Previous video"
              >
                <FaChevronLeft size={24} sm:size={30} />
              </button>

              {/* Inner carousel track that holds all video elements */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {selectedCompany.videos.map((video, index) => {
                  let positionRelativeToCurrent = index - current;
                  let currentTranslateX;
                  let scale;
                  let opacity;
                  let zIndex;

                  // Define base translation unit (e.g., distance between videos)
                  // Adjust '45vw' to control spacing. Smaller values make videos closer.
                  const baseTranslateUnit = 45; // in vw units

                  if (positionRelativeToCurrent === 0) {
                    // Middle video
                    currentTranslateX = '0vw';
                    scale = 1;
                    opacity = 1;
                    zIndex = 100; // Ensure the current video is on top
                  } else {
                    // Videos to the left or right
                    currentTranslateX = `${positionRelativeToCurrent * baseTranslateUnit}vw`;
                    // Gradually decrease scale and opacity for videos further away
                    scale = 1 - Math.abs(positionRelativeToCurrent) * 0.15; // Decrease by 15% per step
                    opacity = 1 - Math.abs(positionRelativeToCurrent) * 0.3; // Decrease by 30% per step

                    // Ensure opacity and scale don't go below a certain threshold
                    scale = Math.max(scale, 0.4); // Minimum scale
                    opacity = Math.max(opacity, 0.1); // Minimum opacity

                    zIndex = 100 - Math.abs(positionRelativeToCurrent); // Further videos have lower z-index
                  }

                  const isMiddle = positionRelativeToCurrent === 0;

                  // Adjusting width based on screen size and position
                  const widthClass = isMiddle
                    ? 'w-[95%] sm:w-[90%] md:w-[85%] lg:w-[900px]' // Use percentages for mobile
                    : 'w-[80%] sm:w-[75%] md:w-[70%] lg:w-[650px]';

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
                        x: currentTranslateX, // This will be *absolute* translation from the centered position
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
                          onClick={toggleMute} // The click handler for mute/unmute
                          style={{ cursor: 'pointer' }} // Visual cursor feedback
                        ></div>
                      )}

                      <ReactPlayer
                        ref={node => setVideoPlayerRef(node, index)} // Attach ref directly to each ReactPlayer
                        url={video.url} // Access video URL from the object
                        playing={isMiddle} // Play only when it's the current video
                        loop // Loop the video continuously
                        volume={mutedStates[index] ? 0 : 1} // Control volume explicitly (0 for muted, 1 for unmuted)
                        controls={false} // Hide default player controls
                        width="100%" // Make player fill its container's width
                        height="100%" // Make player fill its container's height
                        onDuration={setVideoDuration} // Get video duration for potential future use
                        config={{
                          vimeo: { // Vimeo specific player options
                            playerOptions: { dnt: true, byline: false, portrait: false, title: false }
                          },
                          youtube: { // YouTube specific player options
                            playerVars: {
                              disablekb: 1,
                              showinfo: 0,
                              rel: 0,
                              controls: 0, // Hide controls
                              modestbranding: 1, // Hide YouTube logo
                              iv_load_policy: 3, // Hide video annotations
                            }
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
                              flex items-center justify-center p-2 sm:p-3
                              bottom-3 right-3 sm:bottom-4 sm:right-4
                            `}
                          >
                            {mutedStates[current]
                              ? <FaVolumeMute size={20} sm:size={22} />
                              : <FaVolumeUp size={20} sm:size={22} />
                            }
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Fullscreen Button - Only for the middle video, adjusted position for mobile */}
                      {isMiddle && (
                        <button
                          onClick={() => toggleFullscreen(index)} // Pass index to toggleFullscreen
                          className={`absolute top-5 left-3 sm:top-4 sm:left-4 z-[105] text-white ml-35 mt-5 rounded-full p-2 sm:p-3 bg-black/60 transition-all duration-300 shadow-lg hover:bg-purple-700`}
                          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Next Video Button (right arrow) - Increased z-index */}
              <button
                onClick={handleNextVideo}
                disabled={current === selectedCompany.videos.length - 1} // Disable if at the last video
                className={`absolute right-2 sm:right-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                  ${current === selectedCompany.videos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`} // Styling for disabled state
                aria-label="Next video"
              >
                <FaChevronRight size={24} sm:size={30} />
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-base sm:text-lg text-center font-LinearSans mt-8">No videos available for {selectedCompany.name} yet.</p>
          )}

          {/* Display current video title and description below the carousel */}
          {currentVideoData && (
            <motion.div
              key={current + "_description"} // Unique key to re-trigger animation on current video change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-6 sm:mt-8 px-2 sm:px-4 max-w-2xl"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-1 font-Mightail">
                {currentVideoData.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 font-LinearSans">
                {currentVideoData.description}
              </p>
            </motion.div>
          )}

          {/* Dots Navigation */}
          {selectedCompany.videos.length > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
              {selectedCompany.videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setShowVolumeIcon(false); // Hide icon when navigating via dots
                  }}
                  className={`
                    p-1.5 sm:p-2 rounded-full cursor-pointer transition-all duration-300
                    ${index === current ? 'bg-purple-600 w-3 h-3 sm:w-4 sm:h-4' : 'bg-gray-700 w-2.5 h-2.5 sm:w-3 h-3'}
                    hover:scale-125 focus:outline-none focus:ring-2 focus:ring-purple-400
                  `}
                  aria-label={`Go to video ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otherwork;