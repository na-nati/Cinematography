import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaFilm,
  FaSoundcloud,
  FaCameraRetro,
  FaRegLightbulb,
  FaCut,
} from 'react-icons/fa';
import {
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
} from 'react-icons/si';

const skillCategories = [
  {
    category: "Software & Editing",
    skills: [
      { name: "Premiere Pro", icon: SiAdobepremierepro, percentage: 95 },
      { name: "After Effects", icon: SiAdobeaftereffects, percentage: 85 },
      { name: "Photoshop", icon: SiAdobephotoshop, percentage: 90 },
      { name: "CapCut", icon: FaCut, percentage: 80 },
    ]
  },
  {
    category: "Cinematography Skills",
    skills: [
      { name: "Cinematography", icon: FaFilm, percentage: 92 },
      { name: "Camera Work", icon: FaCameraRetro, percentage: 88 },
      { name: "Lighting Design", icon: FaRegLightbulb, percentage: 80 },
    ]
  },
  {
    category: "Audio & Post-Production",
    skills: [
      { name: "Sound Design", icon: FaSoundcloud, percentage: 75 },
    ]
  },
];

const rainVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: 'easeOut'
    }
  })
};

const SkillSymbol = ({ Icon, label, percentage, index }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={rainVariant}
      className="relative group p-2 bg-purple-900/20 border border-purple-600 rounded-full flex flex-col justify-center items-center hover:scale-110 transition-all duration-300"
      style={{
        width: '120px',
        height: '120px',
      }}
    >
      <svg
        className="absolute inset-0"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          className="stroke-gray-700 opacity-50"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          className="stroke-purple-400"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1.5s ease-out',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>

      <div className="relative z-10 flex flex-col justify-center items-center">
        <Icon className="text-purple-300 text-3xl md:text-4xl mb-1" />
        <span className="text-white text-md font-bold font-LinearSans">{percentage}%</span>
      </div>

      <span className="absolute bottom-2 text-sm bg-black/70 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all font-LinearSans">
        {label}
      </span>
    </motion.div>
  );
};

const Skills = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        setMousePosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
      }
    };

    const handleTouchEnd = () => {
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const getParallaxStyle = (factor) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (mousePosition.x - centerX) * factor;
    const moveY = (mousePosition.y - centerY) * factor;
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
    };
  };

  const parallaxTexts = [
    { text: 'Lens', factor: 0.015, position: 'top-[8%] left-[10%]' },
    { text: 'Frame', factor: 0.02, position: 'top-[30%] right-[15%]' },
    { text: 'Exposure', factor: 0.01, position: 'bottom-[20%] left-[5%]' },
    { text: 'Composition', factor: 0.025, position: 'top-[75%] right-[30%]' },
    { text: 'Director', factor: 0.018, position: 'bottom-[10%] left-[40%]' },
    { text: 'Camera', factor: 0.022, position: 'top-[5%] left-[70%]' },
    { text: 'Light', factor: 0.008, position: 'bottom-[65%] right-[5%]' },
    { text: 'Sound', factor: 0.015, position: 'top-[40%] left-[5%]' },
    { text: 'Scene', factor: 0.01, position: 'bottom-[55%] right-[25%]' },
    { text: 'Focus', factor: 0.023, position: 'top-[15%] left-[80%]' },
    { text: 'Angle', factor: 0.012, position: 'bottom-[70%] left-[15%]' },
    { text: 'Cut', factor: 0.017, position: 'top-[85%] right-[45%]' },
    { text: 'Action', factor: 0.02, position: 'bottom-[5%] left-[90%]' },
    { text: 'Color', factor: 0.019, position: 'top-[60%] right-[5%]' },
    { text: 'Story', factor: 0.016, position: 'bottom-[35%] left-[50%]' },
    { text: 'VFX', factor: 0.021, position: 'top-[50%] left-[5%]' },
    { text: 'Render', factor: 0.014, position: 'bottom-[45%] right-[5%]' },
    { text: 'Grading', factor: 0.02, position: 'top-[70%] left-[80%]' },
    { text: 'Shot', factor: 0.017, position: 'bottom-[50%] left-[25%]' },
    { text: 'Edit', factor: 0.022, position: 'top-[25%] left-[30%]' },
    { text: 'Sequence', factor: 0.013, position: 'bottom-[10%] right-[15%]' },
    { text: 'Post', factor: 0.024, position: 'top-[60%] left-[60%]' },
    { text: 'Pre-production', factor: 0.009, position: 'bottom-[80%] left-[70%]' },
    { text: 'Production', factor: 0.018, position: 'top-[10%] right-[40%]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-4 sm:px-6 py-16 text-white overflow-hidden font-Mightail relative">

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] font-Mightail">
        {parallaxTexts.map((item, i) => (
            <div
              key={`${item.text}-${i}`}
              className={`absolute ${item.position} text-lg sm:text-xl md:text-3xl lg:text-4xl text-purple-500 transform rotate-${Math.floor(Math.random() * 360)}`}
              style={getParallaxStyle(item.factor)}
            >
              {item.text}
            </div>
        ))}
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        Skills
      </motion.h1>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {skillCategories.map((categoryData, catIndex) => (
          <div key={catIndex}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-200 mb-8 mt-10"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.3, duration: 0.8 }}
            >
              {categoryData.category}
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categoryData.skills.map((skill, skillIndex) => (
                <SkillSymbol
                  key={skillIndex}
                  Icon={skill.icon}
                  label={skill.name}
                  percentage={skill.percentage}
                  index={skillIndex}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;