// src/Components/MenuOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';

const MenuOverlay = ({ onClose, onNavigate, onReturnToLanding }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const overlayRef = useRef();

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Works', id: 'works' },
    { label: 'Service', id: 'service' },
    { label: 'Skill', id: 'skill' },
    { label: 'About me', id: 'about' },
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
        x: rect.width / 2,
        y: rect.height / 2,
      });
    }
  }, []);

  const handleNavLinkClick = (id) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMouseMove}
      className="fixed top-0 left-0 w-full h-125 bg-black bg-opacity-95 z-40 p-4 sm:p-6 flex flex-col cursor-none"
    >
      {/* Close button */}
      <button
        className="absolute top-6 left-6 text-white text-2xl sm:text-3xl"
        onClick={onClose}
        aria-label="Close menu"
      >
        ✕
      </button>

      {/* Custom cursor (visible only on desktop) */}
      <div
        className="pointer-events-none fixed z-50 hidden sm:block"
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: '2px solid white',
          transform: `translate(${cursorPos.x - 75}px, ${cursorPos.y - 75}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'white',
          }}
        />
      </div>

      {/* Navigation menu */}
      <nav className="flex flex-col items-center sm:items-start justify-center flex-1 space-y-6 text-white text-3xl sm:text-4xl font-Mightail z-10 mt-20 sm:mt-28 sm:ml-24">
        {navItems.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => handleNavLinkClick(id)}
            onMouseEnter={() => setHoveredLink(id)}
            onMouseLeave={() => setHoveredLink(null)}
            className={`
              transition-colors duration-300
              ${hoveredLink && hoveredLink !== id ? 'text-purple-400' : 'text-white'}
              text-center sm:text-left bg-transparent border-none cursor-pointer
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
