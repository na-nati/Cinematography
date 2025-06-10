
import React from 'react';
import { motion } from "framer-motion";
import { Camera } from "lucide-react";


import { Card, CardContent } from "../Ui/card"; 

const Service = () => {
  const servicesData = [
    {
      title: "Wedding Cinematography",
      description: "Capture your special day with cinematic elegance and emotional storytelling.",
      price: "Starting at $2,500",
    },
    {
      title: "Commercial Films",
      description: "Professional brand videos and commercials that engage and convert.",
      price: "Starting at $5,000",
    },
    {
      title: "Documentary Production",
      description: "Tell compelling real-world stories with authentic visual narratives.",
      price: "Starting at $3,500",
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
              whileHover={{ y: -10 }}
            >
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardContent className="p-8 text-center">
                  <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4 font-Mightail">{service.title}</h3>
                  <p className="text-gray-300 mb-6 font-LinearSans">{service.description}</p>
                  <div className="text-purple-400 font-semibold text-lg font-Mightail">{service.price}</div>
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