import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const observersRef = useRef([]);

  const sections = [
    { name: "home", id: "home", path: "/" },
    { name: "works", id: "other-work", path: "/" }, // Assuming 'other-work' is the ID for your works section
    { name: "service", id: "service", path: "/" },
    { name: "skill", id: "skill", path: "/" },
    { name: "about me", id: "about", path: "/" },
    { name: "contact", id: "contact", path: "/" },
  ];

  // Set scroll background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset on route change (e.g., if you navigate to /works directly)
  useEffect(() => {
    // Only reset if we are not on the homepage and then navigate back to homepage
    if (location.pathname === "/") {
        setActive("home");
    }
    setMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  // Scroll section observer - This is what handles "active page when scroll"
  useEffect(() => {
    // Only observe sections if we are on the homepage path
    if (location.pathname !== "/") {
      observersRef.current.forEach((obs) => obs.disconnect()); // Disconnect existing observers
      observersRef.current = []; // Clear the ref
      return;
    }

    const options = {
      root: null, // refers to the viewport
      // Adjust rootMargin as needed. This creates an "active zone" in the middle of the screen.
      // E.g., "-60px 0px -50% 0px" means active when top of element passes 60px from top of viewport, and bottom is above 50% from bottom.
      rootMargin: "-30% 0px -60% 0px", // Original: good for activating when a section is mostly in the upper middle
      threshold: 0.1, // Trigger when 10% of the target is visible
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matched = sections.find((sec) => sec.id === sectionId);
          if (matched) {
            setActive(matched.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Observe each section element by its ID
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Store observer in ref to disconnect later
    observersRef.current.push(observer);

    // Cleanup function for unmounting or re-running effect
    return () => {
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current = [];
    };
  }, [location.pathname, sections]); // Depend on location.pathname to re-initialize on route changes, and sections if it were to change dynamically

  // Click navigation
  const handleNavLinkClick = useCallback((targetId, displayName) => {
    setMenuOpen(false); // Close mobile menu when a link is clicked

    if (location.pathname !== "/") {
      // If not on the homepage, navigate to it first
      navigate("/");
      // Then, after navigation, scroll to the ID. A small timeout is often needed
      // to allow the DOM to render the target element before scrolling.
      setTimeout(() => scrollToId(targetId), 100);
    } else {
      // If already on the homepage, just scroll
      scrollToId(targetId);
    }

    function scrollToId(id) {
      const el = document.getElementById(id);
      if (el) {
        // Adjust yOffset based on your fixed navbar height
        const yOffset = -60; // Assuming your navbar height is around 60px
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActive(displayName); // Set active state immediately on click
      }
    }
  }, [navigate, location.pathname]);


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-xl py-3 border-b-2 border-purple-600 transition-all duration-300 ${
        scrolled ? "bg-black bg-opacity-90 backdrop-blur-sm" : "bg-black bg-opacity-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-purple-400 text-2xl font-extrabold font-Mightail">
            Bernabas
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 ml-8 gap-x-8 font-Mightail items-center">
            {sections.map((section) => {
              const isActive = active === section.name;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`} // Standard href for semantic linking
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor jump
                    handleNavLinkClick(section.id, section.name);
                  }}
                  className={`cursor-pointer italic relative py-2 text-lg transition-all duration-300 ${
                    isActive
                      ? "text-purple-400 font-extrabold underline underline-offset-8 decoration-purple-500"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
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
                handleNavLinkClick("contact", "contact");
              }}
              className="cursor-pointer px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Connect with me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-2xl z-50 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
            onClick={() => setMenuOpen(!menuOpen)}
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

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-30 md:hidden"
          onClick={() => setMenuOpen(false)} // Close menu when clicking outside
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-gray-800 transform font-Mightail ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col items-center pt-24 z-40 shadow-2xl`}
      >
        {sections.map((section) => {
          const isActive = active === section.name;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(section.id, section.name);
              }}
              className={`text-xl py-4 w-full text-center transition-all duration-300 ${
                isActive
                  ? "text-purple-400 font-extrabold underline underline-offset-4 decoration-purple-500"
                  : "text-gray-300 hover:text-purple-300"
              }`}
            >
              {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
            </a>
          );
        })}

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("contact", "contact");
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