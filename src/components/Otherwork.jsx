import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Maximize, Minimize } from 'lucide-react';
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router-dom';

// IMPORTANT: Ensure this path is correct for your project structure
import { companies } from '../data/companiesData';

const Otherwork = () => {
    const navigate = useNavigate();

    // Ref for the entire video showcase section to scroll to it
    const videoSectionRef = useRef(null);
    // Using a Map to store refs for each individual ReactPlayer in the carousel
    const videoRefs = useRef(new Map());

    // --- NEW REF FOR PREVENTING INITIAL SCROLL ---
    const isInitialMount = useRef(true);

    // State to manage the currently selected company
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);

    // States for the video carousel
    const [current, setCurrent] = useState(0);
    const [mutedStates, setMutedStates] = useState({});
    const [showVolumeIcon, setShowVolumeIcon] = useState(false);
    const [videoDuration, setVideoDuration] = useState(null); // Not currently displayed, but kept for onDuration prop
    const [isFullscreen, setIsFullscreen] = useState(false);

    // --- IMPROVED STATE FOR TOUCH/SWIPE DIFFERENTIATION ---
    // Instead of isSwiping, let's track if a tap was *intended*
    const [tapCandidate, setTapCandidate] = useState(false); 
    const touchStartTimeRef = useRef(0); // To measure how long the touch lasted

    // --- NEW STATE FOR VIDEO READINESS (for mute/unmute) ---
    const [isCurrentVideoReady, setIsCurrentVideoReady] = useState(false);

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
        console.log("🐛 [selectedCompany useEffect] Triggered. isInitialMount:", isInitialMount.current);
        if (isInitialMount.current) {
            isInitialMount.current = false; // Set to false after the first render
            // DO NOT SCROLL on initial mount
        } else {
            // ONLY SCROLL if it's NOT the initial mount (i.e., a company was clicked)
            if (videoSectionRef.current) {
                videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Reset states relevant to the video player when company changes
        setCurrent(0); // Go back to the first video for the new company
        setShowVolumeIcon(false); // Hide volume icon
        setVideoDuration(null); // Reset duration
        setIsCurrentVideoReady(false); // Reset readiness for the new video

        // Initialize all videos for the new company to muted
        const initialMuteState = {};
        if (selectedCompany && selectedCompany.videos) {
            selectedCompany.videos.forEach((video, index) => {
                initialMuteState[index] = true; // All videos start muted
            });
        }
        setMutedStates(initialMuteState);
        console.log("🐛 [selectedCompany useEffect] Initial mute states set:", initialMuteState);
    }, [selectedCompany]); // Dependency array remains selectedCompany

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
            // console.log(`🐛 [setVideoPlayerRef] Player ref set for index ${index}. Node:`, node);
        } else {
            videoRefs.current.delete(index);
            // console.log(`🐛 [setVideoPlayerRef] Player ref deleted for index ${index}.`);
        }
    }, []);

    // Toggle Fullscreen function for a specific video
    const toggleFullscreen = useCallback((indexToFullscreen) => {
        const playerInstance = videoRefs.current.get(indexToFullscreen);
        if (playerInstance && playerInstance.wrapper) {
            if (!document.fullscreenElement) {
                playerInstance.wrapper.requestFullscreen().catch(err => {
                    console.error(`❌ Error attempting to enable full-screen mode for video ${indexToFullscreen}: ${err.message} (${err.name})`);
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
            setIsCurrentVideoReady(false); // New video, reset readiness
            console.log("➡️ [handleNextVideo] Navigating to next video. isCurrentVideoReady reset to false.");
        }
    }, [selectedCompany, current]);

    const handlePrevVideo = useCallback(() => {
        if (selectedCompany && selectedCompany.videos && current > 0) {
            setCurrent((prev) => prev - 1);
            setShowVolumeIcon(false);
            setIsCurrentVideoReady(false); // New video, reset readiness
            console.log("⬅️ [handlePrevVideo] Navigating to previous video. isCurrentVideoReady reset to false.");
        }
    }, [selectedCompany, current]);

    // Toggle mute state for the CURRENT video in the carousel
    const toggleMute = useCallback(() => {
        console.log("🔊 [toggleMute] Called. Current video:", current);
        console.log("🔊 [toggleMute] isCurrentVideoReady:", isCurrentVideoReady);
        console.log("🔊 [toggleMute] mutedStates[current] BEFORE update:", mutedStates[current]);

        if (!isCurrentVideoReady) {
            console.warn("⚠️ [toggleMute] Video player NOT READY. Skipping volume change.");
            return;
        }

        setMutedStates((prev) => {
            const newMutedState = !prev[current];
            console.log(`🔊 [toggleMute] Setting mutedStates for video ${current} to: ${newMutedState}`);

            // Direct setVolume call added for robustness, though prop should usually suffice
            const playerInstance = videoRefs.current.get(current);
            if (playerInstance && playerInstance.setVolume) {
                playerInstance.setVolume(newMutedState ? 0 : 1);
                console.log(`🔊 [toggleMute] Attempted direct setVolume(${newMutedState ? 0 : 1}) on player instance.`);
            } else if (playerInstance) {
                console.warn(`⚠️ [toggleMute] playerInstance.setVolume not found, relying on prop re-render.`);
            } else {
                console.warn(`⚠️ [toggleMute] playerInstance not found for direct setVolume.`);
            }
            return { ...prev, [current]: newMutedState };
        });

        setShowVolumeIcon(true);
        setTimeout(() => {
            setShowVolumeIcon(false);
        }, 1000);
    }, [current, isCurrentVideoReady, mutedStates]); // Add mutedStates to dependencies for accurate logging

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

    const touchStartXRef = useRef(null);
    const touchEndXRef = useRef(null);
    
    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartTimeRef.current = Date.now();
      setTapCandidate(true);
    };
    
    const handleTouchMove = (e) => {
      touchEndXRef.current = e.touches[0].clientX;
      const distance = Math.abs(touchEndXRef.current - touchStartXRef.current);
      if (distance > touchMoveThreshold) {
        setTapCandidate(false);
      }
    };
    
    // Touch sensitivity and tap duration thresholds
    const sensitivity = 50; // Minimum px for swipe
    const tapMaxDuration = 250; // ms
    const touchMoveThreshold = 10; // px

    const handleTouchEnd = () => {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const touchDuration = Date.now() - touchStartTimeRef.current;

      if (tapCandidate && touchDuration < tapMaxDuration) {
        // It's a tap if it was a candidate and short enough duration
        toggleMute();
        console.log("✔️ [TouchEnd] Detected a TAP for mute/unmute.");
      } else if (Math.abs(distance) > sensitivity) {
        // It's a swipe if movement was significant
        if (distance > sensitivity) {
          handleNextVideo();
          console.log("➡️ [TouchEnd] Detected a SWIPE LEFT for next video.");
        } else { // distance < -sensitivity
          handlePrevVideo();
          console.log("⬅️ [TouchEnd] Detected a SWIPE RIGHT for previous video.");
        }
      } else {
        console.log("ℹ️ [TouchEnd] Neither a clear tap nor a clear swipe. No action.");
      }

      // Reset all touch states
      touchStartXRef.current = 0;
      touchEndXRef.current = 0;
      setTapCandidate(false);
      touchStartTimeRef.current = 0;
    };

    const currentVideoData = selectedCompany?.videos?.[current];

    return (
        <div className="relative bg-black text-white w-full flex flex-col items-center py-12 sm:py-16 px-4 overflow-hidden min-h-screen">
            {/* Main heading for the work section */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-purple-400 font-Mightail text-center">My Works</h1>

            {/* Two-column layout container - equally split (w-1/2 for lg screens), stacked on smaller */}
            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 sm:gap-8 mt-4">
                {/* Left Side: Company Logos / Clients List - takes full width on small screens, 1/2 on large */}
                <div className="w-full lg:w-2/3 p-4 sm:p-6 bg-black rounded-xl shadow-lg ">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-purple-300 mb-6 sm:mb-8 font-Mightail">
                        Clients
                    </h2>
                    {/* Adjusted grid for better mobile responsiveness */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
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
                                        e.stopPropagation(); // Prevent company div click from firing
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
                    id="other-work"
                    ref={videoSectionRef}
                    className="w-full lg:w-1/3 p-4 sm:p-6 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
                >
                    <h2
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-300 mb-4 font-Mightail text-center flex items-center justify-center"
                    >
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
                        >
                            {/* Previous Video Button (left arrow) - Increased z-index */}
                            <button
                                onClick={handlePrevVideo}
                                disabled={current === 0}
                                className={`absolute left-2 sm:left-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                                    ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
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

                                    const baseTranslateUnit = 45;

                                    if (positionRelativeToCurrent === 0) {
                                        currentTranslateX = '0vw';
                                        scale = 1;
                                        opacity = 1;
                                        zIndex = 100;
                                    } else {
                                        currentTranslateX = `${positionRelativeToCurrent * baseTranslateUnit}vw`;
                                        scale = 1 - Math.abs(positionRelativeToCurrent) * 0.15;
                                        opacity = 1 - Math.abs(positionRelativeToCurrent) * 0.3;
                                        scale = Math.max(scale, 0.4);
                                        opacity = Math.max(opacity, 0.1);
                                        zIndex = 100 - Math.abs(positionRelativeToCurrent);
                                    }

                                    const isMiddle = positionRelativeToCurrent === 0;

                                    const widthClass = isMiddle
                                        ? 'w-[95%] sm:w-[90%] md:w-[85%] lg:w-[900px]'
                                        : 'w-[80%] sm:w-[75%] md:w-[70%] lg:w-[650px]';

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
    className="absolute inset-0 z-10 pointer-events-auto"
    onClick={toggleMute}
    onTouchStart={(e) => {
      // Store the initial touch position
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }}
    onTouchMove={(e) => {
      // Calculate movement
      const deltaX = Math.abs(e.touches[0].clientX - this.touchStartX);
      const deltaY = Math.abs(e.touches[0].clientY - this.touchStartY);

      // If significant movement, it's likely a scroll, so don't prevent default
      // You might need to fine-tune these thresholds
      if (deltaX > 10 || deltaY > 10) {
        // Allow default scroll behavior
        return;
      }
      // Otherwise, prevent default to avoid scrolling when intending a tap
      e.preventDefault();
    }}
    onTouchEnd={(e) => {
      // If it was a small movement (likely a tap), trigger toggleMute
      const deltaX = Math.abs(e.changedTouches[0].clientX - this.touchStartX);
      const deltaY = Math.abs(e.changedTouches[0].clientY - this.touchStartY);

      if (deltaX < 10 && deltaY < 10) { // Small threshold for a "tap"
        toggleMute();
      }
    }}
  ></div>
)}

                                            <ReactPlayer
                                                ref={node => setVideoPlayerRef(node, index)}
                                                url={video.url}
                                                playing={isMiddle} // Only play the middle video
                                                loop
                                                volume={mutedStates[index] ? 0 : 1} // Volume controlled by state
                                                controls={false}
                                                width="100%"
                                                height="100%"
                                                onDuration={setVideoDuration}
                                                light={!isMiddle} // Show thumbnail for non-active videos
                                                playIcon={ // Displayed when light={true}
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                                                        <FaChevronRight size={40} className="text-white" />
                                                    </div>
                                                }
                                                onReady={() => {
                                                    if (isMiddle) { // Only set ready for the currently active video
                                                        setIsCurrentVideoReady(true);
                                                        console.log(`✅ [onReady] Video ${index} is READY! current: ${current}, isMiddle: ${isMiddle}`);
                                                        console.log(`✅ [onReady] Initial mutedStates[${index}] upon ready: ${mutedStates[index]}`);
                                                    }
                                                }}
                                                onStart={() => console.log(`▶️ [onStart] Video ${index} started.`)}
                                                onPlay={() => console.log(`▶️ [onPlay] Video ${index} is playing.`)}
                                                onPause={() => console.log(`⏸️ [onPause] Video ${index} is paused.`)}
                                                onEnded={() => console.log(`⏹️ [onEnded] Video ${index} ended.`)}
                                                onError={(e) => console.error(`❌ [onError] Video ${index} error:`, e)}
                                                config={{
                                                    vimeo: {
                                                        playerOptions: { dnt: true, byline: false, portrait: false, title: false }
                                                    },
                                                    youtube: {
                                                        playerVars: {
                                                            disablekb: 1,
                                                            showinfo: 0,
                                                            rel: 0,
                                                            controls: 0,
                                                            modestbranding: 1,
                                                            iv_load_policy: 3,
                                                        }
                                                    }
                                                }}
                                            />
                                            {/* Mute/Unmute Icon Overlay */}
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

                                            {/* Fullscreen Button */}
                                            {isMiddle && (
                                                <button
                                                    onClick={() => toggleFullscreen(index)}
                                                    className={`absolute
                                                        top-2 left-2                      
                                                        md:top-5 md:left-5             
                                                        md:ml-75 md:mt-5                  
                                                        z-[105] text-white rounded-full p-2 sm:p-3 bg-black/60 transition-all duration-300 shadow-lg hover:bg-purple-700
                                                    `}
                                                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                                >
                                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                                </button>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Next Video Button (right arrow) */}
                            <button
                                onClick={handleNextVideo}
                                disabled={current === selectedCompany.videos.length - 1}
                                className={`absolute right-2 sm:right-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                                    ${current === selectedCompany.videos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
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
                            key={current + "_description"}
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
                                        setShowVolumeIcon(false);
                                        setIsCurrentVideoReady(false); // Reset readiness when navigating via dots
                                    }}
                                    className={`
                                        p-1.5 sm:p-2 rounded-full cursor-pointer transition-all duration-300
                                        ${index === current ? 'bg-purple-600 w-3 h-3 sm:w-4 sm:h-4' : 'bg-gray-700 w-2.5 h-2.5 sm:w-3 h-3'}
                                        hover:scale-125
                                    `}
                                >
                                
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Otherwork;