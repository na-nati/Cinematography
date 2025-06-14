import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BottomLine } from './desgn/BackgroundCircle';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // State for managing the alert
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

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
          start: "top 80%",
          toggleActions: "play none none reverse",
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
        delay: 0.2,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // IMPORTANT: Make sure this is your actual Web3Forms access key
    formData.append("access_key", "5a1c9b7b-a57b-4b42-94c8-6cc6f22454e2"); // <--- CONFIRM THIS IS UPDATED!

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        setAlert({ visible: true, message: "Message sent successfully!", type: "success" });
        event.target.reset(); // Clear the form
      } else {
        setAlert({ visible: true, message: res.message || "Something went wrong. Please try again.", type: "error" });
      }
    } catch (error) {
      setAlert({ visible: true, message: "Network error. Please check your connection.", type: "error" });
      console.error("Submission error:", error);
    }

    // --- CHANGE MADE HERE ---
    // Increase the duration for the alert to be visible.
    // 8000 milliseconds = 8 seconds. Adjust as needed.
    setTimeout(() => {
      setAlert({ visible: false, message: '', type: '' });
    }, 8000); // Changed from 5000 to 8000
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 sm:p-10 overflow-hidden relative">
      {/* Alert Component */}
      {alert.visible && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg z-50
          ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-fade-in-down`}
        >
          {alert.message}
          <button
            onClick={() => setAlert({ visible: false, message: '', type: '' })}
            className="ml-4 font-bold"
            aria-label="Close alert"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main content container - responsive flex layout */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-10">
        {/* Left Side (Contact Information) */}
        <div ref={leftRef} className="w-full md:w-1/2 px-4 text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-Mightail">Get in touch</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 font-Mightail">Let's talk</h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 font-LinearSans">
            I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start gap-4 mb-6">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-purple-400 text-xl font-LinearSans" />
              <p>bernabastegegn14@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-purple-400 text-xl font-LinearSans" />
              <p>+251-949675299</p>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-purple-400 text-xl font-LinearSans" />
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>

        {/* Right Side (Contact Form) */}
        <div ref={rightRef} className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2 font-Mightail">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2 font-Mightail">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2 font-Mightail">Write your message here</label>
              <textarea
                id="message"
                name="message"
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
      <BottomLine/>
    </div>
  );
};

export default Contact;