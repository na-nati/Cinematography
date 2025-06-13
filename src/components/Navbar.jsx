import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Events, scroller } from "react-scroll"; 
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom"; 
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState("home"); 
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  
  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});


    if (location.pathname === '/works') {
      setActive('works');
    } else if (location.pathname === '/') {
   
      setActive('home'); 
    }

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, [location.pathname]); 
  const handleSetActive = (to) => {
    setActive(to);
  };

  const sections = ["home",  "service", "skill", "about me","works", "contact"];

  const handleNavLinkClick = (item) => {
    setMenuOpen(false); 
    if (item === "works") {
      navigate("/works"); 
    } else {
    
      if (location.pathname !== '/') {
        navigate('/');
     
        setTimeout(() => {
          scroller.scrollTo(item, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -50,
          });
        }, 100); 
      } else {
        
        scroller.scrollTo(item, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -50,
        });
      }
    }
  };

  return (
    <nav className="bg-black fixed top-0 left-0 w-full z-50 shadow-xl py-3 border-b-2 border-purple-600"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex-shrink-0 text-purple-400 text-2xl font-extrabold font-Mightail">
             Bernabas
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex space-x-10 ml-8 gap-x-8 font-Mightail">
            {sections.map((item) => (
              item === "works" ? (
                <RouterLink
                  key={item}
                  to="/works"
                  onClick={() => handleNavLinkClick(item)} // Use the new click handler
                  className={`cursor-pointer italic transition-all duration-300 relative py-2 text-lg ${
                    location.pathname === '/works' // Highlight 'works' if on its dedicated page
                      ? "text-purple-400 font-extrabold"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {location.pathname === '/works' && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-full"></span>
                  )}
                </RouterLink>
              ) : (
                <ScrollLink
                  key={item}
                  to={item}
                  spy={true} // Only for react-scroll links
                  smooth={true} // Only for react-scroll links
                  duration={800} // Only for react-scroll links
                  offset={-50} // Only for react-scroll links
                  onSetActive={handleSetActive} // Only for react-scroll links
                  onClick={() => handleNavLinkClick(item)} // Use the new click handler
                  className={`cursor-pointer italic transition-all duration-300 relative py-2 text-lg ${
                    active === item && location.pathname === '/' // Active only if on main page
                      ? "text-purple-400 font-extrabold"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {active === item && location.pathname === '/' && ( // Underline only if active and on main page
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-full"></span>
                  )}
                </ScrollLink>
              )
            ))}
          </div>

          {/* "Connect with me" button for Desktop */}
          <div className="hidden md:block ml-auto font-Mightail">
            <ScrollLink
              to="contact"
              smooth={true}
              duration={800}
              offset={-50}
              onSetActive={handleSetActive}
              className="cursor-pointer px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Connect with me
            </ScrollLink>
          </div>

          {/* Mobile Menu Button (Hamburger/Close icon) */}
          <button
            className="md:hidden text-white text-2xl z-50 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes className="text-purple-400" /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-gray-800 transform font-Mightail ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col items-center pt-24 z-40 shadow-2xl`}
      >
        {/* Mobile Menu Navigation Links */}
        {sections.map((item) => (
          // Conditionally render RouterLink for 'works' or ScrollLink for others
          item === "works" ? (
            <RouterLink
              key={item}
              to="/works"
              onClick={() => handleNavLinkClick(item)} // Use the new click handler
              className={`text-xl py-4 w-full text-center transition-all duration-300 ${
                location.pathname === '/works' // Highlight 'works' if on its dedicated page
                  ? "text-purple-400 font-extrabold"
                  : "text-gray-300 hover:text-purple-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </RouterLink>
          ) : (
            <ScrollLink
              key={item}
              to={item}
              smooth={true}
              duration={800}
              offset={-50}
              spy={true}
              onSetActive={handleSetActive}
              onClick={() => handleNavLinkClick(item)} // Use the new click handler
              className={`text-xl py-4 w-full text-center transition-all duration-300 ${
                active === item && location.pathname === '/' // Active only if on main page
                  ? "text-purple-400 font-extrabold"
                  : "text-gray-300 hover:text-purple-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ScrollLink>
          )
        ))}

        {/* "Connect with me" button for Mobile */}
        <ScrollLink
          to="contact"
          smooth={true}
          duration={800}
          offset={-50}
          onSetActive={handleSetActive}
          className="mt-8 px-8 py-4 rounded-full font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
          onClick={() => handleNavLinkClick('contact')} // Use the new click handler
        >
          Connect with me
        </ScrollLink>
      </div>
    </nav>
  );
};

export default Navbar;
