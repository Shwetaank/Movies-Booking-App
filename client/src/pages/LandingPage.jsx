import { Button, Card, Carousel, Rating } from "flowbite-react";
import { FaTicketAlt, FaRegSmile, FaFilm, FaUserCheck } from "react-icons/fa";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import HeroTitleSwitcher from "./../components/titleSwitcher/HeroTitleSwitcher";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

// Testimonail Array
const reviews = [
  {
    text: "MovieMania made finding and booking tickets a breeze! The selection is fantastic, and the rewards program is a nice. 🌟",
    name: "Jane Doe",
    rating: 5,
  },
  {
    text: "I love the sleek interface and the ease of booking my movie tickets. MovieMania is a game-changer! 🎬",
    name: "John Smith",
    rating: 4,
  },
  {
    text: "MovieMania's selection of movies is top-notch. Booking tickets is so convenient. Highly recommended! 🍿",
    name: "Emily Davis",
    rating: 3,
  },
  {
    text: "The rewards program and ease of use make MovieMania a must-have app for movie lovers. Great experience! 🌟",
    name: "Michael Lee",
    rating: 5,
  },
  {
    text: "Finding movies and booking tickets has never been easier.It has transformed my movie-going experience! 🎥",
    name: "Sophia Turner",
    rating: 5,
  },
  {
    text: "MovieMania offers a fantastic selection and a smooth booking process. I’m thoroughly impressed! 🌟",
    name: "David Brown",
    rating: 4,
  },
  {
    text: "A fantastic app with an intuitive design and an excellent selection of movies. Five stars! ⭐️",
    name: "Liam Wilson",
    rating: 5,
  },
  {
    text: "Booking is so easy with MovieMania! Love the movie suggestions based on my preferences. 🎞️",
    name: "Olivia Taylor",
    rating: 4,
  },
  {
    text: "The app is very user-friendly and has an amazing movie library. Great job, MovieMania! 🍿",
    name: "Ethan Johnson",
    rating: 4,
  },
  {
    text: "A must-have app for movie enthusiasts! The booking process is seamless and the selection is fantastic. 🎬",
    name: "Ava Martinez",
    rating: 5,
  },
  {
    text: "MovieMania has redefined the movie booking experience with its sleek design and user-friendly interface. 🌟",
    name: "Mia Garcia",
    rating: 3,
  },
];

const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto my-4 sm:px-4 py-6">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-screen overflow-hidden mb-20 rounded-3xl pt-16">
          <motion.video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <source src="/cinematic-background.mp4" type="video/mp4" />
            Your browser does not support the video tag. 😔 Please upgrade to a
            modern browser for the best experience. 🌟
          </motion.video>
          <motion.div
            className="absolute inset-0 bg-black opacity-60 dark:bg-gray-900 dark:opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          />
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 mt-20">
            <motion.div
              className="text-5xl sm:text-7xl font-bold mb-6 dark:text-gray-100 text-gray-900"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
            >
              <HeroTitleSwitcher />
            </motion.div>
            <motion.p
              className="sm:text-2xl mb-8 max-w-2xl mx-auto text-white"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Discover an unparalleled selection of contemporary blockbusters
              🎬, critically acclaimed indie films 🎥, and enduring classics 🎞️
              with MovieMania.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6 md:gap-20"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Button
                onClick={() => navigate("/home")}
                gradientMonochrome="failure"
                size="lg"
                className="font-extrabold text-white dark:text-gray-900"
              >
                Book Your Tickets
              </Button>
              <Button
                onClick={() => scrollToSection("features")}
                color="light"
                size="lg"
                gradientMonochrome="purple"
                className="font-extrabold text-white dark:text-gray-900"
              >
                Explore Features
              </Button>
              {!user && (
                <Button
                  onClick={() => scrollToSection("cta")}
                  gradientMonochrome="success"
                  size="lg"
                  className="font-extrabold text-white dark:text-gray-900"
                >
                  Join Now
                </Button>
              )}
              <Button
                onClick={() => scrollToSection("testimonials")}
                gradientMonochrome="info"
                size="lg"
                className="font-extrabold text-white dark:text-gray-900"
              >
                User Review
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="pt-16 pb-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-3xl mb-20"
        >
          <motion.div
            className="text-center px-4 sm:px-8 lg:px-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Our Features 🎥
            </h2>
            <p className="text-lg mb-20 px-2 text-justify text-gray-700 dark:text-gray-300">
              🎥 Experience cinema like never before with MovieMania. Our
              platform offers a curated selection of blockbusters and indie
              gems, ensuring top-quality entertainment. Enjoy effortless
              booking, exclusive rewards, and a seamless user experience. At
              MovieMania, we don&apos;t just show movies—we craft unforgettable
              moments. 🍿✨
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <div className="flex items-center justify-center mb-4">
                    <FaFilm className="text-4xl text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Curated Selections 🎬
                  </h3>
                  <p className="text-justify">
                    We handpick the finest movies, from the latest blockbusters
                    to indie masterpieces, ensuring a quality viewing experience
                    every time. 🌟
                  </p>
                </Card>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <div className="flex items-center justify-center mb-4">
                    <FaTicketAlt className="text-4xl text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Flexible Booking 🎟️
                  </h3>
                  <p className="text-justify">
                    Enjoy a seamless booking process with options to choose your
                    preferred seats, ensuring a hassle-free movie experience
                    from start to finish. ✨
                  </p>
                </Card>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <div className="flex items-center justify-center mb-4">
                    <FaRegSmile className="text-4xl text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Exclusive Rewards 🏆
                  </h3>
                  <p className="text-justify">
                    Earn points on every booking and unlock exclusive rewards,
                    including discounts, movie merchandise, and VIP access to
                    special events. 🎁
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <motion.section
          id="testimonials"
          className="pt-16 pb-20 flex flex-col items-center justify-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="text-center px-4 sm:px-8 lg:px-12">
            <h2 className="text-4xl font-bold mb-10">Users Review</h2>
            <p className="text-lg text-justify mb-10 text-gray-700 dark:text-gray-300">
              🌟 See why MovieMania is loved by our users! 🎬 Hear their
              feedback on our top-notch service and diverse movie selection.
              🍿✨
            </p>
            <div className="h-64 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel
                slideInterval={5000}
                pauseOnHover
                className="cursor-pointer"
              >
                {reviews.map((review, index) => {
                  // Determine the color based on rating
                  const getStarColor = (rating) => {
                    if (rating === 5) return "text-purple-700";
                    if (rating === 4) return "text-blue-700";
                    if (rating === 3) return "text-yellow-500";
                    return "text-red-700";
                  };

                  return (
                    <Card
                      key={index}
                      className="flex flex-col justify-center items-center p-4 bg-gray-100 dark:bg-gray-800 md:w-4/5 rounded-3xl"
                    >
                      <p className="text-justify">&quot;{review.text}&quot;</p>
                      <div className="flex justify-center items-center mb-4">
                        <Rating size="md">
                          {[...Array(5)].map((_, i) => (
                            <Rating.Star
                              key={i}
                              className={
                                i < review.rating
                                  ? getStarColor(review.rating)
                                  : "text-gray-400"
                              }
                            />
                          ))}
                        </Rating>
                      </div>
                      <div className="flex justify-end items-center">
                        <FaUserCheck className="text-3xl text-purple-700" />
                        <span className="ml-2 font-bold">{review.name}</span>
                      </div>
                    </Card>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        {!user && (
          <motion.section
            id="cta"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="pt-16 pb-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 mb-20 rounded-3xl shadow-xl"
          >
            <div className="text-center px-4 sm:px-8 lg:px-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🎬 Discover the Ultimate Movie Experience with MovieMania! 🍿
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
                Join us now and be part of an exclusive community!
              </h3>
              <p className="text-lg md:text-xl text-justify mb-10 text-gray-700 dark:text-gray-300">
                🎬 Step into a world of cinematic excellence with MovieMania!
                Our platform delivers:
                <ul className="list-disc list-inside ml-5 mt-4">
                  <li>
                    🎥 An extensive library of top movies and new releases
                  </li>
                  <li>
                    🔍 Personalized recommendations tailored to your taste
                  </li>
                  <li>🎁 Exclusive rewards and discounts for our members</li>
                  <li>🚀 A seamless and fast booking experience</li>
                </ul>
                Transform your movie nights into unforgettable experiences with
                MovieMania! 🌟
              </p>
              <p className="text-lg md:text-xl text-justify mb-10 text-gray-700 dark:text-gray-300">
                🎉 <strong>Special Offer:</strong> Sign up today and enjoy a{" "}
                <strong>10% discount</strong> on your first booking! 🎟️
              </p>
              <div className="mt-10">
                <Button
                  onClick={() => navigate("/auth/sign-in")}
                  gradientMonochrome="purple"
                  size="lg"
                  className="mx-auto font-extrabold"
                >
                  Join Now
                </Button>
              </div>
            </div>
          </motion.section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
