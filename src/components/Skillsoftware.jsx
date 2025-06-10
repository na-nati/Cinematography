import React from 'react';

const skills = [
  { name: 'Lighting & Exposure', level: '95%', icon: '💡' }, // Use actual icons or SVG components
  { name: 'Camera Operation (ARRI, RED, Sony)', level: '90%', icon: '🎥' },
  { name: 'Composition & Framing', level: '92%', icon: '🖼️' },
  { name: 'Color Grading & Theory', level: '88%', icon: '🎨' },
  { name: 'On-set VFX Supervision', level: '75%', icon: '✨' },
  { name: 'Team Leadership & Collaboration', level: '90%', icon: '🤝' },
  { name: 'Drone Cinematography', level: '80%', icon: '✈️' },
  { name: 'Underwater Cinematography', level: '65%', icon: ' dive' },
];

const software = [
  { name: 'DaVinci Resolve', logo: '/assets/davinci-resolve.png' }, // Replace with actual paths
  { name: 'Adobe Premiere Pro', logo: '/assets/premiere-pro.png' },
  { name: 'Frame.io', logo: '/assets/frameio.png' },
  { name: 'Shotdeck', logo: '/assets/shotdeck.png' },
  { name: 'Celtx', logo: '/assets/celtx.png' },
  { name: 'Silverstack', logo: '/assets/silverstack.png' },
];

const SkillSoftware = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-display text-white text-center mb-12 animate-slideUp">
        The Cinematographer's Arsenal
      </h2>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Skills Section */}
        <div className="lg:w-1/2 animate-fadeIn delay-300">
          <h3 className="text-3xl font-display text-accent-gold mb-8 text-center lg:text-left">
            Core Skills
          </h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="flex flex-col items-center lg:items-start">
                <div className="flex items-center w-full justify-between mb-2">
                  <p className="text-lg text-cinematic-light-gray flex items-center">
                    <span className="mr-2 text-2xl">{skill.icon}</span> {skill.name}
                  </p>
                  <span className="text-accent-gold font-bold">{skill.level}</span>
                </div>
                <div className="w-full bg-cinematic-dark rounded-full h-2">
                  <div
                    className="bg-accent-gold h-2 rounded-full animate-fillBar"
                    style={{ '--skill-width': skill.level }} // Custom property for animation
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Section */}
        <div className="lg:w-1/2 animate-fadeIn delay-500">
          <h3 className="text-3xl font-display text-accent-gold mb-8 text-center lg:text-left">
            Tools of the Trade
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {software.map((s, index) => (
              <div key={s.name} className="flex flex-col items-center text-center group">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="w-24 h-24 object-contain mb-2 transform transition-transform duration-300 group-hover:scale-110"
                />
                <p className="text-md text-cinematic-light-gray group-hover:text-white transition-colors duration-300">
                  {s.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSoftware;