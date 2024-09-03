import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const AboutTheseProjectTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const controls = useAnimation();

  const projectTitles = [
    "Project Overview",
    "Key Features",
    "Technology Stack",
    "Development Process",
    "Challenges & Solutions",
    "Future Enhancements",
    "User Experience",
    "Impact & Feedback",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      controls
        .start({
          opacity: 0,
          transition: { duration: 1 },
        })
        .then(() => {
          setTitleIndex((prevIndex) => (prevIndex + 1) % projectTitles.length);
          controls.start({
            opacity: 1,
            transition: { duration: 1 },
          });
        });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [projectTitles.length, controls]);

  return (
    <motion.h2
      className="text-2xl sm:text-4xl font-semibold mb-6 p-4 text-center"
      animate={controls}
      initial={{ opacity: 1 }}
    >
      {projectTitles[titleIndex]}
    </motion.h2>
  );
};

export default AboutTheseProjectTitleSwitcher;
