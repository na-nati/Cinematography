import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuOverlay from "./Menuoverlay"; // Path to your menu overlay for the landing page
import { FaBars, FaTimes } from "react-icons/fa"; // IMPORTANT: Import these icons for the landing page's menu button

const Landing = ({ onComplete = () => {}, targetRef }) => {
  const [animPhase, setAnimPhase] = useState("idle"); // 'idle', 'initialPosition', 'grow', 'cover', 'shrink-to-button'
  const enterButtonRef = useRef(null); // Ref for the "Enter" button
  const [enterButtonRect, setEnterButtonRect] = useState(null); // Bounding client rect of the enter button
  const [shrinkTargetProps, setShrinkTargetProps] = useState({}); // Properties for the shrinking animation target
  const [menuOpen, setMenuOpen] = useState(false); // State for the landing page's mobile menu overlay
  const [internalPendingNav, setInternalPendingNav] = useState(null); // Stores the target section ID
  const [exitMode, setExitMode] = useState('animation'); // 'animation' (for enter button) or 'instant' (for menu navigation)

  // UseLayoutEffect to get initial button position for animations
  useLayoutEffect(() => {
    if (enterButtonRef.current) {
      setEnterButtonRect(enterButtonRef.current.getBoundingClientRect());
    }
  }, []);

  // Handler for the main "Enter" button click
  const handleEnterClick = () => {
    setInternalPendingNav('home'); // Default section after entering
    setExitMode('animation'); // Use full animation for this exit
    setAnimPhase("grow"); // Start the circle grow animation
  };

  // Handler for navigation from the menu overlay (on the landing page)
  const handleMenuNavigation = (id) => {
    setInternalPendingNav(id);
    setMenuOpen(false); // Close the menu overlay
    setExitMode('instant'); // For menu navigation, we want a quicker exit
    onComplete(id, 'instant'); // Immediately signal App.jsx to hide landing and navigate
    setAnimPhase("shrink-to-button"); // Trigger a visual shrink for the landing page elements
  };

  // Effect to manage animation phases
  useEffect(() => {
    let growTimeout;
    let coverTimeout;

    if (animPhase === "grow") {
      growTimeout = setTimeout(() => setAnimPhase("cover"), 1000);
      return () => clearTimeout(growTimeout);
    } else if (animPhase === "cover") {
      coverTimeout = setTimeout(() => {
        // Only call onComplete with 'animation' mode here if it was triggered by 'grow' (the Enter button)
        // Menu navigation already calls onComplete directly with 'instant' mode.
        if (exitMode === 'animation') {
          onComplete(internalPendingNav, 'animation');
        }
        setAnimPhase("shrink-to-button"); // Move to the shrink phase
      }, 800);
      return () => clearTimeout(coverTimeout);
    }
  }, [animPhase, onComplete, internalPendingNav, exitMode]);

  // UseLayoutEffect to calculate target properties for the shrink animation
  useLayoutEffect(() => {
    if (animPhase === "shrink-to-button" && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      setShrinkTargetProps({
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2,
        width: targetRect.width,
        height: targetRect.height,
        borderRadius: "50%",
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      });
    }
  }, [animPhase, targetRef]);

  // Variants for the expanding/shrinking circle animation
  const circleVariants = {
    idle: { opacity: 0, x: 0, y: 0, width: 0, height: 0, borderRadius: "50%", transition: { duration: 0 } },
    initialPosition: {
      opacity: 1,
      x: enterButtonRect ? enterButtonRect.left + enterButtonRect.width / 2 : 0,
      y: enterButtonRect ? enterButtonRect.top + enterButtonRect.height / 2 : 0,
      width: enterButtonRect ? enterButtonRect.width : 0,
      height: enterButtonRect ? enterButtonRect.height : 0,
      borderRadius: "50%",
      transition: { duration: 0.1, ease: "easeOut" },
    },
    grow: {
      opacity: 1,
      x: enterButtonRect ? enterButtonRect.left + enterButtonRect.width / 2 : 0,
      y: enterButtonRect ? enterButtonRect.top + enterButtonRect.height / 2 : 0,
      scale: Math.max(window.innerWidth, window.innerHeight) / (enterButtonRect?.width || 64) * 2,
      borderRadius: "50%",
      transition: { duration: 1, ease: "easeOut" },
    },
    cover: {
      opacity: 1, x: window.innerWidth / 2, y: window.innerHeight / 2, width: "200vmax", height: "200vmax", borderRadius: "50%", scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const isLandingContentVisible = animPhase === "idle" || animPhase === "grow";

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6 transition-opacity duration-500 ${
        (animPhase === "shrink-to-button" || exitMode === 'instant') ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Menu button for Landing page (FaBars/FaTimes) */}
      <button
        className="absolute top-10 left-1/4 transform -translate-x-1/2 z-30 flex flex-col justify-center items-center w-12 h-12 text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes className="text-purple-400" /> : <FaBars />}
      </button>

      {/* MenuOverlay is controlled by Landing's state */}
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} onNavigate={handleMenuNavigation} />}

      {/* Logo */}
      <div className="absolute top-10 left-10 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLandingContentVisible ? 1 : 0, y: isLandingContentVisible ? 0 : -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" font-bold text-4xl text-purple-400 font-Mightail"
        >
          Bernabas Tegegn
        </motion.div>
      </div>

      {/* Email Button */}
      <div className="absolute top-10 right-10 z-20">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLandingContentVisible ? 1 : 0, y: isLandingContentVisible ? 0 : -20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800 transition-colors"
          onClick={() => (window.location.href = "mailto:your.email@example.com")}
          disabled={animPhase !== "idle" || menuOpen} // Disable button during animation or when menu is open
        >
          Email me!
        </motion.button>
      </div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLandingContentVisible ? 1 : 0, scale: isLandingContentVisible ? 1 : 0.9 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-3xl md:text-4xl max-w-xl text-center font-semibold z-10"
      >
        Take a look at <br />
        <span className="text-purple-400">Bernabas' portfolio of works</span>
      </motion.h1>

      {/* Enter Button (trigger for main animation) */}
      <button
        aria-label="Enter portfolio"
        ref={enterButtonRef}
        onClick={handleEnterClick}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg text-white flex items-center justify-center text-xl font-bold z-30"
        style={{ pointerEvents: animPhase !== "idle" || menuOpen ? "none" : "auto" }} // Disable button during animation or when menu is open
      >
        →
      </button>

      {/* Animated Circle - Only render if not in instant mode or if in an animation phase */}
      <AnimatePresence>
        {(exitMode === 'animation' && (animPhase === "grow" || animPhase === "cover" || animPhase === "shrink-to-button")) &&
          enterButtonRect && (
            <motion.div
              initial="initialPosition"
              animate={animPhase === "grow" ? "grow" : animPhase === "cover" ? "cover" : shrinkTargetProps}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              variants={circleVariants}
              className="fixed bg-purple-600 rounded-full"
              style={{ top: 0, left: 0, transformOrigin: "center", zIndex: 40 }}
            />
          )}
      </AnimatePresence>

      {/* Location Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLandingContentVisible ? 1 : 0, y: isLandingContentVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-5 right-10 text-gray-400 text-sm z-20 text-right"
      >
        Based in <br /> Addis Ababa, Ethiopia.
      </motion.p>
    </div>
  );
};

export default Landing;