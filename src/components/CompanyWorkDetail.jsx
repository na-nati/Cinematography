// src/components/CompanyWorkDetail.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { scroller } from "react-scroll";

// Import the centralized companies data
import { companies } from '../data/companiesData'; // Adjust path as needed

const CompanyWorkDetail = () => {
  const navigate = useNavigate();
  const { companyId } = useParams(); // Get the company ID from the URL

  // Find the specific company based on the URL parameter
  const currentCompany = companies.find(c => c.id === companyId);

  // Scroll to the top of the page when the component mounts or companyId changes
  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page starts at the top
    // Also reset volume states when navigating to a new company's page
    if (currentCompany && currentCompany.videos) {
        setMutedStates(Array(currentCompany.videos.length).fill(true));
        setCurrent(0); // Reset carousel to the first video
    }
  }, [companyId, currentCompany]); // Dependency array: re-run effect if companyId or currentCompany changes


  // If company not found, render a fallback message
  if (!currentCompany) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl text-red-500 mb-4 font-Mightail">Company or content not found!</h1>
        <p className="text-gray-400 mb-6 font-LinearSans">The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/otherwork')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
        >
          ← Back to Clients
        </button>
      </div>
    );
  }

  // Use the videos array of the found company
  const companyVideos = currentCompany.videos;

  // State for the video carousel
  const [current, setCurrent] = useState(0);
  const [mutedStates, setMutedStates] = useState(
    Array(companyVideos.length).fill(true)
  );
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);


  // Carousel Navigation Logic (Non-Circular)
  const next = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, companyVideos.length - 1)); // Use companyVideos.length
    setShowVolumeIcon(false);
  }, [companyVideos.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => Math.max(prev - 1, 0)); // Use companyVideos.length
    setShowVolumeIcon(false);
  }, [companyVideos.length]); // Added companyVideos.length to dependencies

  // Toggle mute state for the current video
  const toggleMute = (index) => {
    setMutedStates((prev) => {
      const newMutedStates = prev.map((muted, i) => (i === index ? !muted : muted));
      return newMutedStates;
    });
    setShowVolumeIcon(true);
    setTimeout(() => {
      setShowVolumeIcon(false);
    }, 1000); // Icon visible for 1 second
  };

  // Keyboard Navigation for carousel
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
  }, [prev, next]);

  // Touch/Swipe Logic for Mobile on the video carousel
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
      next();
    } else if (distance < -sensitivity) {
      prev();
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Function to handle navigation to sections on the home page with smooth scrolling
  // This is used for the footer links, navigating back to home and then scrolling
  const handleScrollToSection = (sectionId) => {
    navigate('/'); // First navigate to the home page
    setTimeout(() => {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });
    }, 100); // Small delay to allow navigation to complete
  };

  return (
    <div className="relative bg-black text-white w-full min-h-screen flex flex-col items-center py-16 px-4 overflow-hidden">
      {/* Back to Clients Button */}
      <button
        onClick={() => navigate('/otherwork')}
        className="absolute top-6 left-6 z-40 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
      >
        ← Back to Clients
      </button>

      {/* Main heading for the specific company's work section */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-purple-400 font-Mightail text-center">
        Works for {currentCompany.name}
      </h1>
      <p className="text-gray-300 text-lg text-center max-w-3xl mb-12 font-LinearSans">
        {currentCompany.description}
      </p>

      {/* Conditional rendering for Video Carousel Section */}
      {companyVideos && companyVideos.length > 0 ? (
        <div
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Video Button */}
          <button
            onClick={prev}
            disabled={current === 0}
            className={`absolute left-4 sm:left-8 z-30 bg-white/10 p-4 sm:p-5 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
              ${current === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`
            }
            aria-label="Previous video"
          >
            <FaChevronLeft size={30} />
          </button>

          {/* Inner carousel track */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {companyVideos.map((video, index) => { // Map over currentCompany.videos
              let positionRelativeToCurrent = index - current;
              let currentTranslateX = '0px';

              // Dynamic translation for responsive carousel layout
              // Corrected syntax and structure here
              if (positionRelativeToCurrent === -1) { // Left video slot
                  if (window.innerWidth >= 1024) {
                      currentTranslateX = '-450px';
                  } else if (window.innerWidth >= 768) {
                      currentTranslateX = '-45vw';
                  } else if (window.innerWidth >= 640) {
                      currentTranslateX = '-40vw';
                  } else {
                      currentTranslateX = '-35vw';
                  }
              } else if (positionRelativeToCurrent === 0) { // Middle video slot
                  currentTranslateX = '0px';
              } else if (positionRelativeToCurrent === 1) { // Right video slot
                  if (window.innerWidth >= 1024) {
                      currentTranslateX = '450px';
                  } else if (window.innerWidth >= 768) {
                      currentTranslateX = '45vw';
                  } else if (window.innerWidth >= 640) {
                      currentTranslateX = '40vw';
                  } else {
                      currentTranslateX = '35vw';
                  }
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
                      },
                      youtube: {
                        playerVars: { disablekb: 1, showinfo: 0, rel: 0 }
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

          {/* Next Video Button */}
          <button
            onClick={next}
            disabled={current === companyVideos.length - 1}
            className={`absolute right-4 sm:right-8 z-30 bg-white/10 p-4 sm:p-5 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
              ${current === companyVideos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`
            }
            aria-label="Next video"
          >
            <FaChevronRight size={30} />
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-xl text-center font-LinearSans mt-8">No videos available for {currentCompany.name} yet.</p>
      )}

      {/* Display current video title and description below the carousel */}
      {companyVideos && companyVideos.length > 0 && (
        <motion.div
          key={current + "_description"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 px-4 max-w-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 font-Mightail">
            {companyVideos[current].title}
          </h3>
          <p className="text-base sm:text-lg text-gray-300 font-LinearSans">
            {companyVideos[current].description}
          </p>
        </motion.div>
      )}

      {/* Dots Navigation for the carousel */}
      {companyVideos && companyVideos.length > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {companyVideos.map((_, index) => (
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
      )}

      {/* Footer Section - This is included here so it's part of every company page */}
      <footer className="w-full bg-gray-900 text-gray-400 text-center py-6 min-h-[25vh] flex flex-col justify-around items-center font-LinearSans mt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between w-full">
          <div className="text-center md:text-left mb-4 md:mb-0 w-full md:w-1/3 flex flex-col justify-center items-center md:items-start">
            <h4 className="font-bold text-lg mb-2 text-purple-300">My Vision</h4>
            <p className="text-sm">
              As a dedicated cinematographer, I blend technical precision with artistic vision to tell compelling stories. My services span from commercial ads to impactful documentaries, focusing on visual excellence and emotional resonance.
            </p>
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-1/3">
            <nav className="mb-4 md:mb-2">
              <ul className="flex flex-col items-center gap-2 text-lg">
                <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                {/* These buttons trigger scrolling to sections on the Home page */}
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

          <div className="flex justify-center w-full md:w-1/3 md:justify-end md:self-start">
            <button
              onClick={() => handleScrollToSection('contact')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg mt-4"
            >
              Contact Me
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cinematographer Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CompanyWorkDetail;
