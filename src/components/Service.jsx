import React from "react";
import { motion } from "framer-motion";
import { Film, Briefcase, Newspaper, Camera, Edit, Lightbulb, TrendingUp } from "lucide-react"; // More specific icons

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
      type: "Film Production",
      title: "Narrative & Commercial Films",
      description: "Crafting compelling visual stories for a diverse range of cinematic projects.",
      detailedDescription: "From short films and feature-length narratives to impactful commercials and brand anthems, I specialize in bringing scripts to life with dynamic cinematography. My process includes concept development, meticulous shot planning, and on-set execution.",
      specialties: ["Short Films", "Feature Films", "Brand Commercials", "Music Videos"],
      price: "Custom Quote", // Often for complex projects, a custom quote is more appropriate
      icon: Film,
    },
    {
      type: "Documentary & Event Coverage",
      title: "Authentic Storytelling",
      description: "Capturing real-world events and compelling documentaries with a sensitive, observational eye.",
      detailedDescription: "My approach to documentaries focuses on unobtrusive yet powerful visual narratives that highlight authenticity. For events, I blend into the environment to capture candid moments, delivering a comprehensive and emotionally resonant final product.",
      specialties: ["Documentaries", "Corporate Events", "Conferences", "Live Performances"],
      price: "Custom Quote",
      icon: Newspaper, // Or use a document icon
    },
    {
      type: "Visual Development & Consultation",
      title: "Pre-Production & On-Set Expertise",
      description: "Offering comprehensive consultation and hands-on support from concept to execution.",
      detailedDescription: "My services extend beyond just shooting. I provide in-depth pre-production consultation, helping to visualize your script, develop look books, and plan complex shots. On set, I lead the camera and lighting departments, ensuring a smooth and efficient production.",
      specialties: ["Pre-Production Planning", "Look Development", "Lighting Design", "Crew Management"],
      price: "By Project/Day", // Pricing structure might change for consultation
      icon: Lightbulb, // Or a gear icon like Settings
    },
    {
      type: "Post-Production Oversight",
      title: "Color Grading & Visual Finishing",
      description: "Ensuring your project achieves its intended visual aesthetic in post-production.",
      detailedDescription: "While my primary focus is cinematography, I offer valuable oversight during the post-production phase, particularly in color grading. I work closely with colorists to maintain the visual integrity and stylistic intent established during principal photography, ensuring a polished final look.",
      specialties: ["Color Grading Supervision", "Visual Effects Consulting", "Final Output Delivery"],
      price: "By Project",
      icon: Edit, // Or a palette/brush icon
    },
  ];

  return (
    <section id="service" className="py-20 bg-black text-white"> {/* Ensure text is white for dark background */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-6 font-Mightail">My Services</h2> {/* Updated title */}
          <p className="text-gray-300 max-w-2xl mx-auto font-LinearSans text-lg">
            I offer a comprehensive range of cinematography services, tailored to bring your unique story to vibrant life on screen.
          </p>
          <div className="w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Adjusted grid for more services */}
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }} // Adjusted delay
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} // Enhanced hover effect
            >
              <Card className="bg-gray-800 border-gray-700 h-full overflow-hidden relative rounded-lg shadow-xl
                               hover:border-purple-500 transition-all duration-300">
                <CardContent className="p-8 text-left relative z-10 flex flex-col h-full"> {/* text-left and flex-col for better structure */}
                  {/* Subtle background icon - now using the specific service icon for better context */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 scale-110"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.2 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                  >
                    <service.icon className="w-40 h-40 text-purple-600" /> {/* Large, faded icon */}
                  </motion.div>

                  {/* Render the specific icon for each service */}
                  <service.icon className="w-12 h-12 text-purple-400 mb-4 relative z-10" />
                  <h4 className="text-lg text-purple-300 font-bold mb-2 relative z-10">{service.type}</h4> {/* New type heading */}
                  <h3 className="text-3xl font-bold text-white mb-3 font-Mightail relative z-10">{service.title}</h3>
                  <p className="text-gray-300 mb-4 font-LinearSans text-base relative z-10 flex-grow">{service.description}</p> {/* flex-grow to push price down */}

                  {/* Detailed Description (initially hidden, could be part of modal) */}
                  {/* <p className="text-gray-400 text-sm mb-4 italic">{service.detailedDescription}</p> */}

                  <div className="mb-4 relative z-10">
                    <h5 className="font-semibold text-purple-300 text-sm mb-1">Specialties:</h5>
                    <ul className="list-disc list-inside text-gray-400 text-sm">
                      {service.specialties.map((spec, sIdx) => (
                        <li key={sIdx}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-purple-400 font-semibold text-lg font-Mightail mb-6 relative z-10">{service.price}</div>

                  {/* "Learn More" Button */}
                  <button
                    onClick={() => handleLearnMore(service.title)}
                    className="mt-auto px-6 py-2 bg-purple-600 text-white rounded-full font-semibold
                               hover:bg-purple-700 transition-colors duration-300 relative z-10 self-start"
                  >
                    Learn More
                  </button>
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