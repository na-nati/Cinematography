import React from "react";
import { motion } from "framer-motion";
import { Film, Briefcase, Newspaper } from "lucide-react"; // Import specific icons for each service


import { Card, CardContent } from "../Ui/card";

const Service = () => {
  const servicesData = [
    {
      title: "Wedding Cinematography",
      description: "Capture your special day with cinematic elegance and emotional storytelling.",
      price: "Starting at $2,500",
      icon: Film, // Assigned specific icon
    },
    {
      title: "Commercial Films",
      description: "Professional brand videos and commercials that engage and convert.",
      price: "Starting at $5,000",
      icon: Briefcase, // Assigned specific icon
    }, // Corrected: Added missing closing brace here
    {
      title: "Documentary Production",
      description: "Tell compelling real-world stories with authentic visual narratives.",
      price: "Starting at $3,500",
      icon: Newspaper, // Assigned specific icon
    },
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-6 font-Mightail">Services</h2>
          <div className="w-24 h-1 bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }} // Already provides a lift effect on hover
            >
              <Card className="bg-gray-800 border-gray-700 h-full overflow-hidden relative
                               hover:border-purple-400 transition-all duration-300"> {/* Added hover border and transition */}
                <CardContent className="p-8 text-center relative z-10"> {/* Ensure content is above background icon */}
                  {/* Subtle background icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-12"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <Film className="w-48 h-48 text-purple-600" /> {/* Large, faded icon */}
                  </motion.div>

                  {/* Render the specific icon for each service */}
                  <service.icon className="w-12 h-12 text-purple-400 mx-auto mb-4 relative z-10" />
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-Mightail relative z-10">{service.title}</h3> {/* Increased font size */}
                  <p className="text-gray-300 mb-6 font-LinearSans relative z-10">{service.description}</p>
                  <div className="text-purple-400 font-semibold text-lg font-Mightail relative z-10">{service.price}</div>
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
