import React, { useEffect, useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BottomLine } from './desgn/BackgroundCircle';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the left side (contact info)
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%", // Animation starts when the top of the element is 80% from the top of the viewport
          toggleActions: "play none none reverse", // Play animation on scroll down, reverse on scroll up
        },
      }
    );

    // GSAP animation for the right side (contact form)
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.2, // Slight delay after left side animation
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 sm:p-10 overflow-hidden">
      {/* Main content container - responsive flex layout */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-10"> {/* Changed to flex-col on mobile, added responsive gap */}

        {/* Left Side (Contact Information) */}
        <div ref={leftRef} className="w-full md:w-1/2 px-4 text-center md:text-left"> {/* Full width on mobile, half on desktop, added padding and responsive text alignment */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-Mightail">Get in touch</h1> {/* Adjusted font size for responsiveness */}
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 font-Mightail">Let's talk</h2> {/* Adjusted font size for responsiveness */}
          <p className="text-base sm:text-lg text-gray-400 mb-8 font-LinearSans">
            I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start gap-4 mb-6"> {/* Centered on mobile, left on desktop */}
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-purple-400 text-xl font-LinearSans" />
              <p>greetstackdev@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-purple-400 text-xl font-LinearSans" />
              <p>+252-949675299</p>
            </div>
            <div className="flex items-center gap-4"> {/* Removed unnecessary sm:justify-start */}
              <FaMapMarkerAlt className="text-purple-400 text-xl font-LinearSans" />
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>

        {/* Right Side (Contact Form) */}
        <div ref={rightRef} className="w-full md:w-1/2 px-4 mt-8 md:mt-0"> {/* Full width on mobile, half on desktop, added padding, and top margin for mobile stacking */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2 font-Mightail">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2 font-Mightail">Your Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2 font-Mightail">Write your message here</label>
              <textarea
                id="message"
                placeholder="Enter your message"
                rows="5"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition duration-300 w-full font-Mightail"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      {/* BottomLine component moved outside the flex container to ensure proper rendering */}
      <BottomLine/>
    </div>
  );
};

export default Contact;
