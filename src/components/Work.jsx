import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import ReactPlayer from "react-player";

// IMPORTANT: No longer importing local video assets
// Delete the actual .mp4 files from your src/assets folder after this step.

const videos = [
  "https://vimeo.com/1092080900/e3b4de5129?share=copy", // Your first video
  "https://vimeo.com/1092081999/e97da79b8b?share=copy", // Your second video
  "https://vimeo.com/1092081163/402f6632f7?share=copy", // Your third video
  "https://vimeo.com/1092080665/477e7b71d4?share=copy", // Your fourth video
];

const Work = () => {
  const [current, setCurrent] = useState(0);
  const [mutedStates, setMutedStates] = useState(
    Array(videos.length).fill(true) // All videos start muted
  );

  // Use functional updates for setCurrent to ensure latest state is used in useEffect
  const next = () => setCurrent((prev) => (prev + 1) % videos.length);
  const prev = () => setCurrent((prev) => (prev - 1 + videos.length) % videos.length);

  // Toggle the mute state for a specific video using the map approach
  const toggleMute = (index) => {
    setMutedStates((prev) =>
      prev.map((muted, i) => (i === index ? !muted : muted))
    );
  };

  const getVisible = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (current + i + videos.length) % videos.length;
      result.push({ video: videos[index], position: i, index });
    }
    return result;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Use the 'next' and 'prev' functions directly, which now handle state updates functionally
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // Empty dependency array: runs once on mount, cleans up on unmount

  return (
    <div className="relative bg-black text-white h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-26 text-purple-400 mt-10 font-Mightail">My Works</h1>

      <div className="relative w-full h-[80vh] flex items-center justify-center">
        <button
          onClick={prev}
          className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 p-3 rounded-full"
        >
          <FaChevronLeft size={28} />
        </button>

        <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
          <AnimatePresence initial={false} custom={current}>
            {getVisible().map(({ video, position, index }) => {
              const isCenter = position === 0;
              const scale = isCenter ? 1 : 0.8;
              const opacity = isCenter ? 1 : 0.3;
              const translateX = position * 360;
              const zIndex = 5 - Math.abs(position);

              return (
                <motion.div
                  key={`${video}-${current}`}
                  className="absolute"
                  style={{ zIndex }}
                  animate={{ x: translateX, scale, opacity }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    x: position < 0 ? -400 : 400,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div // This div now only handles sizing and styling
                    className="relative overflow-hidden rounded-2xl transition-all duration-300 flex flex-col items-center group"
                    style={{
                      width: isCenter ? "100vw" : "50vw",
                      height: isCenter ? "100vh" : "70vh",
                    }}
                  >
                    <ReactPlayer
                      url={video}
                      playing={isCenter}
                      loop
                      muted={mutedStates[index]}
                      controls={false}
                      width="100%"
                      height="100%"
                      config={{
                        vimeo: {
                          playerOptions: {
                            dnt: true,
                            byline: false,
                            portrait: false,
                            title: false,
                          }
                        }
                      }}
                    />
                    {/* THIS IS THE CLICKABLE ELEMENT FOR MUTE/UNMUTE */}
                    <div
                      onClick={() => toggleMute(index)} // <-- onClick moved here!
                      className={`
                        absolute z-20 bg-black/50 text-white rounded-full
                        flex items-center justify-center cursor-pointer // Added cursor-pointer for visual feedback
                        transition-opacity duration-300
                        ${isCenter
                          ? 'bottom-5 right-5 p-3' // Consistent position for center video
                          : 'top-3 right-3 p-2 opacity-0 group-hover:opacity-100' // Hidden for side videos, appears on hover
                        }
                      `}
                    >
                      {mutedStates[index]
                        ? <FaVolumeMute size={isCenter ? 20 : 16} />
                        : <FaVolumeUp size={isCenter ? 20 : 16} />
                      }
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 p-3 rounded-full"
        >
          <FaChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Work;