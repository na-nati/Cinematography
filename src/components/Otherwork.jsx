import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Maximize, Minimize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { companies } from '../data/companiesData';

const LazyReactPlayer = lazy(() => import("react-player"));

const Otherwork = () => {
    const navigate = useNavigate();

    const videoSectionRef = useRef(null);
    const videoRefs = useRef(new Map());

    const isInitialMount = useRef(true);
    // Ref for the timeout to hide the VOLUME icon after a click/tap (only used for desktop)
    const volumeIconTimeoutRef = useRef(null); 

    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const [current, setCurrent] = useState(0);

    const [mutedStates, setMutedStates] = useState({});
    const [videoReadiness, setVideoReadiness] = useState({});

    // State for Volume Icon visibility (temporary on desktop, persistent on mobile after interaction)
    const [showVolumeIcon, setShowVolumeIcon] = useState(false); 
    // State for Fullscreen Button visibility (on hover for desktop, or always clickable in full screen)
    const [showFullscreenButton, setShowFullscreenButton] = useState(false); 
    const [isFullscreen, setIsFullscreen] = useState(false);

    // State to determine if the screen size is desktop
    const [isDesktop, setIsDesktop] = useState(false);

    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchTimeRef = useRef(0);

    const tapThreshold = 10;
    const swipeSensitivity = 50;

    useEffect(() => {
        // Function to check if it's a desktop screen (e.g., width >= 768px for 'md' breakpoint)
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768); 
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize); // Add event listener for dynamic resizing
        
        return () => window.removeEventListener('resize', handleResize); // Clean up
    }, []); // Run only once on mount

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (videoSectionRef.current) {
                videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        setCurrent(0);
        setShowVolumeIcon(false); // Hide volume icon on company change
        setShowFullscreenButton(false); // Hide fullscreen button on company change
        setIsFullscreen(false); // Reset fullscreen state when changing company

        const initialMuteState = {};
        const initialReadinessState = {};
        if (selectedCompany && selectedCompany.videos) {
            selectedCompany.videos.forEach((video, index) => {
                initialMuteState[index] = true;
                initialReadinessState[index] = false;
            });
        }
        setMutedStates(initialMuteState);
        setVideoReadiness(initialReadinessState);

        console.log("⚙️ useEffect [selectedCompany]: Initialized mutedStates and videoReadiness for new client.");
    }, [selectedCompany]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const setVideoPlayerRef = useCallback((node, index) => {
        if (node) {
            videoRefs.current.set(index, node);
        } else {
            videoRefs.current.delete(index);
        }
    }, []);

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

    const handleNavigation = useCallback((direction) => {
        if (!selectedCompany || !selectedCompany.videos) return;

        let newCurrent = current;
        if (direction === 'next' && current < selectedCompany.videos.length - 1) {
            newCurrent = current + 1;
        } else if (direction === 'prev' && current > 0) {
            newCurrent = current - 1;
        } else {
            return;
        }

        setCurrent(newCurrent);
        setShowVolumeIcon(false); // Hide volume icon on navigation
        setShowFullscreenButton(false); // Hide fullscreen button on navigation
        setIsFullscreen(false); // Exit fullscreen when navigating to a new video
        console.log(`➡️ handleNavigation: Moved to index ${newCurrent}.`);
    }, [selectedCompany, current]);

    // Function to show VOLUME icon. Behavior changes based on isDesktop.
    const showVolumeIconOnInteraction = useCallback(() => {
        setShowVolumeIcon(true);
        if (isDesktop) {
            // For desktop, show temporarily
            if (volumeIconTimeoutRef.current) {
                clearTimeout(volumeIconTimeoutRef.current);
            }
            volumeIconTimeoutRef.current = setTimeout(() => {
                setShowVolumeIcon(false);
            }, 1000); // Volume icon visible for 1 second on desktop after click/tap
        }
        // For mobile, it stays true until another action hides it (e.g., tap on volume icon itself)
    }, [isDesktop]);

    const toggleMute = useCallback((event) => {
        if (event) {
            event.stopPropagation(); // Prevent event from bubbling up to the video wrapper's click
        }

        console.log(`🔊 toggleMute called for current: ${current}. VideoReadiness[current]: ${videoReadiness[current]}. Current mute state: ${mutedStates[current]}`);

        if (!videoReadiness[current]) {
            console.warn("⚠️ [toggleMute] Video player NOT READY yet. Skipping volume change.");
            return;
        }

        setMutedStates((prev) => {
            const newMutedState = !prev[current];
            console.log(`✅ Muting state updated for index ${current}: from ${prev[current]} to ${newMutedState}.`);
            return { ...prev, [current]: newMutedState };
        });

        // Always show volume icon on any mute toggle action
        // On mobile, this will make it stay visible. On desktop, it will briefly show.
        showVolumeIconOnInteraction(); 
    }, [current, videoReadiness, mutedStates, showVolumeIconOnInteraction]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                handleNavigation('prev');
            }
            if (e.key === "ArrowRight") {
                handleNavigation('next');
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNavigation]);

    const handleVideoTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
        touchTimeRef.current = Date.now();
        // On touch start, always show the volume icon (for mobile, it will stay)
        showVolumeIconOnInteraction(); 
    };

    const handleVideoTouchMove = (e) => {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartYRef.current);
        // Prevent default only if it's primarily a horizontal movement (potential swipe)
        // or a very small movement (potential tap)
        if (Math.abs(deltaX) > Math.abs(deltaY) || (deltaX < tapThreshold && deltaY < tapThreshold)) {
            e.preventDefault();
        }
    };

    const handleVideoTouchEnd = (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartYRef.current);
        const touchDuration = Date.now() - touchTimeRef.current;

        if (touchDuration < 300 && Math.abs(deltaX) < tapThreshold && deltaY < tapThreshold) {
            // This is a tap gesture on the video itself.
            // If the volume icon is already visible (e.g., from a previous tap or navigation),
            // and the tap is on the video (not the volume icon itself), then toggle mute.
            // If the volume icon is not visible, tapping the video will show it, and the next tap will toggle mute.
            // This logic is simplified; the primary interaction will now be with the volume button itself.
            // The initial tap on the video will just show the volume button.
            if (!isDesktop) { // Only for mobile, if volume icon is not visible, show it
                if (!showVolumeIcon) {
                    showVolumeIconOnInteraction();
                } else { // If already visible, a tap on video itself should toggle mute
                    toggleMute(e);
                }
            } else { // For desktop, a tap on video still toggles mute
                toggleMute(e);
            }
        } else if (Math.abs(deltaX) > swipeSensitivity && deltaY < Math.abs(deltaX) / 2) {
            // Swipe gesture for navigation
            if (deltaX > 0) {
                handleNavigation('prev');
            } else {
                handleNavigation('next');
            }
        }
        touchStartXRef.current = 0;
        touchStartYRef.current = 0;
        touchTimeRef.current = 0;
    };

    const currentVideoData = selectedCompany?.videos?.[current];

    return (
        <div className="relative bg-black text-white w-full flex flex-col items-center py-12 sm:py-16 px-4 overflow-hidden min-h-screen">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-purple-400 font-Mightail text-center">My Works</h1>

            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 sm:gap-8 mt-4">
                <div className="w-full lg:w-2/3 p-4 sm:p-6 bg-black rounded-xl shadow-lg ">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-purple-300 mb-6 sm:mb-8 font-Mightail">
                        Clients
                    </h2>
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
                                <div
                                    className={`absolute inset-0 z-0 bg-black transition-opacity duration-300 ease-in-out
                                        ${selectedCompany.id === company.id ? 'opacity-60' : 'opacity-80'}
                                        group-hover:opacity-60
                                    `}
                                ></div>

                                <img
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full mb-2"
                                    draggable={false}
                                />
                                <p className="relative z-10 text-sm sm:text-base font-semibold text-white text-center font-LinearSans">{company.name}</p>
                                <p className="relative z-10 text-xs text-gray-300 text-center mt-1 font-LinearSans leading-tight overflow-hidden line-clamp-3">
                                    {company.description}
                                </p>

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
                        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center">
                            <button
                                onClick={() => handleNavigation('prev')}
                                disabled={current === 0}
                                className={`absolute left-2 sm:left-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                                    ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
                                aria-label="Previous video"
                            >
                                <FaChevronLeft size={24} sm:size={30} />
                            </button>

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
                                    const isNext = positionRelativeToCurrent === 1;
                                    const isPrevious = positionRelativeToCurrent === -1;

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
                                            // Desktop Hover: Show/Hide fullscreen button
                                            onMouseEnter={isMiddle && isDesktop ? () => setShowFullscreenButton(true) : undefined}
                                            onMouseLeave={isMiddle && isDesktop ? () => setShowFullscreenButton(false) : undefined}
                                            // Click (Desktop) / Tap (Mobile): Logic handled inside touch/click handlers
                                            onClick={isMiddle && isDesktop ? (e) => { // Only desktop click toggles mute on video background
                                                if (e.target.closest('.volume-controls') || e.target.closest('.fullscreen-button')) return;
                                                toggleMute(e);
                                            } : undefined}
                                            onTouchStart={isMiddle ? handleVideoTouchStart : undefined}
                                            onTouchMove={isMiddle ? handleVideoTouchMove : undefined}
                                            onTouchEnd={isMiddle ? handleVideoTouchEnd : undefined}
                                        >
                                            <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">Loading Video...</div>}>
                                                <LazyReactPlayer
                                                    ref={node => setVideoPlayerRef(node, index)}
                                                    url={video.url}
                                                    playing={isMiddle}
                                                    loop
                                                    volume={mutedStates[index] ? 0 : 1}
                                                    controls={false}
                                                    width="100%"
                                                    height="100%"
                                                    light={!(isMiddle || isNext || isPrevious)}
                                                    playIcon={
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                                                            <FaChevronRight size={40} className="text-white" />
                                                        </div>
                                                    }
                                                    onReady={() => {
                                                        console.log(`✅ Player for index ${index} READY.`);
                                                        setVideoReadiness(prev => ({ ...prev, [index]: true }));
                                                        console.log(`🚀 videoReadiness for index ${index} set to TRUE.`);
                                                    }}
                                                    onPlay={() => console.log(`▶️ Player for index ${index} playing.`)}
                                                    onPause={() => console.log(`⏸️ Player for index ${index} paused.`)}
                                                    onBuffer={() => console.log(`⏳ Player for index ${index} buffering.`)}
                                                    onBufferEnd={() => console.log(`✔️ Player for index ${index} buffer ended.`)}
                                                    playsinline
                                                    // Re-added pointerEvents: 'none' to allow wrapper to handle mouse events reliably
                                                    style={isMiddle ? { pointerEvents: 'none' } : {}} 
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
                                            </Suspense>

                                            {/* VOLUME Controls Overlay (Temporary on Desktop, Persistent on Mobile) */}
                                            <AnimatePresence>
                                                {isMiddle && showVolumeIcon && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={`
                                                            volume-controls absolute z-20 bg-black/60 text-white rounded-full
                                                            flex items-center justify-center p-2 sm:p-3
                                                            bottom-3 left-1/2 -translate-x-1/2 
                                                        `}
                                                        // Prevent clicks on the controls from bubbling to the video wrapper
                                                        onClick={toggleMute} // Tap on this button always toggles mute
                                                    >
                                                        <button
                                                            onClick={toggleMute} 
                                                            className="text-white flex items-center justify-center p-1"
                                                            aria-label={mutedStates[current] ? "Unmute video" : "Mute video"}
                                                        >
                                                            {mutedStates[current] ? <FaVolumeMute size={20} sm:size={22} /> : <FaVolumeUp size={20} sm:size={22} />}
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* FULLSCREEN Button (Hover-visible, desktop-only, bottom-right) */}
                                            <AnimatePresence>
                                                {isMiddle && showFullscreenButton && isDesktop && ( // Added isDesktop condition here
                                                    <motion.button
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        transition={{ duration: 0.3 }}
                                                        onClick={() => toggleFullscreen(index)}
                                                        className={`
                                                            fullscreen-button absolute z-20 bg-black/60 text-white rounded-full
                                                            flex items-center justify-center p-2 sm:p-3
                                                            bottom-5 right-5 // Distinct and common position
                                                            shadow-lg hover:bg-purple-700
                                                        `}
                                                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                                    >
                                                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                                    </motion.button>
                                                )}
                                            </AnimatePresence>

                                        </motion.div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handleNavigation('next')}
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

                    {selectedCompany.videos.length > 1 && (
                        <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
                            {selectedCompany.videos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrent(index);
                                        setShowVolumeIcon(false); // Hide controls on dot navigation
                                        setShowFullscreenButton(false); // Hide controls on dot navigation
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