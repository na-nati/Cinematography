import React, { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import about from "../assets/about.jpg";
import { BackgroundCircles } from './desgn/BackgroundCircle';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
    Camera,
    Video,
    PlayCircle,
    Film,
    Clapperboard,
    MonitorPlay,
    Tv2,
    Cast,
    Clock,
    User2,
} from 'lucide-react';

const backgroundVideoIcons = [
    { id: 1, Icon: Video, left: '2%', top: '5%', customSize: 100, animX: 15, animY: 20, duration: 9, delay: 0 },
    { id: 2, Icon: Tv2, left: '14%', top: '22%', customSize: 80, animX: -15, animY: -15, duration: 10, delay: 1 },
    { id: 3, Icon: Film, left: '85%', top: '15%', customSize: 80, animX: 15, animY: -10, duration: 12, delay: 2 },
    { id: 4, Icon: Clapperboard, left: '78%', top: '32%', customSize: 50, animX: -10, animY: 10, duration: 10, delay: 3 },
    { id: 5, Icon: PlayCircle, left: '7%', top: '75%', customSize: 80, animX: 10, animY: -20, duration: 11, delay: 4 },
    { id: 6, Icon: MonitorPlay, left: '20%', top: '85%', customSize: 100, animX: -15, animY: 15, duration: 12, delay: 5 },
    { id: 7, Icon: Camera, left: '85%', top: '70%', customSize: 80, animX: -10, animY: -15, duration: 13, delay: 6 },
    { id: 8, Icon: Cast, left: '90%', top: '85%', customSize: 100, animX: 10, animY: 10, duration: 14, delay: 7 },
];

const About = () => {
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const backgroundCirclesRef = useRef(null);

    const [hasAnimated, setHasAnimated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const count = useMotionValue(0);
    const roundedCount = useTransform(count, Math.round);
    const [clientCount, setClientCount] = useState(0);

    useEffect(() => {
        const unsubscribe = roundedCount.on("change", (latest) => {
            setClientCount(latest);
        });
        return () => unsubscribe();
    }, [roundedCount]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Assuming 768px is the mobile breakpoint
        };
        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    // Animate client count only for desktop, set instantly for mobile
                    if (isMobile) {
                        count.set(100); 
                    } else {
                        animate(count, 100, { duration: 2, ease: "easeOut" });
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, [hasAnimated, count, isMobile]); // Added isMobile to dependencies

    const contentVariants = {
        image: {
            initial: isMobile ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 },
            animate: isMobile ? { x: 0, opacity: 1 } : (hasAnimated ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }),
            transition: isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }
        },
        text: {
            initial: isMobile ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 },
            animate: isMobile ? { x: 0, opacity: 1 } : (hasAnimated ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }),
            transition: isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeOut", delay: 0.1 }
        },
        title: {
            initial: isMobile ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 },
            animate: isMobile ? { y: 0, opacity: 1 } : (hasAnimated ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }),
            transition: isMobile ? { duration: 0 } : { duration: 1 }
        },
    };

    return (
        <Element name="about">
            <div className="relative min-h-screen flex flex-col items-center justify-start gap-10 text-white bg-black p-6 sm:p-10 pt-20 md:pt-10 overflow-hidden">

                {/* Background Circles Animation */}
                <motion.div
                    ref={backgroundCirclesRef}
                    className="absolute inset-0"
                    style={{ zIndex: -1 }}
                    initial={{ opacity: 0 }}
                    // Instant opacity for mobile, animated for desktop
                    animate={{ opacity: hasAnimated ? 1 : 0 }}
                    transition={{ duration: isMobile ? 0 : 1.5, ease: "easeOut" }}
                >
                    <BackgroundCircles />
                </motion.div>

                {/* Background Video Icons Animation */}
                {backgroundVideoIcons.map((item) => (
                    <motion.div
                        key={item.id}
                        className="absolute text-purple-400"
                        style={{ left: item.left, top: item.top, zIndex: 0 }}
                        initial={{ opacity: 0 }}
                        animate={
                            isMobile
                                ? { opacity: 0.1, x: 0, y: 0, scale: 1, rotate: 0 } // Fixed & subtle for mobile
                                : {
                                      opacity: [0.2, 0.6, 0.2],
                                      x: [0, item.animX, 0],
                                      y: [0, item.animY, 0],
                                      scale: [0.9, 1, 0.9],
                                      rotate: [0, item.animX > 0 ? 8 : -8, 0]
                                  }
                        }
                        transition={
                            isMobile
                                ? { duration: 0 } // No animation duration for mobile
                                : {
                                      duration: item.duration,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: item.delay,
                                      repeatType: "mirror"
                                  }
                        }
                    >
                        <div style={{ padding: isMobile ? '5px' : '10px' }}>
                            <item.Icon size={isMobile ? item.customSize * 0.7 : item.customSize} />
                        </div>
                    </motion.div>
                ))}

                {/* "About Me" Title Animation */}
                <motion.h1
                    className="font-bold mb-6 text-purple-400 text-4xl sm:text-6xl font-Mightail mt-4 relative z-10"
                    initial={contentVariants.title.initial}
                    animate={contentVariants.title.animate}
                    transition={contentVariants.title.transition}
                >
                    About Me
                </motion.h1>

                <div className="flex flex-col md:flex-row items-start justify-center gap-10 relative z-10 w-full max-w-6xl mt-10 sm:mt-0">

                    {/* Image Animation */}
                    <motion.div
                        ref={imageRef}
                        initial={contentVariants.image.initial}
                        animate={contentVariants.image.animate}
                        transition={contentVariants.image.transition}
                        className="w-full md:w-2/5 h-auto px-4 md:px-0"
                    >
                        <img src={about} alt="About Me" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </motion.div>

                    {/* Text Content Animation */}
                    <motion.div
                        ref={textRef}
                        initial={contentVariants.text.initial}
                        animate={contentVariants.text.animate}
                        transition={contentVariants.text.transition}
                        className="max-w-2xl font-LinearSans flex flex-col justify-between text-left px-4 md:px-0 md:w-3/5 mt-8 md:mt-0"
                    >
                        <div className="text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 mt-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                                My Journey into Cinematography
                            </h3>
                            <p className="mb-4 text-lg md:text-xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                                I am a passionate cinematographer with over a decade of experience in the industry.
                                From a background in editing to mastering the art of lighting and camera work, I have dedicated my career to telling compelling visual stories.
                            </p>

                            <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 mt-6" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
    Academic Background & Awards
</h3>
<p className="mb-4 text-lg md:text-xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
    After earning my MFA in cinematography from Tom Videography & Photography School,
    I received the prestigious Student Excellence Award for my work on my thesis film,
    further cementing my passion for visual storytelling.
</p>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 flex flex-col sm:flex-row justify-start items-start space-y-4 sm:space-y-0 sm:space-x-8 w-full">
                            {[
                                { icon: User2, label: "Clients", desc: "Happy Customers", isAnimated: true },
                                { icon: Clock, label: "4+ Years", desc: "Experience", isAnimated: false },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 30 }}
                                    transition={isMobile ? { duration: 0 } : { delay: index * 0.2 + 0.5, duration: 0.5 }}
                                    className="p-4 rounded-lg bg-black bg-opacity-50 min-w-[150px] shadow-lg flex flex-col items-center text-center"
                                >
                                    <stat.icon className="w-8 h-8 text-purple-400 mb-2" />
                                    {stat.isAnimated ? (
                                        <motion.div
                                            initial={isMobile ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                            animate={isMobile ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                                            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
                                            className="text-2xl font-bold text-white"
                                        >
                                            {clientCount}{stat.label === "Clients" && "+"}
                                        </motion.div>
                                    ) : (
                                        <div className="text-2xl font-bold text-white">{stat.label}</div>
                                    )}
                                    <div className="text-sm text-gray-400">{stat.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Element>
    );
};

export default About;