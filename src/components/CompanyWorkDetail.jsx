import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Re-import your videos data (ensure this path is correct)
const videos = [
  {
    url: "https://vimeo.com/1092080900/e3b4de5129?share=copy",
    title: "Orbit",
    description:
      "A dynamic visual narrative showcasing our recent client collaboration, exploring intricate patterns and fluid movements to represent innovation.",
  },
  {
    url: "https://vimeo.com/1092081999/e97da97b8b?share=copy",
    title: "Furniture Showcase",
    description:
      "An elegant presentation of bespoke furniture designs, highlighting craftsmanship, material quality, and contemporary aesthetics in various settings.",
  },
  {
    url: "https://vimeo.com/1092081163/402f6632f7?share=copy",
    title: "Chocolate Craft",
    description:
      "Behind the scenes of artisanal chocolate making, from bean selection to final packaging, emphasizing the passion and precision involved.",
  },
  {
    url: "https://vimeo.com/1092080665/477e7b71d4?share=copy",
    title: "Nature's Resilience",
    description:
      "Capturing the enduring beauty of landscapes and the perseverance of life, featuring breathtaking views and compelling natural phenomena.",
  },
];

// Re-import your companies data (ensure this path is correct and updated as above)
const companies = [
  {
    id: "companyA",
    name: "QRS Furniture",
    videoIndices: [1, 0, 2, 3], // Example: Links to "Furniture Showcase" and "Orbit"
  },
  {
    id: "companyB",
    name: "Habtam Bet",
    videoIndices: [2, 0], // Example: Links to "Chocolate Craft and Orbit"
  },
  {
    id: "companyC",
    name: "Four Winds",
    videoIndices: [3, 1], // Example: Links to "Nature's Resilience" and "Furniture Showcase"
  },
  {
    id: "companyD",
    name: "Ewawa Hair",
    videoIndices: [0, 2], // Example: Links to "Orbit" and "Chocolate Craft"
  },
  {
    id: "companyE",
    name: "Sheqela",
    videoIndices: [1, 3], // Example: Links to "Furniture Showcase" and "Nature's Resilience"
  },
  {
    id: "companyF",
    name: "Orbit",
    videoIndices: [0, 1], // Example: Links to "Orbit" and "Furniture Showcase"
  },
];

const CompanyWorkDetail = () => {
  const { companyId } = useParams(); // Get the companyId from the URL
  const navigate = useNavigate();

  const company = companies.find((c) => c.id === companyId);

  // State to manage mute status for each video, keyed by video index
  const [mutedStates, setMutedStates] = useState({});
  // State to show volume icon for each video
  const [showVolumeIcons, setShowVolumeIcons] = useState({});

  useEffect(() => {
    // Initialize all videos as muted when the component mounts or company changes
    // Videos are muted by default to allow autoplay based on browser policies
    if (company && company.videoIndices) {
      const initialMutedStates = {};
      company.videoIndices.forEach((index) => {
        initialMutedStates[index] = true; // Initialize all videos as muted for autoplay
      });
      setMutedStates(initialMutedStates);
      setShowVolumeIcons({}); // Clear any previous icon states
    }
  }, [companyId, company]); // Depend on companyId and company data

  const toggleMute = (videoIndex) => {
    setMutedStates((prev) => ({
      ...prev,
      [videoIndex]: !prev[videoIndex],
    }));
    setShowVolumeIcons((prev) => ({
      ...prev,
      [videoIndex]: true,
    }));
    setTimeout(() => {
      setShowVolumeIcons((prev) => ({
        ...prev,
        [videoIndex]: false,
      }));
    }, 1000);
  };

  if (!company || !company.videoIndices || company.videoIndices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Work Not Found</h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          The requested company's work or videos could not be found.
        </p>
        <button
          onClick={() => navigate('/works')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
        >
          ← Back to All Works
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white w-full min-h-screen flex flex-col items-center py-16 px-0">
      {/* Back Button at Top Left */}
      <button
        onClick={() => navigate('/works')}
        className="absolute top-6 left-6 z-40 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
      >
        ← Back to All Works
      </button>

      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-purple-400 font-Mightail text-center px-4">
        {company.name}'s Work
      </h1>

      {/* Container for multiple video players */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full mx-auto mb-8 px-1 sm:px-6 md:px-2 lg:px-2 xl:px-6">
        {company.videoIndices.map((videoIndex, idx) => {
          const video = videos[videoIndex];
          if (!video) return null; // Skip if video index is invalid

          const isMuted = mutedStates[videoIndex] ?? true; // Default to true if not set
          const showIcon = showVolumeIcons[videoIndex] ?? false; // Default to false

          return (
            <motion.div
              key={`${companyId}-video-${videoIndex}-${idx}`} // Unique key for each video block
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              // Using aspect-[3/4] for slightly less tall portrait videos
              className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border-1 border-purple-500 shadow-lg"
            >
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => toggleMute(videoIndex)}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  toggleMute(videoIndex);
                }}
                style={{ cursor: 'pointer' }}
              ></div>

              <ReactPlayer
                url={video.url}
                playing={true} // Autoplay enabled for all videos (will start muted)
                loop
                volume={isMuted ? 0 : 1} // Volume controlled by state, defaults to muted
                controls={false} // Removed default controls (including 3 dots play/pause icon)
                width="100%"
                height="100%" // Ensure ReactPlayer takes full height of its parent
                config={{
                  vimeo: {
                    playerOptions: { dnt: true, byline: false, portrait: false, title: false }
                  }
                }}
              />

              {/* Mute/Unmute Icon Overlay */}
              <AnimatePresence>
                {showIcon && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-20 bg-black/60 text-white rounded-full flex items-center justify-center p-3 sm:p-4 bottom-4 right-4 sm:bottom-6 sm:right-6"
                  >
                    {isMuted ? <FaVolumeMute size={22} /> : <FaVolumeUp size={22} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Back Button at the very bottom */}
      <div className="mt-12"> {/* Add margin-top for spacing */}
        <button
          onClick={() => navigate('/works')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
        >
          ← Back to All Works
        </button>
      </div>
    </div>
  );
};

export default CompanyWorkDetail;