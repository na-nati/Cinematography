// src/Components/Hero.jsx

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, Youtube } from "lucide-react";
import heroBg from '../assets/hero-bg.png';
import Navbar from './Navbar'; // This Navbar import within Hero might be redundant if you're rendering Navbar in App.jsx

const Hero = ({ buttonRef, onNavigate }) => {  // <-- onNavigate prop is correctly received

  const containerRef = useRef(null);
  const [heroAnimPhase, setHeroAnimPhase] = useState('initialCover');
  const [buttonRect, setButtonRect] = useState(null);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [buttonRef]);

  useEffect(() => {
    if (heroAnimPhase === 'initialCover' && buttonRect) {
      const shrinkTimeout = setTimeout(() => {
        setHeroAnimPhase('shrinkToButton');
      }, 200);
      return () => clearTimeout(shrinkTimeout);
    }
  }, [heroAnimPhase, buttonRect]);

  const purpleOverlayVariants = {
    initialCover: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: "200vmax",
      height: "200vmax",
      borderRadius: "0%",
      opacity: 1,
      scale: 1,
      transition: { duration: 0 }
    },
    shrinkToButton: {
      x: buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2,
      y: buttonRect ? buttonRect.top + buttonRect.height / 2 : window.innerHeight / 2,
      width: buttonRect ? buttonRect.width : 0,
      height: buttonRect ? buttonRect.height : 0,
      borderRadius: "50%",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
      transitionEnd: {
        opacity: 0,
        display: 'none'
      }
    },
  };

  const handleShrinkComplete = (definition) => {
    if (definition === 'shrinkToButton') {
      setHeroAnimPhase('contentVisible');
    }
  };

  const isHeroContentVisible = heroAnimPhase === 'contentVisible';

  // This is the handler for the "Let's See" button
  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("[Hero.jsx] 'Let's See' button clicked. Attempting to navigate to 'works'.");
    if (onNavigate) {
      onNavigate("works"); // <-- This will call handleScrollToSection in App.jsx
    } else {
      // fallback native scroll (less preferred if react-scroll is used)
      const el = document.getElementById("works");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home"
      ref={containerRef}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center px-6 mt-15 relative overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <AnimatePresence>
        {heroAnimPhase !== 'contentVisible' && buttonRect && (
          <motion.div
            key="hero-purple-overlay"
            initial="initialCover"
            animate="shrinkToButton"
            exit={{ opacity: 0 }}
            variants={purpleOverlayVariants}
            onAnimationComplete={handleShrinkComplete}
            className="fixed inset-0 bg-purple-600 z-40"
            style={{ transformOrigin: 'center' }}
          />
        )}
      </AnimatePresence>

      {/* IMPORTANT: Remove this Navbar render. Your App.jsx renders Navbar conditionally.
          Rendering it here too would cause duplicates or conflicts.
          <Navbar />
      */}

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isHeroContentVisible ? 1 : 0, x: isHeroContentVisible ? 0 : 100 }}
        transition={{ duration: 1, delay: isHeroContentVisible ? 0.5 : 0 }}
        className="text-left max-w-xl space-y-4 text-white ml-16 relative z-10"
      >
        <h1
          className="text-4xl md:text-5xl font-bold font-Mightail"
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.7)' }}
        >
          Hi I'm
          <div className="text-purple-400 font-Mightail">
            Bernabas
          </div>
          <div className="text-purple-400 font-Mightail">
            Tegegn
          </div>
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 font-LinearSans mt-2"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Cinematographer & Visual Storyteller
        </motion.p>

        <p
          className="text-gray-400 pt-2 font-LinearSans text-lg md:text-xl"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
        >
          Creating immersive visual experiences through film, lighting, and narrative motion. Let's bring your story to life.
        </p>

        <div className="flex gap-4 justify-start mt-8 text-gray-400">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube size={24} />
          </a>
        </div>
      </motion.div>

      {/* The "Let's See" button */}
      <motion.button
        ref={buttonRef}
        onClick={handleButtonClick} // This now correctly calls the onNavigate prop
        className="fixed right-8 top-1/2 transform -translate-y-1/2 w-24 h-24 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg text-white flex flex-col items-center justify-center text-center text-sm font-bold z-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHeroContentVisible ? 1 : 0, scale: isHeroContentVisible ? 1 : 0.5 }}
        transition={{ delay: isHeroContentVisible ? 0.7 : 0, duration: 0.5, ease: "easeOut" }}
      >
        Let's <br /> See
      </motion.button>
    </div>
  );
};

export default Hero;