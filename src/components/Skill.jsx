import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFilm,
  FaSoundcloud,
  FaCameraRetro,
  FaRegLightbulb,
  FaApple,
} from 'react-icons/fa';
import {
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
} from 'react-icons/si';


const skillIcons = [
  { name: "Premiere Pro", icon: SiAdobepremierepro },
  { name: "After Effects", icon: SiAdobeaftereffects },
  { name: "Photoshop", icon: SiAdobephotoshop },
  { name: "Final Cut Pro", icon: FaApple },
  { name: "Cinematography", icon: FaFilm },
  { name: "Camera Work", icon: FaCameraRetro },
  { name: "Sound Design", icon: FaSoundcloud },
  { name: "Creative Direction", icon: FaRegLightbulb },
];


const rainVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 1,
      ease: 'easeOut'
    }
  })
};

const SkillSymbol = ({ Icon, label, index }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={rainVariant}
    className="relative group p-6 bg-purple-900/20 border border-purple-600 rounded-xl flex justify-center items-center hover:scale-110 transition-all duration-300"
  >
    <Icon className="text-purple-300 text-4xl md:text-5xl" />
    <span className="absolute bottom-2 text-sm bg-black/70 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">
      {label}
    </span>
  </motion.div>
);

const Skills = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-6 py-16 text-white overflow-hidden font-Mightail">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Skills
      </motion.h1>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {skillIcons.map(({ name, icon: Icon }, index) => (
          <SkillSymbol key={index} Icon={Icon} label={name} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
