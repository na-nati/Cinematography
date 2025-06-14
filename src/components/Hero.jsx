import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion } from "framer-motion";
import { Linkedin, Instagram, MessageSquareText } from "lucide-react"; // Import MessageSquareText
import heroBg from '../assets/hero-bg.png';
import { useNavigate } from 'react-router-dom';

const Hero = ({ buttonRef }) => {
  const containerRef = useRef(null);
  const [isHeroContentVisible, setIsHeroContentVisible] = useState(false);
  const [buttonRect, setButtonRect] = useState(null); // This state isn't currently used, but kept as it was in original code.
  const navigate = useNavigate();

  // useLayoutEffect is for synchronous DOM reads/writes before paint.
  // In this context, it ensures buttonRect is calculated before the browser paints.
  useLayoutEffect(() => {
    if (buttonRef?.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [buttonRef?.current]); // Dependency array ensures it re-runs if buttonRef changes.

  // useEffect for handling side effects like timeouts.
  // This sets a timeout to make the hero content visible after a slight delay.
  useEffect(() => {
    const contentAppearTimeout = setTimeout(() => {
      setIsHeroContentVisible(true);
    }, 100); // Small delay for initial animation
    return () => clearTimeout(contentAppearTimeout); // Cleanup timeout on unmount
  }, []); // Empty dependency array ensures this runs only once on component mount.

  // Handler for the "View Projects" button click.
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default link/button behavior (like page reload)
    console.log("[Hero.jsx] 'Works' button clicked. Navigating to '/works'.");
    navigate('/works'); // Navigate to the '/works' route
  };

  return (
    <div
      id="home" // ID for potential direct navigation/linking
      ref={containerRef} // Ref to the main container div
      className="min-h-screen bg-cover bg-center mt-22 bg-no-repeat flex items-center px-6 relative overflow-hidden pt-24 md:pt-0"
      style={{ backgroundImage: `url(${heroBg})` }} // Dynamic background image
    >
      {/* Main content container with Framer Motion animations */}
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Initial state for animation (off-screen right, invisible)
        animate={{ opacity: isHeroContentVisible ? 1 : 0, x: isHeroContentVisible ? 0 : 100 }} // Animate to visible/on-screen or back
        transition={{ duration: 1, delay: 0.5 }} // Animation duration and delay
        // Tailwind CSS classes for responsive layout and positioning:
        // max-w-xl: Max width for content.
        // mx-auto: Centers the div horizontally when there's enough space.
        // md:ml-16: Margin-left for medium screens and up to push content right.
        // pl-0 pr-0: **Important for mobile flush-left alignment.** No horizontal padding on small screens.
        // md:px-6: Restores padding for medium screens and up.
        // space-y-4: Vertical spacing between child elements.
        // text-white: White text color.
        // relative z-10: Positioning for stacking context.
        // text-left: Left-aligns text within this div.
        className="max-w-xl mx-auto md:ml-16 space-y-4 text-white pl-0 pr-0 md:px-6 relative z-10 text-left"
      >
        {/* Main heading with animated text shadows */}
        <h1
          className="text-2xl sm:text-3xl md:text-6xl font-bold font-Mightail leading-tight"
          style={{ textShadow: '4px 4px 10px rgba(0,0,0,0.9)' }}
        >
          Hi I'm
          <div className="text-purple-400 font-Mightail text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2 leading-none">
            Bernabas
          </div>
          <div className="text-purple-400 font-Mightail text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-1 leading-none">
            Tegegn
          </div>
        </h1>

        {/* Dynamic subtitle with pulsating opacity animation */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 font-LinearSans pt-2"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}
          animate={{ opacity: [0.7, 1, 0.7] }} // Opacity animation for pulsating effect
          transition={{ duration: 3, repeat: Infinity }} // Repeat indefinitely
        >
          Cinematographer & Visual Storyteller
        </motion.p>

        {/* Descriptive paragraph */}
        <p
          className="text-gray-400 font-LinearSans text-lg md:text-xl pt-2"
          style={{ textShadow: '3px 3px 5px rgba(0,0,0,0.7)' }}
        >
          Creating immersive visual experiences through film, lighting, and narrative motion. Let's bring your story to life.
        </p>

        {/* Social media icons */}
        <div className="flex gap-4 mt-8 text-gray-400">
          <a href="https://linkedin.com/in/yourlinkedinprofile" target="_blank" rel="noopener noreferrer"
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110">
            <Linkedin size={28} /> {/* LinkedIn icon */}
          </a>
          <a href="https://instagram.com/yourinstagramprofile" target="_blank" rel="noopener noreferrer"
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110">
            <Instagram size={28} /> {/* Instagram icon */}
          </a>
          {/* Telegram Icon */}
          <a href="https://t.me/yourtelegramusername" target="_blank" rel="noopener noreferrer" // **UPDATE THIS WITH YOUR TELEGRAM LINK**
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110">
            <MessageSquareText size={28} /> {/* Telegram icon from Lucide */}
          </a>
          <a href="mailto:bernabastegegn14@gmail.com" target="_blank" rel="noopener noreferrer" // **UPDATE THIS WITH YOUR EMAIL**
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110 flex items-center justify-center">
            <i className="fa-solid fa-envelope text-2xl"></i> {/* Email icon (Font Awesome) */}
          </a>
        </div>

        {/* Call to Action text with Framer Motion animation */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 font-LinearSans pt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHeroContentVisible ? 1 : 0, y: isHeroContentVisible ? 0 : 30 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
        >
          Ready to explore my creative vision?
        </motion.p>

        {/* "View Projects" button with Framer Motion animation */}
        <motion.button
          ref={buttonRef} // Ref passed from parent component (e.g., Navbar for scrolling)
          onClick={handleButtonClick} // Click handler for navigation
          className="px-8 py-4 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 mt-8 font-bold text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isHeroContentVisible ? 1 : 0, y: isHeroContentVisible ? 0 : 50 }}
          transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
        >
          View Projects
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;