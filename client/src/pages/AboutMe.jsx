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
import { Card, Button, Badge } from "flowbite-react";

import AboutMeTitleSwitcher from "../components/titleSwitcher/AboutMeTitleSwitcher";
import AboutTheseProjectTitleSwitcher from "../components/titleSwitcher/AboutTheseProjectTitleSwitcher";

const skills = [
  { icon: FaJs, label: "JavaScript", experience: "3+ years" },
  { icon: FaReact, label: "React", experience: "2+ years" },
  { icon: SiTailwindcss, label: "Tailwind CSS", experience: "2 years" },
  { icon: FaNodeJs, label: "Node.js", experience: "2 years" },
  { icon: SiExpress, label: "Express.js", experience: "2 years" },
  { icon: SiMongodb, label: "MongoDB", experience: "1.5 years" },
  { icon: SiMariadb, label: "MariaDB", experience: "1 year" },
  { icon: SiTypescript, label: "TypeScript", experience: "1.5 years" },
  { icon: SiRedux, label: "Redux", experience: "1.5 years" },
  { icon: SiNextdotjs, label: "Next.js", experience: "1 year" },
];

const projects = [
  {
    name: "AlmaBetter Movies Booking App 🎬",
    description:
      "An advanced movie booking application designed to provide a seamless ticket booking experience. It offers a user-friendly interface for browsing movie details, selecting showtimes, and managing bookings efficiently. Leveraging a high-performance tech stack ensures a smooth and reliable user experience.",
    features: [
      "🌟 Intuitive interface for exploring movies and selecting showtimes.",
      "🔒 Secure booking process with multiple payment options.",
      "🎟️ Real-time seat selection and availability tracking.",
      "🔐 User authentication powered by Clerk for enhanced security.",
      "📱 Fully responsive design for consistent cross-device experience.",
    ],
    technologies: [
      "⚛️ React-Vite",
      "✨ Flowbite-react",
      "🔄 Redux-Toolkit",
      "🎨 Tailwind CSS",
      "🌐 Node.js",
      "🛠️ Express.js",
      "🗃️ MongoDB",
      "🔒 Clerk",
      "📜 Swagger JS",
    ],
    link: "https://github.com/Shwetaank/Movies-Booking-App",
    duration: "August 2024 - September 2024",
    challenges:
      "🚧 Implementing real-time seat selection with effective state management and backend synchronization to avoid double bookings.",
    futureImprovements: [
      "🔍 Recommendation system for personalized movie suggestions.",
      "🔗 Social sharing features for booked movies to enhance engagement.",
      "🎁 Loyalty program to reward frequent users and encourage return visits.",
    ],
    impact:
      "🚀 Transforming the movie booking experience by providing an intuitive interface, boosting ticket sales, and enhancing overall user engagement.",
  },
];

const AboutMe = () => {
  return (
    <div className="w-full h-auto py-16 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
      {/* About Me Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutMeTitleSwitcher />
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center p-8 rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800">
          {/* Image Section */}
          <motion.div
            className="flex justify-center items-center w-full sm:w-1/2 group"
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="/profile-pic.jpg"
              alt="Profile Picture"
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-8 border-purple-200 shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
          </motion.div>

          {/* Text Section */}
          <div className="w-full sm:w-1/2 flex flex-col justify-center text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2 text-indigo-700">
              Shwetank
            </h2>
            <h3 className="text-xl sm:text-2xl mb-4 text-indigo-600">
              Full Stack Developer 🚀
            </h3>
            <p className="text-lg sm:text-xl mb-4 text-justify">
              I&apos;m a passionate engineer from Pune, India. I specialize in
              building modern, responsive applications using{" "}
              <strong>JavaScript</strong>, <strong>TypeScript</strong>, and a
              full stack of technologies like <strong>React js</strong>,
              <strong> Node.js</strong>, and <strong> MongoDB</strong>.
            </p>
            <Button
              gradientDuoTone="pinkToOrange"
              className="mt-4 font-bold shadow-md"
              href="#projects"
              aria-label="Explore my work"
            >
              Project Detail
            </Button>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className=" mb-8 text-center  text-2xl sm:text-4xl font-semibold  text-indigo-700">
            Skills & Expertise 💻
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {skills.map(({ icon: Icon, label, experience }, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-md hover:scale-105 transition-transform duration-300 relative group"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Icon
                  className="text-5xl text-purple-700 mb-2"
                  aria-label={label}
                />
                <p className="text-lg font-medium">{label}</p>
                <span className="absolute bottom-0 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gray-700 text-white text-sm rounded p-2 shadow-lg">
                  {`Experience: ${experience}`}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          className="mt-16"
          id="projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AboutTheseProjectTitleSwitcher />

          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {projects.map((project, index) => (
              <div key={index} className="w-full rounded-lg shadow-xl">
                <Card className="border-0 shadow-md dark:bg-gray-900 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 opacity-50 dark:bg-gray-800 dark:opacity-30"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-8 text-center text-indigo-700">
                      {project.name}
                    </h3>
                    <p className="mb-8 text-gray-800 dark:text-gray-200 text-justify">
                      {project.description}
                    </p>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <strong className="block mb-2 text-gray-700 dark:text-gray-300">
                        Features:
                      </strong>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                        {project.features.map((feature, i) => (
                          <li key={i} className="mb-2">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <strong className="block mb-2 text-gray-700 dark:text-gray-300">
                        Details:
                      </strong>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Duration:</strong> {project.duration}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Challenges:</strong> {project.challenges}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Technologies:</strong>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              color="purple"
                              size="sm"
                              className="cursor-pointer transition-transform transform hover:scale-105 hover:bg-purple-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <strong className="block mb-2 text-gray-700 dark:text-gray-300">
                        Future Improvements:
                      </strong>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                        {project.futureImprovements.map((improvement, i) => (
                          <li key={i} className="mb-2">
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        gradientDuoTone="pinkToOrange"
                        className="mt-4 font-bold shadow-md"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View project on GitHub"
                      >
                        <FaGithub className="mr-2 text-xl" />
                        View on GitHub
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
