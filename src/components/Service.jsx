import React from "react";
import { motion } from "framer-motion";
import { Film, Camera, PenTool, PlayCircle, Rss, Image, LayoutGrid, Layers, Monitor } from "lucide-react"; // Added more relevant icons for new categories

import { Card, CardContent } from "../Ui/card"; // Assuming your Card and CardContent components

const Service = () => {
  // Placeholder for "Learn More" functionality
  const handleLearnMore = (serviceTitle) => {
    alert(`You clicked "Learn More" for ${serviceTitle}. Implement modal or navigation here!`);
    // Example: You could open a modal here, or navigate to a new route:
    // navigate(`/services/${serviceTitle.toLowerCase().replace(/\s/g, '-')}`);
  };

  const servicesData = [
    {
      type: "Videography",
      title: "Cinematic Video Production",
      description: "From concept to final cut, creating stunning videos for any purpose.",
      detailedDescription: "Specializing in high-quality video production for commercials, corporate events, documentaries, music videos, and more. My services cover everything from pre-production planning and on-set shooting to post-production editing and color grading, ensuring a polished and engaging final product.",
      specialties: ["Commercials", "Documentaries", "Event Coverage", "Music Videos", "Short Films"],
      price: "Custom Quote",
      icon: Film, // Film icon for general video
    },
    {
      type: "Photography",
      title: "Professional Photo Shoots",
      description: "Capturing captivating images with an artistic eye and technical precision.",
      detailedDescription: "Offering comprehensive photography services including portraits, product photography, event coverage, architectural photography, and lifestyle shoots. My focus is on delivering high-resolution images that tell a story and meet your specific visual needs.",
      specialties: ["Portraits", "Product Photography", "Events", "Corporate Headshots", "Architecture"],// Example pricing, adjust as needed
      icon: Camera, // Camera icon for photography
    },
    {
      type: "Logo Design",
      title: "Unique Brand Identity",
      description: "Crafting distinctive logos that visually represent your brand's essence.",
      detailedDescription: "Designing original and memorable logos that stand out and communicate your brand's values. My process involves understanding your vision, market research, concept development, and iterative refinement to deliver a logo that truly reflects your identity.",
      specialties: ["Brand Marks", "Wordmarks", "Logotypes", "Emblems", "Rebranding"],
      icon: PenTool, // PenTool or Layers for design
    },
    {
      type: "Logo Animation",
      title: "Dynamic Logo Reveal",
      description: "Bringing your static logo to life with engaging animations.",
      detailedDescription: "Transforming your static logo into a dynamic animation that enhances your brand's digital presence. Perfect for intros, outros, social media content, and presentations, adding a professional and modern touch to your visuals.",
      specialties: ["Intro/Outro Animations", "Explainer Video Integration", "Social Media Stings", "Web Animations"],
      icon: PlayCircle, // PlayCircle for animation
    },
    {
      type: "Content Creation",
      title: "Engaging Digital Narratives",
      description: "Developing captivating content strategies and multimedia assets for digital platforms.",
      detailedDescription: "Beyond just video and photo, I help develop full-fledged content strategies for your digital channels. This includes scriptwriting, storyboard creation, asset production (video, photo, graphics), and tailoring content to specific platform requirements to maximize engagement.",
      specialties: ["Scriptwriting", "Storyboarding", "Multimedia Asset Production", "Digital Campaign Content"],
      price: "Custom Project",
      icon: Rss, // Rss or Monitor for content creation
    },
    {
      type: "Social Media Post Design",
      title: "Visually Stunning Social Graphics",
      description: "Designing eye-catching graphics tailored for various social media platforms.",
      detailedDescription: "Creating custom, platform-optimized social media posts that boost engagement and brand visibility. This includes static graphics, animated posts, stories, and carousels designed to capture attention and convey your message effectively on platforms like Instagram, Facebook, LinkedIn, and TikTok.",
      specialties: ["Instagram Posts/Stories", "Facebook Ads/Content", "LinkedIn Graphics", "TikTok Visuals"],
      price: "By Pack/Post",
      icon: Image, // Image or LayoutGrid for social media posts
    },
  ];

  return (
    <section id="service" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-6 font-Mightail">My Services</h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-LinearSans text-lg">
            I offer a comprehensive range of creative services, tailored to bring your unique vision to vibrant life on screen and across digital platforms.
          </p>
          <div className="w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Adjusted grid for 3 columns on large screens for the 6 services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}
            >
              <Card className="bg-gray-800 border-gray-700 h-full overflow-hidden relative rounded-lg shadow-xl
                             hover:border-purple-500 transition-all duration-300">
                <CardContent className="p-8 text-left relative z-10 flex flex-col h-full">
                  {/* Subtle background icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 scale-110"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.2 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                  >
                    <service.icon className="w-40 h-40 text-purple-600" />
                  </motion.div>

                  {/* Render the specific icon for each service */}
                  <service.icon className="w-12 h-12 text-purple-400 mb-4 relative z-10" />
                  <h4 className="text-lg text-purple-300 font-bold mb-2 relative z-10">{service.type}</h4>
                  <h3 className="text-3xl font-bold text-white mb-3 font-Mightail relative z-10">{service.title}</h3>
                  <p className="text-gray-300 mb-4 font-LinearSans text-base relative z-10 flex-grow">{service.description}</p>

                  <div className="mb-4 relative z-10">
                    <h5 className="font-semibold text-purple-300 text-sm mb-1">Specialties:</h5>
                    <ul className="list-disc list-inside text-gray-400 text-sm">
                      {service.specialties.map((spec, sIdx) => (
                        <li key={sIdx}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-purple-400 font-semibold text-lg font-Mightail mb-6 relative z-10">{service.price}</div>

              
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;