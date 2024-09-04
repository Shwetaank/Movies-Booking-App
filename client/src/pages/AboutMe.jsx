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
import { motion } from "framer-motion";

import AboutMeTitleSwitcher from "../components/titleSwitcher/AboutMeTitleSwitcher";
import AboutTheseProjectTitleSwitcher from "./../components/titleSwitcher/AboutTheseProjectTitleSwitcher";

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

// Data for the project
const projects = [
  {
    name: "AlmaBetter Movies Booking App",
    description:
      "A comprehensive movie booking application allowing users to book tickets, explore movie details, and manage their bookings effortlessly. The platform is designed with a seamless user experience in mind, ensuring a smooth journey from selecting a movie to confirming the booking.",
    features: [
      "User-friendly interface for browsing movies and selecting showtimes.",
      "Secure booking process with multiple payment options.",
      "Real-time seat selection and availability tracking.",
      "User authentication and profile management powered by Clerk.",
      "Responsive design ensuring a consistent experience across devices.",
    ],
    technologies: [
      "React-Vite",
      "Flowbite-react",
      "Redux-Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "axios",
      "react-icons",
      "Clerk",
      "Swagger Js",
    ],
    link: "https://github.com/Shwetaank/Movies-Booking-App",
    duration: "August 2024 - September 2024",
    challenges:
      "A significant challenge was implementing real-time seat selection with live updates to prevent double bookings. This required efficient state management and synchronization between the frontend and backend, ensuring data consistency and a smooth user experience.",
    techExplanation:
      "The selected tech stack was chosen to ensure high performance, scalability, and a rich user experience: React-Vite for a fast and responsive frontend, Flowbite-react for pre-built UI components, Redux-Toolkit for managing application state, Tailwind CSS for quick and easy styling, Node.js with Express for the backend services, MongoDB for the database, and Clerk for secure user authentication.",
    futureImprovements: [
      "Introduce a recommendation system that suggests movies based on user preferences.",
      "Add social sharing features so users can share their booked movies with friends.",
      "Implement a loyalty program to reward frequent users with discounts or special offers.",
    ],
    impact:
      "The platform aims to revolutionize the movie booking experience by offering a feature-rich, user-friendly interface that caters to all user needs. It is expected to increase user engagement, drive ticket sales, and enhance the overall user experience with its intuitive design and robust functionality.",
  },
];

const AboutMe = () => {
  return (
    <div className="w-full h-auto py-8 flex flex-col items-center justify-center px-4 sm:px-8 text-xl ">
      <div className="w-full max-w-7xl border border-gray-300 rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-2xl sm:text-4xl font-semibold mb-8 text-center shadow-md">
          {/* TitleSwitcher */}
          <AboutMeTitleSwitcher />
        </div>
        {/* Profile Pic And Section Skill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
          {/* Profile Pic */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 border-r border-gray-300">
            <div className="flex flex-col items-center">
              <img
                src="/profile-pic.jpg"
                alt="profile pic"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-4 shadow-lg border-8 border-purple-100 cursor-pointer"
              />
              <p className="text-lg text-justify">
                Hello, I&apos;m{" "}
                <strong className="dark:text-purple-700">Shwetank</strong>, a
                Full Stack Engineer from Pune, India. Leveraging my background
                in Mechanical Engineering, I specialize in blending creativity
                with technology to elevate your digital presence. My focus is on
                delivering exceptional results and driving success for your
                business.
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
                <motion.div
                  key={index}
                  className="flex flex-col items-center py-2 mx-4 mb-6 sm:mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Icon
                    className="text-4xl w-full flex justify-center items-center hover:text-purple-700 transition-colors duration-300 cursor-pointer"
                    title={label}
                  />
                  <p className="text-sm sm:text-base mt-2">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Project Section */}
      <div className="w-full max-w-7xl mt-8 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 text-sm">
        <div className="text-2xl sm:text-4xl font-semibold mb-8 text-center shadow-md">
          {/* About These Project Title Switcher */}
          <AboutTheseProjectTitleSwitcher />
        </div>
        <div className="flex justify-center p-4">
          <div className="w-full flex flex-col space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-lg p-4 w-full text-justify"
              >
                <h3 className="text-xl font-semibold mb-2 text-center dark:text-purple-700">
                  {project.name}
                </h3>
                <p className="mb-4">{project.description}</p>
                {/* Features SubSection */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                    Features:
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {/* Technologies Used Subsection */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                    Technologies Used:
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    {project.technologies.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>
                {/* Duration */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                    Duration:
                  </h4>
                  <p>{project.duration}</p>
                </div>
                {/* Challenges & Solutions */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                    Challenges & Solutions:
                  </h4>
                  <p>{project.challenges}</p>
                </div>
                {/* Tech Stack Explanation */}
                {project.techExplanation && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                      Tech Stack Explanation:
                    </h4>
                    <p>{project.techExplanation}</p>
                  </div>
                )}
                {/* Future Improvements */}
                {project.futureImprovements && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                      Future Improvements:
                    </h4>
                    <ul className="list-disc list-inside space-y-2">
                      {project.futureImprovements.map((improvement, i) => (
                        <li key={i}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Impact */}
                {project.impact && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 dark:text-purple-700">
                      Impact:
                    </h4>
                    <p>{project.impact}</p>
                  </div>
                )}
                {/* GitHub Repo Link */}
                <div className="flex justify-center mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-700 hover:underline"
                  >
                    <FaGithub className="mr-2 text-2xl" />
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
