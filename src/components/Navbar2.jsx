import React from 'react';
// MenuOverlay is no longer rendered directly by Navbar2; it's handled by Landing/App.jsx

const Navbar2 = ({ onNavigate, menuOpen, setMenuOpen }) => {
  return (
    <>
      <button
        className="absolute top-10 left-1/4 transform -translate-x-1/2 z-30 flex flex-col justify-center items-center w-12 h-12"
        onClick={() => setMenuOpen(!menuOpen)} // Use the passed setter
      >
        <span className={`w-10 h-1 bg-white rounded transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`w-10 h-1 bg-white rounded mt-1 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>
      {/* MenuOverlay is rendered by the parent component (Landing or App) */}
    </>
  );
};

export default Navbar2;