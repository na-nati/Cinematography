// components/Footer.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll'; // Make sure react-scroll is installed
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTelegram, FaVimeo } from "react-icons/fa";
import { Camera, Film ,PlayCircle,
    Clapperboard,
    MonitorPlay,
    Tv2,
    Cast,
    Clock, Mail, Phone, MapPin, Monitor } from "lucide-react"; // Lucide icons


// Helper component for the repeating background icons
const BackgroundIcons = () => {
    const icons = [Camera, Film ,PlayCircle,
        Clapperboard,
        MonitorPlay,
        Tv2,
        Cast,
        Clock,]; // Icons to use for the pattern

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array(50).fill(0).map((_, i) => {
                const Icon = icons[Math.floor(Math.random() * icons.length)];
                const size = Math.random() * (40 - 20) + 20; // Random size between 20 and 40
                const opacity = Math.random() * (0.2 - 0.1) + 0.1; // Current opacity range (0.1 to 0.2)

                // --- FIX: Adjust x and y range to keep icons slightly away from edges ---
                const x = Math.random() * (90 - 10) + 10; // Random x between 10% and 90%
                const y = Math.random() * (90 - 10) + 10; // Random y between 10% and 90%
                // --- END FIX ---

                const rotate = Math.random() * 360;


                return (
                    <Icon
                        key={i}
                        className="absolute text-purple-400"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: opacity,
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                        }}
                    />
                );
            })}
        </div>
    );
};


const Footer = () => {
  const navigate = useNavigate();


  // Function to handle navigation to sections on the home page with smooth scrolling
  const handleScrollToSection = (sectionId) => {
    navigate('/'); // Navigate to home page first
    setTimeout(() => {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });
    }, 100); // Small delay to allow navigation to complete
  };


  return (
    <footer className="relative w-full bg-gray-900 text-gray-300 py-16 overflow-hidden font-LinearSans">

      {/* Background Icons Layer */}
      <BackgroundIcons />


      <div className="container mx-auto px-6 relative z-10"> {/* z-10 ensures content is above icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand/About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-bold text-purple-400 mb-4 font-Mightail">BERNABAS TEGEGN</h3> {/* Replace with your actual portfolio name */}
            <p className="text-sm leading-relaxed max-w-xs md:max-w-none mb-6">
              Dedicated to crafting compelling visual narratives. Specializing in cinematography, I blend artistic vision with technical precision to bring stories to life.
            </p>
            <div className="flex gap-4">
             
              <a href="https://www.instagram.com/berni_tegegn?igsh=dDkyZTBmMnI3azZj" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaInstagram size={20} /></a>
              <a href="https://t.me/@Akilesss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FaTelegram size={20} /></a>
              
               </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <h4 className="font-bold text-lg mb-4 text-purple-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleScrollToSection('home')} className="hover:text-purple-400 transition-colors">Home</button></li>
              <li><button onClick={() => handleScrollToSection('service')} className="hover:text-purple-400 transition-colors">Services</button></li>
              <li><button onClick={() => handleScrollToSection('skill')} className="hover:text-purple-400 transition-colors">Skills</button></li>
              <li><button onClick={() => handleScrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button></li>
              <li><button onClick={() => handleScrollToSection('contact')} className="hover:text-purple-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
          <h4 className="font-bold text-lg mb-4 text-purple-300">Contact me</h4>
            <address className="not-italic space-y-2">
              <p className="flex items-center justify-center md:justify-start">
                <MapPin size={16} className="mr-2 text-purple-400 flex-shrink-0" />
                <span>Addis Ababa, Ethiopia</span> {/* Your current location */}
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="mr-2 text-purple-400 flex-shrink-0" />
                <span>+251-949-675-299</span> {/* Replace with your phone number */}
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2 text-purple-400 flex-shrink-0" />
                <a href="mailto:bernabastegegn14@gmail.com" className="hover:text-purple-400 transition-colors">bernabastegegn14@gmail.com</a> {/* Replace with your email */}
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Monitor size={16} className="mr-2 text-purple-400 flex-shrink-0" />
                <a href="https://bernabas-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">bernabas-portfolio.netlify.app</a> {/* Replace with your website */}
              </p>
            </address>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
          <button onClick={() => handleScrollToSection('contact')} className="mt-8 px-8 py-4 rounded-full font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300">Connect with me</button>
         
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BERNABAS TEGEGN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;