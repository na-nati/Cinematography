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
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.2,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-10 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-row gap-10">
        
        {/* Left Side */}
        <div ref={leftRef} className="w-1/2">
          <h1 className="text-6xl font-bold mb-6 font-Mightail">Get in touch</h1>
          <h2 className="text-3xl font-bold text-purple-400 mb-6 font-Mightail">Let's talk</h2>
          <p className="text-lg text-gray-400 mb-8 font-LinearSans">
            I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.
          </p>

          <div className="mb-6 flex items-center gap-4">
            <FaEnvelope className="text-purple-400 text-xl font-LinearSans" />
            <p>greetstackdev@gmail.com</p>
          </div>
          <div className="mb-6 flex items-center gap-4">
            <FaPhone className="text-purple-400 text-xl font-LinearSans" />
            <p>+252-949675299</p>
          </div>
          <div className="mb-4 sm:mb-6 flex items-center justify-center sm:justify-start gap-4">
            <FaMapMarkerAlt className="text-purple-400 text-xl font-LinearSans" />
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* Right Side */}
        <div ref={rightRef} className="w-1/2">
          <form className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2 font-Mightail">Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 font-Mightail">Your Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 font-Mightail">Write your message here</label>
              <textarea 
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
        <BottomLine/>

      </div>
    </div>
  );
};

export default Contact;
