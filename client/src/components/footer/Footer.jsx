"use client";
import { Footer as FootRest } from "flowbite-react";
import { FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";

// Array of Social Media Links and Icons
const socials = [
  {
    id: 1,
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/shwetank-morey-a35484257",
  },
  {
    id: 2,
    name: "YouTube",
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@Sin_Greed",
  },
  {
    id: 4,
    name: "Instagram",
    icon: <FaSquareInstagram />,
    link: "https://www.instagram.com/shwetaank_/",
  },
  {
    id: 5,
    name: "Twitter",
    icon: <FaTwitter />,
    link: "https://x.com/Sin_Greed___",
  },
  {
    id: 6,
    name: "My Portfolio",
    icon: <FaSuitcase />,
    link: "https://shwet-tech.com/",
  },
];

const Footer = () => {
  return (
    <FootRest className="w-full p-4 bg-white dark:bg-gray-800 text-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto flex flex-col justify-center items-center space-y-4">
        {/* Social Icons */}
        <motion.div
          className="flex justify-center items-center w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {socials.map((social) => (
            <motion.a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              aria-label={social.name}
              className="text-4xl w-full flex justify-center items-center transition-transform transform hover:scale-125 duration-300 hover:text-purple-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * social.id }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
        <FootRest.Divider />
        {/* Footer text */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FootRest.Copyright
            by={
              <span className=" ml-2 font-bold transition-transform transform hover:scale-110 duration-300 hover:text-purple-700 cursor-pointer">
                Sin_Greed ™
              </span>
            }
            year={2024}
          />
        </motion.div>
      </div>
    </FootRest>
  );
};

export default Footer;
