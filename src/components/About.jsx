import React, { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import about from "../assets/about.jpg";
import { BackgroundCircles } from './desgn/BackgroundCircle';
import { motion } from 'framer-motion';
import { Users, Clock } from 'lucide-react';

const About = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const backgroundCirclesRef = useRef(null); // Keep this if BackgroundCircles animates

  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // New state to track if animation has run

  useEffect(() => {
    // Create an observer for the main content block (textRef)
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting and hasn't animated yet, trigger the animation
        if (entry.isIntersecting && !hasAnimated) {
          setInView(true);
          setHasAnimated(true); // Set to true so it animates only once
        } else if (!entry.isIntersecting && !hasAnimated) {
          // If not intersecting and hasn't animated, ensure inView is false (for initial state)
          setInView(false);
        }
        // If hasAnimated is true, inView will remain true, and elements will stay visible.
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    // Only observe the text block, as its entry will generally mean the section is in view
    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasAnimated]); // Add hasAnimated to dependency array to re-run observer setup when it changes

  // Define animate property based on hasAnimated, ensuring elements stay visible once animated
  const animateProps = {
    x: hasAnimated ? 0 : 200, // For elements coming from right (like text block and stats)
    opacity: hasAnimated ? 1 : 0,
  };
  const imageAnimateProps = {
    x: hasAnimated ? 0 : -200, // For elements coming from left (like image)
    opacity: hasAnimated ? 1 : 0,
  };


  return (
    <Element name="about me">
      <div className="
        min-h-screen flex flex-col items-center justify-start
        gap-10 text-center bg-black text-white p-6 sm:p-10 relative overflow-hidden
        pt-20 md:pt-10 {/* Adjusted top padding for consistent spacing below Navbar */}
      ">

        {/* Background Circles - Will fade in/out based on inView (which effectively acts once) */}
        <div
          ref={backgroundCirclesRef}
          className={`transition-opacity duration-1500 ease-out ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}
        >
          <BackgroundCircles />
        </div>

        {/* About Title - Now part of the normal flow, centered */}
        <h1 className="font-bold mb-6 text-purple-400 text-4xl sm:text-6xl font-Mightail mt-4"> {/* Added mt-4 for spacing below Navbar */}
          About Me
        </h1>

        {/* Main Content: Image and Text */}
        <div className="
          flex flex-col md:flex-row items-start justify-center
          gap-6 md:gap-10 {/* Responsive gap between image and text */}
          relative z-10 w-full max-w-6xl
          mt-10 sm:mt-0
        ">

          {/* Image */}
          <motion.div
            ref={imageRef}
            initial={{ x: -200, opacity: 0 }}
            animate={imageAnimateProps} // Use the new animateProps for one-time animation
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full md:w-2/5 h-auto px-4 md:px-0"
          >
            <img src={about} alt="About Me" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </motion.div>

          {/* Text block, now including the stats */}
          <motion.div
            ref={textRef}
            initial={{ x: 200, opacity: 0 }}
            animate={animateProps} // Use the new animateProps for one-time animation
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            className="
              max-w-2xl font-LinearSans flex flex-col justify-between
              text-center {/* Universal centering for text content */}
              px-4 md:px-0 md:w-3/5
              mt-8 md:mt-0
            "
          >
            <div> {/* Wrapper for paragraphs to separate them from stats */}
              <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 mt-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>My Journey into Cinematography</h3>
              <p className="max-w-2xl mb-4 text-lg md:text-xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                I am a passionate cinematographer with over a decade of experience in the industry.
                From a background in editing to mastering the art of lighting and camera work, I have dedicated my career to telling compelling visual stories.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 mt-6" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Academic Background & Awards</h3>
              <p className="max-w-2xl mb-4 text-lg md:text-xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                After earning my MFA in cinematography from the American Film Institute Conservatory, I received the ASC Student Heritage Award for my work on my thesis film, further cementing my love for filmmaking.
              </p>

            </div>

            {/* Users and Clock stats */}
            <div className="
              mt-8 flex flex-col sm:flex-row justify-center items-center
              space-y-4 sm:space-y-0 sm:space-x-8 w-full
            ">
              {[
                { icon: Users, label: "100+ Clients", desc: "Happy Customers" },
                { icon: Clock, label: "4+ Years", desc: "Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  // Animate based on the overall section's hasAnimated state
                  animate={animateProps}
                  transition={{ delay: index * 0.2 + 1.2, duration: 0.6 }}
                  className="
                    p-4 rounded-lg bg-black bg-opacity-50 min-w-[150px] shadow-lg
                    flex flex-col items-center text-center
                  "
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Element>
  );
};

export default About;
