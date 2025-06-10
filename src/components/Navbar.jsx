// src/Components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, Events, scroller } from "react-scroll"; // For smooth scrolling to sections
import { FaBars, FaTimes, FaHome } from "react-icons/fa"; // IMPORTANT: Ensure FaHome is imported here

const Navbar = ({ onReturnToLanding }) => { // Receives onReturnToLanding from App.jsx
  const [active, setActive] = useState("home"); // State to highlight active navigation link
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu visibility

  // Register scroll events for react-scroll
  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // Handler for when a Link becomes active (e.g., when scrolling past a section)
  const handleSetActive = (to) => {
    setActive(to);
  };

  // Define your navigation sections
  // Ensure 'service' is included if you added a Service component
  const sections = ["home", "works", "service", "skill", "about me", "contact"]; // Reordered for common flow

  return (
    <nav className="bg-[#1B1E30] fixed top-0 left-0 w-full z-50 shadow-xl py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Home Icon for Landing Page Navigation */}
          <div className="flex-shrink-0">
            <button
              onClick={onReturnToLanding} // This correctly calls the function passed from App.jsx
              className="text-white text-2xl hover:text-purple-400 transition-colors duration-300"
              aria-label="Go to landing page"
            >
              <FaHome />
            </button>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex space-x-10 ml-8 gap-x-8 font-Mightail">
            {sections.map((item) => (
              <Link
                key={item}
                to={item} // Target section ID
                spy={true} // Activate spy scrolling
                smooth={true} // Smooth scroll animation
                duration={800} // Scroll duration
                offset={-50} // Offset for fixed header
                onSetActive={handleSetActive} // Callback when link becomes active
                className={`cursor-pointer italic transition-all duration-300 relative py-2 ${
                  active === item
                    ? "text-purple-400" // Active link color
                    : "text-gray-300 hover:text-purple-300" // Inactive link color
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)} {/* Capitalize first letter */}
                {active === item && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full"></span> // Underline for active link
                )}
              </Link>
            ))}
          </div>

          {/* "Connect with me" button for Desktop */}
          <div className="hidden md:block ml-auto font-Mightail">
            <Link
              to="contact"
              smooth={true}
              duration={800}
              offset={-50}
              onSetActive={handleSetActive}
              className="cursor-pointer px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Connect with me
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger/Close icon) */}
          <button
            className="md:hidden text-white text-2xl z-50 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes className="text-purple-400" /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-gray-800 transform font-Mightail ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col items-center pt-32 z-40 shadow-2xl`}
      >
        {/* Home Link in Mobile Menu (to return to landing page) */}
        <button
            onClick={() => {
                onReturnToLanding(); // Call the function to return to landing
                setMenuOpen(false); // Close the mobile menu after clicking
            }}
            className="text-xl py-5 w-full text-center transition-all duration-300 text-gray-300 hover:text-purple-300"
        >
            Home (Landing)
        </button>

        {/* Mobile Menu Navigation Links */}
        {sections.map((item) => (
          <Link
            key={item}
            to={item}
            smooth={true}
            duration={800}
            offset={-50}
            spy={true}
            onSetActive={handleSetActive}
            className={`text-xl py-5 w-full text-center transition-all duration-300 ${
              active === item
                ? "text-purple-400 font-bold"
                : "text-gray-300 hover:text-purple-300"
            }`}
            onClick={() => setMenuOpen(false)} // Close menu on link click
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}

        {/* "Connect with me" button for Mobile */}
        <Link
          to="contact"
          smooth={true}
          duration={800}
          offset={-50}
          onSetActive={handleSetActive}
          className="mt-8 px-8 py-3 rounded-full font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
          onClick={() => setMenuOpen(false)} // Close menu on button click
        >
          Connect with me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;