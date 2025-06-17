import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

// Import your main content sections
import Hero from "./components/Hero";
import About from "./components/About";

import Contact from "./components/contact";
import Skill from "./components/Skill";
import Service from "./components/Service";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
// Import the Navbar
import Navbar from "./components/Navbar";

// OtherWork is the component displaying the grid of clients
import Otherwork from "./components/Otherwork";

// CompanyWorkDetail is the component for individual company video carousels
import CompanyWorkDetail from "./components/CompanyWorkDetail";


// Component to encapsulate the sections that remain on the main landing page
const MainPortfolioPage = ({ heroButtonRef }) => {
  const handleScrollToSection = (sectionId) => {
    // This function scrolls to sections on the main portfolio page
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50, // Adjust this offset if your fixed Navbar causes overlap
    });
  };

  return (
    <>
      {/* Navbar for main page navigation */}
      <Navbar onNavigate={handleScrollToSection} />

      <section id="home">
        <Hero onNavigate={handleScrollToSection} buttonRef={heroButtonRef} />
      </section>

      {/* The Clients/OtherWork section is now part of the main page */}
      <section id="other-work">
        <Otherwork />
      </section>

      <section id="service">
        <Service />
      </section>

      <section id="process">
        <Process />
      </section>

      <section id="skill">
        <Skill />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

// Main App component that sets up routing
const App = () => {
  const heroButtonRef = useRef(null);

  return (
    <Router>
      <Routes>
        {/* Route for the main portfolio landing page */}
        <Route path="/" element={<MainPortfolioPage heroButtonRef={heroButtonRef} />} />

        {/* Dynamic route for individual company work pages */}
        {/* The ':companyId' part will capture the ID from the URL (e.g., /work/qrs-furniture) */}
        <Route path="/work/:companyId" element={<CompanyWorkDetail />} />

        {/* Removed the /works route and WorkPage as they are no longer needed
            given the new structure of individual company work pages with carousels.
            If you need a general video carousel, you would create a new component for it.
        */}
      </Routes>
    </Router>
  );
};

export default App;
