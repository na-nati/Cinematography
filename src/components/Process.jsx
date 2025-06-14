import React from 'react';
import { motion } from 'framer-motion';
// Import Lucide icons that fit your process steps
import { MessageSquare, Lightbulb, Camera, Film, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    icon: MessageSquare, // Initial Consultation / Communication
    title: 'Initial Consultation & Concept',
    description: 'We begin by deeply understanding your vision, project goals, and target audience. This phase involves thorough discussion, brainstorming, and concept development to lay the creative foundation.',
  },
  {
    icon: Lightbulb, // Planning / Pre-Production
    title: 'Pre-Production & Planning',
    description: 'Based on our shared vision, I develop a detailed plan including storyboarding, shot lists, location scouting, equipment selection, and crew coordination, ensuring every detail is meticulously prepared.',
  },
  {
    icon: Camera, // Filming / Production
    title: 'Production & Filming',
    description: 'This is where the magic happens. On set, I meticulously execute the plan, focusing on lighting, composition, and capturing high-quality cinematic footage, always adapting to creative opportunities.',
  },
  {
    icon: Film, // Post-Production & Review
    title: 'Post-Production & Refinement',
    description: 'Working with skilled editors and colorists, I oversee the post-production process. You\'ll receive drafts for review, ensuring the final edit, color grade, and sound design align perfectly with our vision.',
  },
  {
    icon: CheckCircle, // Final Delivery
    title: 'Final Delivery & Support',
    description: 'Your polished, high-resolution film is delivered in your preferred formats, ready for its intended platform. I ensure you are fully satisfied with the outcome and offer post-delivery support.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-purple-400 mb-6 font-Mightail">My Workflow</h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-LinearSans text-lg">
            A structured approach ensures clarity, efficiency, and exceptional results. Here's how we bring your vision to life, step by step.
          </p>
          <div className="w-24 h-1 bg-purple-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Step Number Circle */}
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-gray-900">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-4 text-purple-400">
                <step.icon className="w-16 h-16 mx-auto md:mx-0" /> {/* Use the imported icon component */}
              </div>

              <h3 className="text-3xl font-bold text-white mb-3 font-Mightail">{step.title}</h3>
              <p className="text-gray-300 font-LinearSans">{step.description}</p>

              {/* Optional: Line connecting steps for visual flow (more complex for grid) */}
              {/* This is a simplified approach, a true connecting line would require SVG or absolute positioning with more logic */}
              {index < processSteps.length - 1 && (
                <div className="absolute hidden md:block w-px bg-purple-500 h-full left-1/2 transform -translate-x-1/2 top-0 z-0 opacity-20"></div>
              )}
            </motion.div>
          ))}
           {/* Decorative lines for grid layout - more visually appealing than single line */}
           <div className="absolute hidden lg:block inset-y-0 left-1/3 w-px bg-purple-500 opacity-20"></div>
           <div className="absolute hidden lg:block inset-y-0 left-2/3 w-px bg-purple-500 opacity-20"></div>
           <div className="absolute hidden md:block inset-x-0 top-1/2 h-px bg-purple-500 opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Process;