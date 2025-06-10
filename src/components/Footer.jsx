import React from 'react';
import { FaTelegram, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="max-w-screen-lg mx-auto flex justify-center space-x-6">
        {/* Social Media Icons */}
       
        <a href="https://t.me/@Akilesss" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 text-2xl">
          <FaTelegram />
        </a>
        <a href="https://www.instagram.com/berni_tegegn" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 text-2xl">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 text-2xl">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Footer;
