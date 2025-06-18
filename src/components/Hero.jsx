import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion } from "framer-motion";
import { Linkedin, Instagram, MessageSquareText } from "lucide-react";
import heroBgDesktop from '../assets/12435.png';
import heroBgMobile from '../assets/2.jpg';


const Hero = ({ buttonRef }) => {
  const containerRef = useRef(null);
  const [isHeroContentVisible, setIsHeroContentVisible] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  // If useNavigate is only used for this button, remove this line too:
  // const navigate = useNavigate();

  useLayoutEffect(() => {
    if (buttonRef?.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [buttonRef?.current]);

  useEffect(() => {
    const contentAppearTimeout = setTimeout(() => {
      setIsHeroContentVisible(true);
    }, 100);
    return () => clearTimeout(contentAppearTimeout);
  }, []);

  // --- MODIFIED handleButtonClick for scrolling ---
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default link/button behavior

    const otherWorkSection = document.getElementById('other-work');
    if (otherWorkSection) {
      // Adjust offset if you have a fixed header/navbar
      const offset = 80; // Example offset for a fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = otherWorkSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      console.log("[Hero.jsx] 'View Projects' button clicked. Scrolling to 'other-work' section.");
    } else {
      console.warn("[Hero.jsx] 'other-work' section not found for scrolling.");
      // Fallback: If section isn't found, you might want to navigate as a last resort
      // navigate('/other-work'); // Uncomment if you want this as a fallback
    }
  };

  return (
    <div
      id="home"
      ref={containerRef}
      className="min-h-screen bg-cover bg-center mt-22 bg-black flex items-center px-6 relative overflow-hidden pt-24 md:pt-0"
      style={{ backgroundImage: `url(${heroBgMobile})` }}
    >
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBgDesktop})` }}
      ></div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isHeroContentVisible ? 1 : 0, x: isHeroContentVisible ? 0 : 100 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-xl mx-auto md:ml-0 space-y-4 text-white pl-0 pr-0 md:px-6 relative z-10 text-left"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-6xl font-bold font-Mightail leading-tight mt-25"
          style={{ textShadow: '4px 4px 10px rgba(0,0,0,0.9)' }}
        >
          Hi I'm
          <div className="text-purple-400 font-Mightail text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2 leading-none">
            BERNABAS
          </div>
          <div className="text-purple-400 font-Mightail text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-1 leading-none">
            TEGEGN
          </div>
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 font-LinearSans pt-2"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Cinematographer & Visual Storyteller
        </motion.p>

        <p
          className="text-gray-400 font-LinearSans text-lg md:text-xl pt-2"
          style={{ textShadow: '3px 3px 5px rgba(0,0,0,0.7)' }}
        >
          Creating immersive visual experiences through film, lighting, and narrative motion. Let's bring your story to life.
        </p>

        <div className="flex gap-4 mt-8 text-gray-400">
         
          <a href="https://www.instagram.com/berni_tegegn?igsh=dDkyZTBmMnI3azZj" target="_blank" rel="noopener noreferrer"
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110">
            <Instagram size={28} />
          </a>
          <a href="https://t.me/@Akilesss" target="_blank" rel="noopener noreferrer"
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110">
            <MessageSquareText size={28} />
          </a>
          <a href="mailto:bernabastegegn14@gmail.com" target="_blank" rel="noopener noreferrer"
             className="transition-colors duration-300 hover:text-purple-400 transform hover:scale-110 flex items-center justify-center">
            <i className="fa-solid fa-envelope text-2xl"></i>
          </a>
        </div>

        <motion.p
          className="text-lg md:text-xl text-gray-200 font-LinearSans pt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHeroContentVisible ? 1 : 0, y: isHeroContentVisible ? 0 : 30 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
        >
        </motion.p>

        <motion.button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="px-8 py-4 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 mt-2 mb-5 font-bold text-xl"
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