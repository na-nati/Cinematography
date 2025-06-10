// src/Components/MenuOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
// No need to import `scroller` here, as `onNavigate` prop handles it from App.jsx

const MenuOverlay = ({ onClose, onNavigate, onReturnToLanding }) => { // Received from Landing.jsx, which gets them from App.jsx
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const overlayRef = useRef();

  // These IDs MUST match the IDs in your App.jsx <section> elements
  const navItems = [
    { label: 'Home', id: 'home' }, // This ID is 'home' for the Hero section
    { label: 'Works', id: 'works' },
    { label: 'Service', id: 'service' }, // Ensure App.jsx has <section id="service">
    { label: 'Skill', id: 'skill' },
    { label: 'About me', id: 'about' }, // IMPORTANT: Changed ID from 'about me' to 'about' to match App.jsx
    { label: 'Contact', id: 'contact' },
  ];

  const handleMouseMove = (e) => {
    if (overlayRef.current) {
      const rect = overlayRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    if (overlayRef.current) {
      const rect = overlayRef.current.getBoundingClientRect();
      setCursorPos({
        x: rect.width / 2, // Centered initially
        y: rect.height / 2, // Centered initially
      });
    }
  }, []);

  const handleNavLinkClick = (id) => {
    if (id === 'home') {
     
      onNavigate(id); // This will call App.jsx's handleScrollToSection('home')
    } else {
      // For other sections, use onNavigate to scroll within the main portfolio
      onNavigate(id);
    }
    onClose(); // Always close the overlay after navigation
  };

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMouseMove}
      className="fixed top-0 left-0 w-full h-125 bg-black bg-opacity-95 z-40 p-6 flex flex-col cursor-none" // Changed h-120 to h-screen for full cover
    >
      {/* Close button for the overlay */}
      <button
        className="absolute top-10 left-10 text-white text-3xl"
        onClick={onClose}
        aria-label="Close menu"
      >
        ✕
      </button>

      {/* Custom cursor element */}
      <div
        className="pointer-events-none fixed z-50 w-30 h-30 rounded-full border border-white"
        style={{
          transform: `translate(${cursorPos.x - 75}px, ${cursorPos.y - 75}px)`,
        }}
      />

      {/* Navigation links within the overlay */}
      <nav className="text-white text-4xl flex flex-col mt-28 ml-100 space-y-6 font-Mightail z-10">
        {navItems.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => handleNavLinkClick(id)}
            onMouseEnter={() => setHoveredLink(id)}
            onMouseLeave={() => setHoveredLink(null)}
            className={`
              transition-colors duration-300
              ${hoveredLink && hoveredLink !== id ? 'text-purple-400' : 'text-white'}
              text-left bg-transparent border-none cursor-pointer
            `}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MenuOverlay;