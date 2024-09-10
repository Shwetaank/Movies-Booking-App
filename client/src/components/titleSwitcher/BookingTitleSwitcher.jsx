import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const BookingTitleSwitcher = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const controls = useAnimation();

  const titles = [
    "Book a Ticket",
    "View Your Bookings",
    "Recent Booking",
    "Manage Reservations",
    "Upcoming Events",
    "Booking History",
    "Recent Reservations",
    "Ticket Overview",
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
    <motion.h2
      className="text-2xl sm:text-4xl font-semibold mb-6 p-4 text-center"
      animate={controls}
      initial={{ opacity: 1 }}
    >
      {titles[titleIndex]}
    </motion.h2>
  );
};

export default BookingTitleSwitcher;
