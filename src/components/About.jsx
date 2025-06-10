import { useRef, useEffect, useState } from 'react';
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

  useEffect(() => {
    // Create an observer for the main content block (textRef)
    // We'll use this single observer to trigger animations for image, text, and stats
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      // Lower the threshold slightly for mobile to trigger sooner
      { threshold: 0.3 } // Changed threshold to 0.3
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
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <Element name="about me">
      <div className="
        min-h-screen flex flex-col items-center justify-start sm:justify-center
        gap-10 text-center bg-black text-white p-6 sm:p-10 relative overflow-hidden
        pt-24 sm:pt-10 // Added more top padding for mobile to push content below the title
      ">

        {/* Background Circles - Keep as is, it's a background element */}
        <div
          ref={backgroundCirclesRef} // Still observe if it has its own animation
          className={`transition-opacity duration-1500 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <BackgroundCircles />
        </div>

        {/* About Title - Absolute positioning is fine here */}
        <div className="absolute top-10 z-20 w-full text-center">
          <h1 className="font-bold mb-6 text-purple-400 text-4xl sm:text-6xl font-Mightail">About Me</h1>
        </div>

        {/* Main Content: Image and Text */}
        <div className="
          flex flex-col md:flex-row items-center justify-center
          gap-10 relative z-10 w-full max-w-6xl
          mt-10 sm:mt-0 // Adjusted top margin to ensure content starts lower on mobile
        ">

          {/* Image */}
          <motion.div
            ref={imageRef} // Use ref for observation, motion for animation
            initial={{ x: -200, opacity: 0 }} // Initial state for animation
            animate={inView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }} // Animate based on inView
            transition={{ duration: 1.0, ease: "easeOut" }} // Smoother transition
            className="w-full md:w-1/3 h-auto px-4 md:px-0"
          >
            <img src={about} alt="About Me" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </motion.div>

          {/* Text block, now including the stats */}
          <motion.div
            ref={textRef} // Use ref for observation, motion for animation
            initial={{ x: 200, opacity: 0 }} // Initial state for animation
            animate={inView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }} // Animate based on inView
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }} // Added a slight delay after image
            className="
              max-w-2xl font-LinearSans flex flex-col justify-between
              text-left px-4 md:px-0
              mt-8 md:mt-0 // Add top margin for text block on mobile
            "
          >
            <div> {/* Wrapper for paragraphs to separate them from stats */}
              <p className="max-w-2xl mb-4 text-base sm:text-lg leading-relaxed">
                I am a passionate cinematographer with over a decade of experience in the industry.
                From a background in editing to mastering the art of lighting and camera work, I have dedicated my career to telling compelling visual stories.
              </p>
              <p className="max-w-2xl mb-4 text-base sm:text-lg leading-relaxed">
                After earning my MFA in cinematography from the American Film Institute Conservatory, I received the ASC Student Heritage Award for my work on my thesis film, further cementing my love for filmmaking.
              </p>
              <p className="max-w-2xl mb-4 text-base sm:text-lg leading-relaxed">
                Over the years, I have collaborated with brands like Mattel, Microsoft, and Coca-Cola, along with working on political campaigns, documentaries, and feature films. My narrative work has been recognized in numerous festivals, earning cinematography awards.
              </p>
              <p className="max-w-2xl mb-4 text-base sm:text-lg leading-relaxed">
                My true passion lies in capturing the beauty and complexity of human experiences, bringing diverse perspectives and stories to life through the lens of my camera.
              </p>
            </div>

            {/* Users and Clock stats */}
            <div className="
              mt-8 flex flex-col sm:flex-row justify-center sm:justify-end items-center sm:items-end
              space-y-4 sm:space-y-0 sm:space-x-8 w-full
            ">
              {[
                { icon: Users, label: "100+ Clients", desc: "Happy Customers" },
                { icon: Clock, label: "4+ Years", desc: "Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  // Animate based on the overall section's inView state
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.2 + 1.2, duration: 0.6 }} // Increased delay for appearance after text
                  className="
                    p-4 rounded-lg bg-gray-800 bg-opacity-50 min-w-[150px] shadow-lg
                    flex flex-col items-center sm:items-end text-center sm:text-right
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