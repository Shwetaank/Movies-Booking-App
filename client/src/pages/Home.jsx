import { motion } from "framer-motion";
import MovieCard from "../components/movie/MovieCard";
import BookingTitleSwitcher from "../components/titleSwitcher/BookingTitleSwitcher";
import MovieBooking from "../components/movie/MovieBooking";

const Home = () => {
  return (
    <div className="w-full h-auto py-16 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Title Switcher for booking page */}
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <BookingTitleSwitcher />
          </motion.div>
        </section>

        {/* Video */}
        <div className="w-full h-80 mb-10">
          <motion.video
            autoPlay
            loop
            muted
            src="BookingHeader.mp4"
            className="w-full h-full object-fill rounded-3xl cursor-pointer"
            aria-label="Booking header video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Cards */}
        <section className="mt-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-2xl font-semibold text-purple-700 mb-8 text-center p-2"
              initial={{ opacity: 1 }}
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Recent Release
            </motion.h1>
            <MovieCard />
          </motion.div>
        </section>
        {/* Booking Secton */}
        <section id="booking" className="mt-12 flex flex-col justify-center">
          <motion.h1
            className="text-2xl font-semibold text-purple-700 mb-8 text-center p-2"
            initial={{ opacity: 1 }}
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Book Your Ticket
          </motion.h1>
          <MovieBooking />
        </section>
      </div>
    </div>
  );
};

export default Home;
