import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

// Import your main content sections
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work"; // Your existing dedicated Work component (the carousel)
import Contact from "./components/contact";
import Skill from "./components/Skill";
import Service from "./components/Service";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
// Import the Navbar
import Navbar from "./components/Navbar";

// OtherWork is imported as you had it. If it contains duplicate carousel logic,
// you might want to refactor it to just show a preview or link to /works.
import OtherWork from "./components/Otherwork";

// Import the new CompanyWorkDetail component
import CompanyWorkDetail from "./components/CompanyWorkDetail"; // Ensure this path is correct

// This will render when the user navigates to /works (your original full carousel)
const WorkPage = () => {
  return (
    <div className="">
      {/* Navbar is intentionally omitted here as the Work component has its own back button */}
      <Work />
    </div>
  );
};

// Component to encapsulate the sections that remain on the main landing page
const MainPortfolioPage = ({ heroButtonRef }) => {
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
      <Navbar onNavigate={handleScrollToSection} />

      <section id="home">
        <Hero onNavigate={handleScrollToSection} buttonRef={heroButtonRef} />
      </section>

      <section id="other-work">
        <OtherWork />
      </section>

      <section id="service">
        <Service />
      </section>

      <section id="process"> {/* IMPORTANT: Ensure this ID matches the one in Process.jsx */}
        <Process />
      </section>

      <section id="skill">
        <Skill />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="testimonials"> {/* Add an ID for navigation */}
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
        <Route path="/" element={<MainPortfolioPage heroButtonRef={heroButtonRef} />} />
        {/* This route renders your full video carousel */}
        <Route path="/works" element={<WorkPage />} />
        {/* This new dynamic route handles individual company work pages */}
        <Route path="/work/:companyId" element={<CompanyWorkDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
