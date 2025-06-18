import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const observersRef = useRef([]);

  // --- UPDATED SECTIONS ARRAY: 'process' and 'testimonials' removed ---
  const sections = [
    { name: "home", id: "home" },
    { name: "works", id: "other-work" },
    { name: "about me", id: "about" },
    { name: "service", id: "service" },
    // Removed: { name: "process", id: "process" },
    { name: "skill", id: "skill" },
    
    // Removed: { name: "testimonials", id: "testimonials" },
    { name: "contact", id: "contact" },
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
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        const homeElement = document.getElementById("home");
        if (homeElement) {
          const initialHomeObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setActive("home");
              console.log("✨ [Navbar Initial Observer] Home section is active on load.");
            }
            initialHomeObserver.disconnect();
          }, { root: null, threshold: 0.1, rootMargin: "-10% 0px -80% 0px" });
          initialHomeObserver.observe(homeElement);
        } else {
            setActive("home");
            console.warn("⚠️ [Navbar Initial Observer] Home element not found on initial load, setting active to 'home' directly.");
        }
      }, 0);

      return () => clearTimeout(timer);
    }
    setMenuOpen(false);
  }, [location.pathname]);

  // Scroll section observer - This is what handles "active page when scroll"
  useEffect(() => {
    console.log(`➡️ [Navbar Observer Effect] Running for path: ${location.pathname}`);

    if (location.pathname !== "/") {
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current = [];
      console.log("🚫 [Navbar Observer Effect] Not on homepage, observers disconnected.");
      return;
    }

    const options = {
      root: null,
      // Keep this rootMargin, as it's now working correctly for your active state
      rootMargin: "-60px 0px -50% 0px",
      threshold: 0.1,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        console.log(`👁️ [Observer Callback] Entry for ID: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}`);
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matched = sections.find((sec) => sec.id === sectionId);
          if (matched) {
            console.log(`✨ [Observer Callback] Setting active: ${matched.name}`);
            setActive(matched.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
        console.log(`✅ [Navbar Observer Effect] Observing element with ID: ${section.id}`);
      } else {
        console.warn(`⚠️ [Navbar Observer Effect] Element with ID: ${section.id} NOT FOUND in the DOM.`);
      }
    });

    observersRef.current.push(observer);

    return () => {
      console.log("🧹 [Navbar Observer Effect] Cleaning up observers.");
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current = [];
    };
  }, [location.pathname, sections]);

  const handleNavLinkClick = useCallback((targetId, displayName) => {
    setMenuOpen(false);

    setActive(displayName);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(targetId), 100);
    } else {
      scrollToId(targetId);
    }

    function scrollToId(id) {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -60;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        console.log(`🔗 [NavLinkClick] Scrolled to ID: ${id}`);
      } else {
        console.warn(`❌ [NavLinkClick] Target element with ID: ${id} not found for scrolling.`);
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
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(section.id, section.name);
                  }}
                  className={`cursor-pointer italic relative py-2 text-lg transition-all duration-300 ${
                    isActive
                      ? "text-purple-400 font-extrabold underline underline-offset-8 decoration-purple-500"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1).replace('-', ' ')}
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

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
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
              {section.name.charAt(0).toUpperCase() + section.name.slice(1).replace('-', ' ')}
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