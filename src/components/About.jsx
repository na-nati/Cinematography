import React, { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import about from "../assets/about.jpg";
import { BackgroundCircles } from './desgn/BackgroundCircle';
import { motion } from 'framer-motion';
import {
  Camera,
  Video,
  PlayCircle,
  Film,
  Clapperboard,
  MonitorPlay,
  Tv2,
  Cast,
  Clock,
  User2,
} from 'lucide-react';

const backgroundVideoIcons = [
  { id: 1, Icon: Video, left: '2%', top: '5%', customSize: 100, animX: 15, animY: 20, duration: 9, delay: 0 },
  { id: 2, Icon: Tv2, left: '14%', top: '22%', customSize: 80, animX: -15, animY: -15, duration: 10, delay: 1 },
  { id: 3, Icon: Film, left: '85%', top: '15%', customSize: 80, animX: 15, animY: -10, duration: 12, delay: 2 },
  { id: 4, Icon: Clapperboard, left: '78%', top: '32%', customSize: 50, animX: -10, animY: 10, duration: 10, delay: 3 },
  { id: 5, Icon: PlayCircle, left: '7%', top: '75%', customSize: 80, animX: 10, animY: -20, duration: 11, delay: 4 },
  { id: 6, Icon: MonitorPlay, left: '20%', top: '85%', customSize: 100, animX: -15, animY: 15, duration: 12, delay: 5 },
  { id: 7, Icon: Camera, left: '85%', top: '70%', customSize: 80, animX: -10, animY: -15, duration: 13, delay: 6 },
  { id: 8, Icon: Cast, left: '90%', top: '85%', customSize: 100, animX: 10, animY: 10, duration: 14, delay: 7 },
];

const About = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const backgroundCirclesRef = useRef(null);

  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

  useEffect(() => {
    // Media Query Listener for mobile detection
    const handleResize = () => {
      // Adjust this breakpoint as per your design's definition of "mobile"
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
    };

    handleResize(); // Set initial value on mount
    window.addEventListener('resize', handleResize);
    const cleanupResize = () => window.removeEventListener('resize', handleResize);

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (textRef.current) observer.observe(textRef.current);

    // Cleanup function for both listeners
    return () => {
      cleanupResize();
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, [hasAnimated]); // Re-run effect if hasAnimated changes (though it only changes once)

  // Define animation variants for image and text based on hasAnimated and isMobile
  const contentVariants = {
    image: {
      initial: { x: -50, opacity: 0 },
      animate: hasAnimated ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    text: {
      initial: { x: 50, opacity: 0 },
      animate: hasAnimated ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 },
      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 }
    }
  };

  return (
    <Element name="about">
      <div className="relative min-h-screen flex flex-col items-center justify-start gap-10 text-center bg-black text-white p-6 sm:p-10 pt-20 md:pt-10 overflow-hidden">

        {/* Background Circles - Opacity transition based on hasAnimated */}
        <div
          ref={backgroundCirclesRef}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: -1 }}
        >
          <BackgroundCircles />
        </div>

        {/* Animated Icons - Conditional animation based on isMobile */}
        {backgroundVideoIcons.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-purple-400"
            style={{ left: item.left, top: item.top, zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isMobile ? [0.1, 0.3, 0.1] : [0.2, 0.6, 0.2], // Lighter opacity on mobile
              x: isMobile ? [0, item.animX * 0.5, 0] : [0, item.animX, 0], // Smaller movement
              y: isMobile ? [0, item.animY * 0.5, 0] : [0, item.animY, 0], // Smaller movement
              scale: isMobile ? [0.95, 1, 0.95] : [0.9, 1, 0.9], // Less scale change
              rotate: isMobile ? [0, item.animX > 0 ? 4 : -4, 0] : [0, item.animX > 0 ? 8 : -8, 0] // Less rotation
            }}
            transition={{
              duration: isMobile ? item.duration * 1.5 : item.duration, // Slower animation on mobile
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
              repeatType: "mirror"
            }}
          >
            {/* Reduce padding on mobile for icons if needed, or adjust size directly */}
            <div style={{ padding: isMobile ? '5px' : '10px' }}>
              <item.Icon size={isMobile ? item.customSize * 0.7 : item.customSize} /> {/* Smaller icon size on mobile */}
            </div>
          </motion.div>
        ))}

        {/* Title */}
        <h1 className="font-bold mb-6 text-purple-400 text-4xl sm:text-6xl font-Mightail mt-4 relative z-10">
          About Me
        </h1>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 relative z-10 w-full max-w-6xl mt-10 sm:mt-0">

          {/* Image */}
          <motion.div
            ref={imageRef}
            initial={contentVariants.image.initial}
            animate={contentVariants.image.animate}
            transition={contentVariants.image.transition}
            className="w-full md:w-2/5 h-auto px-4 md:px-0"
          >
            <img src={about} alt="About Me" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </motion.div>

          {/* Text */}
          <motion.div
            ref={textRef}
            initial={contentVariants.text.initial}
            animate={contentVariants.text.animate}
            transition={contentVariants.text.transition}
            className="max-w-2xl font-LinearSans flex flex-col justify-between text-center px-4 md:px-0 md:w-3/5 mt-8 md:mt-0"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 mt-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                My Journey into Cinematography
              </h3>
              <p className="mb-4 text-lg md:text-xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                I am a passionate cinematographer with over a decade of experience in the industry.
                From a background in editing to mastering the art of lighting and camera work, I have dedicated my career to telling compelling visual stories.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 mt-6" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                Academic Background & Awards
              </h3>
              <p className="mb-4 text-lg md:text-xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                After earning my MFA in cinematography from the American Film Institute Conservatory, I received the ASC Student Heritage Award for my work on my thesis film, further cementing my love for filmmaking.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 w-full">
              {[
                { icon: User2, label: "100+ Clients", desc: "Happy Customers" },
                { icon: Clock, label: "4+ Years", desc: "Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 30 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  className="p-4 rounded-lg bg-black bg-opacity-50 min-w-[150px] shadow-lg flex flex-col items-center text-center"
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