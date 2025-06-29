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
    const volumeIconTimeoutRef = useRef(null);
    const currentRef = useRef(0);

    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const [current, setCurrent] = useState(0);
    const [mutedStates, setMutedStates] = useState({});
    const [videoReadiness, setVideoReadiness] = useState({});
    const [showVolumeIcon, setShowVolumeIcon] = useState(false);
    const [showFullscreenButton, setShowFullscreenButton] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isSectionVisible, setIsSectionVisible] = useState(true);

    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchTimeRef = useRef(0);

    const tapThreshold = 10;
    const swipeSensitivity = 50;

    // --- EFFECT: Intersection Observer for auto-mute on scroll ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSectionVisible(entry.isIntersecting);
                
                if (!entry.isIntersecting) {
                    // Pause and mute all videos when section leaves viewport
                    videoRefs.current.forEach((player, index) => {
                        if (player && player.pause) {
                            try {
                                player.pause();
                                setMutedStates(prev => ({ ...prev, [index]: true }));
                            } catch (error) {
                                console.warn("Error handling video on scroll:", error);
                            }
                        }
                    });
                }
            },
            { threshold: 0.5 }
        );

        if (videoSectionRef.current) {
            observer.observe(videoSectionRef.current);
        }

        return () => {
            if (videoSectionRef.current) observer.unobserve(videoSectionRef.current);
        };
    }, []);

    // Keep currentRef updated
    useEffect(() => {
        currentRef.current = current;
    }, [current]);

    // --- EFFECT: Determine if device is desktop on resize ---
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- EFFECT: Handle company selection change ---
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (videoSectionRef.current) {
            videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Clear previous video refs
        videoRefs.current = new Map();

        setCurrent(0);
        setShowVolumeIcon(false);
        setShowFullscreenButton(false);
        setIsFullscreen(false);

        const initialMuteState = {};
        const initialReadinessState = {};
        if (selectedCompany?.videos) {
            selectedCompany.videos.forEach((_, index) => {
                initialMuteState[index] = true;
                initialReadinessState[index] = false;
            });
        }
        setMutedStates(initialMuteState);
        setVideoReadiness(initialReadinessState);
    }, [selectedCompany]);

    // --- EFFECT: Listen for native fullscreen changes ---
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const setVideoPlayerRef = useCallback((node, index) => {
        if (node) videoRefs.current.set(index, node);
        else videoRefs.current.delete(index);
    }, []);

    const toggleFullscreen = useCallback((index) => {
        const playerInstance = videoRefs.current.get(index);
        if (playerInstance?.wrapper) {
            if (!document.fullscreenElement) {
                playerInstance.wrapper.requestFullscreen().catch(console.error);
            } else {
                document.exitFullscreen();
            }
        }
    }, []);

    const handleNavigation = useCallback((direction) => {
        if (!selectedCompany?.videos?.length) return;

        const prevVideoPlayer = videoRefs.current.get(currentRef.current);
        if (prevVideoPlayer) {
            try {
                prevVideoPlayer.seekTo(0);
                setMutedStates(prev => ({ ...prev, [currentRef.current]: true }));
            } catch (error) {
                console.warn("Error handling navigation:", error);
            }
        }

        let newCurrent = currentRef.current;
        if (direction === 'next' && currentRef.current < selectedCompany.videos.length - 1) {
            newCurrent = currentRef.current + 1;
        } else if (direction === 'prev' && currentRef.current > 0) {
            newCurrent = currentRef.current - 1;
        } else return;

        setCurrent(newCurrent);
        setShowVolumeIcon(false);
        setShowFullscreenButton(false);
        setIsFullscreen(false);
    }, [selectedCompany]);

    // --- EFFECT: Manage video play/pause on `current` change ---
    useEffect(() => {
        videoRefs.current.forEach((player, index) => {
            if (player) {
                try {
                    if (index === current && isSectionVisible) {
                        // For mobile, we need to play with muted audio first
                        if (player.getInternalPlayer() && !isDesktop) {
                            player.getInternalPlayer().muted = true;
                        }
                        player.play().catch(console.warn);
                    } else {
                        player.pause();
                        player.seekTo(0);
                    }
                } catch (error) {
                    console.warn("Error controlling video:", error);
                }
            }
        });

        if (volumeIconTimeoutRef.current) {
            clearTimeout(volumeIconTimeoutRef.current);
            volumeIconTimeoutRef.current = null;
        }
        setShowVolumeIcon(false);
    }, [current, isSectionVisible, isDesktop]);

    const showControlsOnInteraction = useCallback(() => {
        setShowVolumeIcon(true);
        setShowFullscreenButton(true);
        
        if (volumeIconTimeoutRef.current) {
            clearTimeout(volumeIconTimeoutRef.current);
        }
        
        volumeIconTimeoutRef.current = setTimeout(() => {
            setShowVolumeIcon(false);
            setShowFullscreenButton(false);
        }, isDesktop ? 1000 : 3000);
    }, [isDesktop]);

    const toggleMute = useCallback((event) => {
        event?.stopPropagation();
        
        setMutedStates(prev => {
            const newMuted = !prev[currentRef.current];
            
            // Special handling for mobile browsers
            if (!isDesktop && videoRefs.current.get(currentRef.current)) {
                try {
                    const internalPlayer = videoRefs.current.get(currentRef.current).getInternalPlayer();
                    if (internalPlayer) {
                        internalPlayer.muted = newMuted;
                    }
                } catch (error) {
                    console.warn("Error toggling mute on mobile:", error);
                }
            }
            
            return { ...prev, [currentRef.current]: newMuted };
        });
        
        showControlsOnInteraction();
    }, [isDesktop, showControlsOnInteraction]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") handleNavigation('prev');
            if (e.key === "ArrowRight") handleNavigation('next');
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNavigation]);

    const handleVideoTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
        touchTimeRef.current = Date.now();
        showControlsOnInteraction();
    };

    const handleVideoTouchMove = (e) => {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartYRef.current);
        if (Math.abs(deltaX) > Math.abs(deltaY) || (deltaX < tapThreshold && deltaY < tapThreshold)) {
            e.preventDefault();
        }
    };

    const handleVideoTouchEnd = (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartYRef.current);
        const touchDuration = Date.now() - touchTimeRef.current;

        const tapTimeThreshold = 300;

        if (touchDuration < tapTimeThreshold && Math.abs(deltaX) < tapThreshold && deltaY < tapThreshold) {
            if (e.target.closest('.volume-controls') || e.target.closest('.fullscreen-button')) return;
            toggleMute(e);
        } else if (Math.abs(deltaX) > swipeSensitivity && deltaY < Math.abs(deltaX) / 2) {
            deltaX > 0 ? handleNavigation('prev') : handleNavigation('next');
        }
        
        touchStartXRef.current = 0;
        touchStartYRef.current = 0;
        touchTimeRef.current = 0;
    };

    const currentVideoData = selectedCompany?.videos?.[current];

    return (
        <div className="relative bg-black text-white w-full flex flex-col items-center py-12 sm:py-16 px-4 overflow-hidden min-h-screen">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-purple-400 font-Mightail text-center">
                My Works
            </h1>

            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 sm:gap-8 mt-4">
                {/* Client Selection Section */}
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
                                <p className="relative z-10 text-sm sm:text-base font-semibold text-white text-center font-LinearSans">
                                    {company.name}
                                </p>
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

                {/* Video Display Section (Carousel) */}
                <div
                    id="other-work"
                    ref={videoSectionRef}
                    className="w-full lg:w-1/3 p-4 sm:p-6 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
                >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-300 mb-4 font-Mightail text-center flex items-center justify-center">
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

                    {selectedCompany.videos?.length > 0 ? (
                        <>
                            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handleNavigation('prev')}
                                    disabled={current === 0}
                                    className={`absolute left-2 sm:left-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                                        ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
                                    aria-label="Previous video"
                                >
                                    <FaChevronLeft size={24} />
                                </button>

                                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                    {selectedCompany.videos.map((video, index) => {
                                        const positionRelativeToCurrent = index - current;
                                        let currentTranslateX, scale, opacity, zIndex;
                                        const baseTranslateUnit = 45;

                                        if (positionRelativeToCurrent === 0) {
                                            currentTranslateX = '0vw';
                                            scale = 1;
                                            opacity = 1;
                                            zIndex = 100;
                                        } else {
                                            currentTranslateX = `${positionRelativeToCurrent * baseTranslateUnit}vw`;
                                            scale = Math.max(1 - Math.abs(positionRelativeToCurrent) * 0.15, 0.4);
                                            opacity = Math.max(1 - Math.abs(positionRelativeToCurrent) * 0.3, 0.1);
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
                                                    ${isMiddle ? 'cursor-pointer' : 'cursor-default'}
                                                `}
                                                animate={{ x: currentTranslateX, scale, opacity, zIndex }}
                                                transition={{
                                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                                    scale: { duration: 0.3 },
                                                    opacity: { duration: 0.2 },
                                                }}
                                                onMouseEnter={isMiddle && isDesktop ? () => setShowFullscreenButton(true) : undefined}
                                                onMouseLeave={isMiddle && isDesktop ? () => setShowFullscreenButton(false) : undefined}
                                                onClick={isMiddle && isDesktop ? (e) => {
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
                                                        playing={isMiddle && isSectionVisible}
                                                        loop
                                                        volume={mutedStates[index] ? 0 : 1}
                                                        controls={false}
                                                        width="100%"
                                                        height="100%"
                                                        light={!isMiddle}
                                                        playIcon={
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                                                                <FaChevronRight size={40} className="text-white" />
                                                            </div>
                                                        }
                                                        onReady={() => {
                                                            setVideoReadiness(prev => ({ ...prev, [index]: true }));
                                                            // Mobile workaround: Start muted to prevent auto-play issues
                                                            if (!isDesktop) {
                                                                try {
                                                                    const internalPlayer = videoRefs.current.get(index)?.getInternalPlayer();
                                                                    if (internalPlayer) {
                                                                        internalPlayer.muted = true;
                                                                    }
                                                                } catch (error) {
                                                                    console.warn("Mobile mute workaround failed:", error);
                                                                }
                                                            }
                                                        }}
                                                        playsinline
                                                        style={isMiddle ? { pointerEvents: 'none' } : {}}
                                                        config={{
                                                            vimeo: { playerOptions: { dnt: true, byline: false, portrait: false, title: false }},
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

                                                {/* VOLUME Controls */}
                                                <AnimatePresence>
                                                    {isMiddle && showVolumeIcon && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 20 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="volume-controls absolute z-20 bg-black/60 text-white rounded-full flex items-center justify-center p-2 sm:p-3 bottom-3 left-1/2 -translate-x-1/2"
                                                            onClick={toggleMute}
                                                        >
                                                            <button
                                                                className="text-white flex items-center justify-center p-1"
                                                                aria-label={mutedStates[current] ? "Unmute video" : "Mute video"}
                                                            >
                                                                {mutedStates[current] ? 
                                                                    <FaVolumeMute size={20} /> : 
                                                                    <FaVolumeUp size={20} />
                                                                }
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

     {/* FULLSCREEN Button */}
<AnimatePresence>
    {isMiddle && (showFullscreenButton || isFullscreen) && (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleFullscreen(index)}
            onTouchStart={(e) => {
                e.stopPropagation(); // Prevent touch from bubbling to parent
                toggleFullscreen(index); // Trigger fullscreen immediately on touch start
            }}
            className={`
                fullscreen-button absolute z-30 bg-black/60 text-white rounded-full
                flex items-center justify-center
                ${isDesktop 
                    ? 'p-2 sm:p-3 bottom-30 right-30' 
                    : 'p-3 bottom-30 right-5 w-12 h-12'
                }
                shadow-lg hover:bg-purple-700
            `}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
            {isFullscreen ? (
                <Minimize size={isDesktop ? 20 : 24} />
            ) : (
                <Maximize size={isDesktop ? 20 : 24} />
            )}
        </motion.button>
    )}
</AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handleNavigation('next')}
                                    disabled={current === selectedCompany.videos.length - 1}
                                    className={`absolute right-2 sm:right-4 z-[110] bg-white/10 p-3 sm:p-4 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                                        ${current === selectedCompany.videos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
                                    aria-label="Next video"
                                >
                                    <FaChevronRight size={24} />
                                </button>
                            </div>

                            {/* Video Title and Description */}
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

                            {/* Navigation Dots */}
                            {selectedCompany.videos.length > 1 && (
                                <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
                                    {selectedCompany.videos.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setCurrent(index);
                                                setShowVolumeIcon(false);
                                                setShowFullscreenButton(false);
                                            }}
                                            className={`
                                                p-1.5 sm:p-2 rounded-full cursor-pointer transition-all duration-300
                                                ${index === current ? 'bg-purple-600 w-3 h-3 sm:w-4 sm:h-4' : 'bg-gray-700 w-2.5 h-2.5 sm:w-3 h-3'}
                                                hover:scale-125
                                            `}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-400 text-base sm:text-lg text-center font-LinearSans mt-8">
                            No videos available for {selectedCompany.name} yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Otherwork;