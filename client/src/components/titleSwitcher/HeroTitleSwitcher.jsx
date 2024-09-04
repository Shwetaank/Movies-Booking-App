import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const controls = useAnimation();

  const titles = [
    "Discover the Magic of Movies",
    "Experience the Latest Blockbusters",
    "Explore Timeless Classics",
    "Find Your Next Favorite Film",
    "Unveil New Releases",
    "Enjoy Curated Movie Selections",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      controls
        .start({
          opacity: 0,
          transition: { duration: 1 },
        })
        .then(() => {
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
          controls.start({
            opacity: 1,
            transition: { duration: 1 },
          });
        });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [titles.length, controls]);

  return (
    <motion.h1
      className="text-5xl sm:text-7xl font-bold mb-6 text-white dark:text-gray-100"
      animate={controls}
      initial={{ opacity: 1 }}
    >
      {titles[titleIndex]}
    </motion.h1>
  );
};

export default HeroTitleSwitcher;
