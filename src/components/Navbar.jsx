import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";



const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    if (location.pathname === '/works') {
      setActive('works');
    } else if (location.pathname === '/') {
    
      setActive('home');
    }
    setMenuOpen(false); 
  }, [location.pathname]);


  const sections = [
    { name: "home", id: "home" },
    { name: "works", id: "other-work" }, 
    { name: "service", id: "service" },
    { name: "skill", id: "skill" },
    { name: "about me", id: "about" }, 
    { name: "contact", id: "contact" },
  ];

  const handleNavLinkClick = (targetId, displayName) => {
    setMenuOpen(false); 
    setActive(displayName); 

  
    if (location.pathname !== '/') {
      navigate('/');
      
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -50;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); 
    } else {
     
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -50; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-black fixed top-0 left-0 w-full z-50 shadow-xl py-3 border-b-2 border-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16"> {/* Added h-16 for consistent height */}
          <div className="flex-shrink-0 text-purple-400 text-2xl font-extrabold font-Mightail">
            Bernabas
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 ml-8 gap-x-8 font-Mightail items-center">
            {sections.map((section) => {
              const isActiveLink =
                (location.pathname === '/' && active === section.name) ||
                (location.pathname === '/works' && section.name === 'works');

              return (
                <a
                  key={section.id} // Use ID as key for consistency
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(section.id, section.name);
                  }}
                  className={`cursor-pointer italic transition-all duration-300 relative py-2 text-lg ${
                    isActiveLink
                      ? "text-purple-400 font-extrabold"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                  {isActiveLink && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-full"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden md:block ml-auto font-Mightail">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick('contact', 'contact'); // Pass both ID and display name
              }}
              className="cursor-pointer px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Connect with me
            </a>
          </div>

          {/* Mobile Menu Button (Hamburger/Close Icon) */}
          <button
            className="md:hidden text-white text-2xl z-50 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1" // Added focus styles
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-30 md:hidden"
          onClick={() => setMenuOpen(false)} // Close menu when clicking overlay
        ></div>
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-gray-800 transform font-Mightail ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col items-center pt-24 z-40 shadow-2xl`}
      >
        {sections.map((section) => {
          const isActiveLink =
            (location.pathname === '/' && active === section.name) ||
            (location.pathname === '/works' && section.name === 'works');

          return (
            <a
              key={section.id} // Use ID as key
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(section.id, section.name);
              }}
              className={`text-xl py-4 w-full text-center transition-all duration-300 ${
                isActiveLink
                  ? "text-purple-400 font-extrabold border-l-4 border-purple-500" // Added left border for active state
                  : "text-gray-300 hover:text-purple-300"
              }`}
            >
              {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
            </a>
          );
        })}

        {/* Mobile Connect Button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick('contact', 'contact');
          }}
          className="mt-8 px-8 py-4 rounded-full font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
        >
          Connect with me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;