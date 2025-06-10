import React, { useState, useRef, useEffect } from "react";
import { scroller } from "react-scroll";

// Import your main content sections
import Hero from "./Components/Hero";
import About from "./Components/About";
import Work from "./Components/Work";
import Contact from "./Components/contact";
import Skill from "./Components/Skill";
import Service from "./Components/Service"; // Assuming you have a Service component

// Import the Landing page and the main Navbar
import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const portfolioButtonRef = useRef(null);
  const [targetSectionAfterLanding, setTargetSectionAfterLanding] = useState(null);

  /**
   * Function to handle scrolling to a specific section using react-scroll's scroller.
   * This will be passed to components that need to initiate a scroll.
   * @param {string} sectionId - The ID of the section to scroll to.
   */
  const handleScrollToSection = (sectionId) => {
    console.log(`[App.jsx] Attempting to scroll to section: ${sectionId}`);
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50, // Adjust this offset if your fixed Navbar causes overlap
    });
  };

  /**
   * Called by Landing when its animation completes or menu navigation occurs.
   * @param {string | null} targetId - The ID of the section to scroll to (e.g., 'home', 'works').
   * @param {'animation' | 'instant'} exitMode - How the landing page should exit.
   */
  const handleLandingComplete = (targetId = null, exitMode = 'animation') => {
    console.log(`[App.jsx] handleLandingComplete called. Exit mode: ${exitMode}. Target: ${targetId || 'home'}`);
    setShowLanding(false); // Hide the landing page

    if (targetId) {
      setTargetSectionAfterLanding(targetId);
    } else {
      setTargetSectionAfterLanding('home'); // Default to 'home' if no specific target
    }
  };

  /**
   * Effect to handle scrolling after landing page dismisses.
   */
  useEffect(() => {
    if (!showLanding && targetSectionAfterLanding) {
      const timeoutId = setTimeout(() => {
        handleScrollToSection(targetSectionAfterLanding);
        setTargetSectionAfterLanding(null);
      }, 100); // Small delay to ensure sections are mounted
      return () => clearTimeout(timeoutId);
    }
  }, [showLanding, targetSectionAfterLanding]);

  /**
   * Function passed to the main Navbar.jsx.
   * Called when the home icon in the Navbar is clicked.
   * It brings the Landing page back into view.
   */
  const returnToLanding = () => {
    console.log("[App.jsx] Navbar Home icon clicked: Setting showLanding to TRUE.");
    setShowLanding(true); // Set state to true to render the Landing component again
    window.scrollTo(0, 0); // Scroll to the very top of the window for a clean landing page view
    setTargetSectionAfterLanding(null); // Clear any previous scroll target
  };

  return (
    <>
      {/* Navbar for main portfolio view */}
      {!showLanding && <Navbar onReturnToLanding={returnToLanding} />}

      {/* Conditional rendering of Landing vs. Main Portfolio */}
      {showLanding ? (
        <Landing
          onComplete={handleLandingComplete}
          targetRef={portfolioButtonRef}
          onReturnToLanding={returnToLanding} // <-- Pass this to Landing for its MenuOverlay
          onNavigate={handleScrollToSection} // <-- Pass this to Landing for its MenuOverlay
        />
      ) : (
        <>
          {/* Each section must have a unique ID matching your Navbar/MenuOverlay links */}
          <section id="home">
            <Hero buttonRef={portfolioButtonRef} onNavigate={handleScrollToSection} />
          </section>
          <section id="works">
            <Work />
          </section>
          <section id="service"> {/* <-- New Service Section */}
            <Service /> {/* Assuming Service component exists */}
          </section>
          <section id="skill">
            <Skill />
          </section>
          <section id="about"> {/* <-- ID is "about" (no space) */}
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </>
      )}
    </>
  );
};

export default App;