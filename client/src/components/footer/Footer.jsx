"use client";
import { Footer as FootRest } from "flowbite-react";
import { FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

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
        <div className="flex justify-center items-center w-full">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              aria-label={social.name}
              className="text-4xl w-full flex justify-center items-center transition-transform transform hover:scale-125 duration-300 hover:text-purple-700"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <FootRest.Divider />
        {/* Footer text */}
        <FootRest.Copyright
          by={
            <span className=" ml-2 font-bold transition-transform transform hover:scale-110 duration-300 hover:text-purple-700 cursor-pointer">
              Sin_Greed ™
            </span>
          }
          year={2024}
        />
      </div>
    </FootRest>
  );
};

export default Footer;
