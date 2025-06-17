import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// REMOVE: import { scroller } from "react-scroll"; // Remove this line

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
// REMOVE: { heroButtonRef } prop if not used inside MainPortfolioPage
const MainPortfolioPage = ({ heroButtonRef }) => {
  // REMOVE: handleScrollToSection as it uses react-scroll
  // const handleScrollToSection = (sectionId) => {
  //   scroller.scrollTo(sectionId, {
  //     duration: 800,
  //     delay: 0,
  //     smooth: "easeInOutQuart",
  //     offset: -50,
  //   });
  // };

  return (
    <>
      {/* Navbar: No longer passing onNavigate, as Navbar handles its own clicks with window.scrollTo */}
      <Navbar />

      <section id="home">
        {/* If Hero has a button that needs to scroll to a section, it will need to use
           a similar `handleNavLinkClick` logic from Navbar or be passed a prop
           that uses `window.scrollTo`. For now, ensure it just has the ID. */}
        <Hero /* REMOVE: onNavigate={handleScrollToSection} */ buttonRef={heroButtonRef} />
      </section>

      <section id="other-work">
        <Otherwork />
      </section>

      <section id="service">
        <Service />
      </section>

      {/* Ensure these sections have IDs that match Navbar's `sections` array */}
      <section id="process"> {/* Add this to Navbar's sections array */}
        <Process />
      </section>

      <section id="skill">
        <Skill />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="testimonials"> {/* Add this to Navbar's sections array */}
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
  const heroButtonRef = useRef(null); // Keep this if Hero still needs it, otherwise remove.

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolioPage heroButtonRef={heroButtonRef} />} />
        <Route path="/work/:companyId" element={<CompanyWorkDetail />} />
      </Routes>
    </Router>
  );
};

export default App;