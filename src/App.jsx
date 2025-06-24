import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// REMOVE: import { scroller } from "react-scroll"; // This line is already marked for removal, good!

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

// Import the new Footer component
import Footer from "./components/Footer"; // <--- ADD THIS LINE

// Component to encapsulate the sections that remain on the main landing page
const MainPortfolioPage = ({ heroButtonRef }) => {
  return (
    <>
      <Navbar /> {/* Navbar typically stays outside of sections if it's sticky/global */}

      <section id="home">
        <Hero buttonRef={heroButtonRef} />
      </section>

      {/* Your existing sections */}
      <section id="other-work">
        <Otherwork />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="service">
        <Service />
      </section>

      <section id="skill">
        <Skill />
      </section>

      <section id="process">
        <Process />
      </section>

      

      

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="contact">
        <Contact />
      </section>
      {/* Footer will be added after MainPortfolioPage in App.js */}
    </>
  );
};

// Main App component that sets up routing
const App = () => {
  const heroButtonRef = useRef(null);

  return (
    <Router>
      <div className="App"> {/* Optional: A wrapper div if you have global styles */}
        <Routes>
          <Route path="/" element={<MainPortfolioPage heroButtonRef={heroButtonRef} />} />
          <Route path="/work/:companyId" element={<CompanyWorkDetail />} />
          {/* Add other routes here */}
        </Routes>

        <Footer /> {/* <--- ADD THE FOOTER HERE */}
      </div>
    </Router>
  );
};

export default App;