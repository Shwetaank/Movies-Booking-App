import { FaJs, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiMariadb,
} from "react-icons/si";

import AboutMeTitleSwitcher from "../components/titleSwitcher/AboutMeTitleSwitcher";

// Skill icons and labels
const skills = [
  { icon: FaJs, label: "JavaScript" },
  { icon: FaReact, label: "React" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: FaNodeJs, label: "Node.js" },
  { icon: SiExpress, label: "Express.js" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiMariadb, label: "MariaDB" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiRedux, label: "Redux" },
  { icon: SiNextdotjs, label: "Next.js" },
];
const AboutMe = () => {
  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl">
      <div className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md">
        <div className="text-2xl sm:text-4xl font-semibold mb-8 text-center shadow-md">
          {/* TitleSwitcher */}
          <AboutMeTitleSwitcher />
        </div>
        {/* Profic Pic And Section Skill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
          {/* Profile Pic  */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 border-r border-gray-300">
            <div className="flex flex-col items-center">
              <img
                src="/profile-pic.jpg"
                alt="profile pic"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-4 shadow-lg border-8 border-white cursor-pointer"
              />
              <p className="text-lg  text-justify">
                Hello, I&apos;m <strong>Shwetank</strong>, a Full Stack Engineer
                from Pune, India. Leveraging my background in Mechanical
                Engineering, I specialize in blending creativity with technology
                to elevate your digital presence. My focus is on delivering
                exceptional results and driving success for your business.
              </p>
            </div>
          </div>
          {/* Skills Section */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-lg sm:text-2xl font-semibold mb-8">
              My Skills
            </h2>
            <div className="flex flex-wrap justify-center items-center border border-gray-300 rounded-lg shadow-md p-4">
              {skills.map(({ icon: Icon, label }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center py-2 mx-4 mb-6 sm:mb-8"
                >
                  <Icon
                    className="text-4xl w-full flex justify-center items-center"
                    title={label}
                  />
                  <p className="text-sm sm:text-base mt-2">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
