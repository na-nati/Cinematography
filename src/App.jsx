import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

// Import your main content sections
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Contact from "./components/contact";
import Skill from "./components/Skill";
import Service from "./components/Service";

// Import the Navbar
import Navbar from "./components/Navbar";

// New component for the dedicated Work page
// This will render when the user navigates to /works
const WorkPage = () => {
  return (
    <div className="">
      {/* Navbar is intentionally omitted here */}
      <Work />
    </div>
  );
};

// Component to encapsulate the sections that remain on the main landing page
// This will render when the user navigates to /
const MainPortfolioPage = ({ heroButtonRef }) => {
  // This handleScrollToSection is specific to the main page's internal scrolling
  const handleScrollToSection = (sectionId) => {
    console.log(`[MainPortfolioPage.jsx] Scrolling to section: ${sectionId}`);
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50, // Adjust this offset if your fixed Navbar causes overlap
    });
  };

  return (
    <>
      {/* Navbar is now rendered ONLY within the MainPortfolioPage */}
      <Navbar onNavigate={handleScrollToSection} /> {/* Pass onNavigate to Navbar */}

      <section id="home">
        <Hero onNavigate={handleScrollToSection} buttonRef={heroButtonRef} />
      </section>
      {/* 'Work' section is removed from here as it's now a separate page */}
      <section id="service">
        <Service />
      </section>
      <section id="skill">
        <Skill />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

// Main App component that sets up routing
const App = () => {
  // Ref for the Hero component's button (passed down to MainPortfolioPage)
  const heroButtonRef = useRef(null);

  return (
    <Router>
      {/* Navbar is no longer rendered globally here */}

      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<MainPortfolioPage heroButtonRef={heroButtonRef} />} />
        <Route path="/works" element={<WorkPage />} />
        {/* Add more routes here for other separate pages if needed */}
      </Routes>
    </Router>
  );
};

export default App;
