import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react'; // Import Star icon for ratings

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: "Absolutely phenomenal work! Bernabas brought our vision to life beautifully.",
      name: "Samuel G.",
      title: "CEO, Innovate Solutions",
      rating: 5, // Rating out of 5
    },
    {
      quote: "Beyond impressed with the creativity and professionalism. The results speak for themselves.",
      name: "Lydia M.",
      title: "Musician",
      rating: 5,
    },
    {
      quote: "Captured the true essence of our story. A master of visual narrative.",
      name: "Dawit A.",
      title: "Documentary Filmmaker",
      rating: 4,
    },
    
   
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          // Fill star if its index is less than the rating
          className={`h-5 w-5 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
          }`}
        />
      );
    }
    return <div className="flex justify-center md:justify-start mb-3">{stars}</div>;
  };

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="testimonials" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-6 font-Mightail">What Clients Say</h2> {/* Simpler title */}
          <p className="text-gray-300 max-w-2xl mx-auto font-LinearSans text-lg">
            Trusted by top brands and creative professionals to deliver exceptional visuals.
          </p>
          <div className="w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700
                         flex flex-col h-full justify-between items-center md:items-start text-center md:text-left
                         hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
            >
              {renderStars(testimonial.rating)} {/* Render stars at the top */}

              <p className="text-lg italic text-gray-300 font-LinearSans leading-relaxed relative z-10 mb-4 flex-grow">
                "{testimonial.quote}"
              </p>

              <div className="mt-auto pt-4 border-t border-gray-700 w-full">
                <h3 className="text-xl font-semibold text-purple-400 font-Mightail">{testimonial.name}</h3>
                <p className="text-gray-400 text-sm">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;