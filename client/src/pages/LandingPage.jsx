import { Button, Card } from "flowbite-react";
import { FaTicketAlt, FaRegSmile, FaFilm, FaUserCheck } from "react-icons/fa";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Carousel } from "flowbite-react";
import HeroTitleSwitcher from "./../components/titleSwitcher/HeroTitleSwitcher";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

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
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="/cinematic-background.mp4" type="video/mp4" />
            Your browser does not support the video tag. 😔 Please upgrade to a
            modern browser for the best experience. 🌟
          </video>
          <div className="absolute inset-0 bg-black opacity-60 dark:bg-gray-900 dark:opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 mt-20">
            <div className="text-5xl sm:text-7xl font-bold mb-6 dark:text-gray-100 text-gray-900">
              <HeroTitleSwitcher />
            </div>
            <p className="sm:text-2xl mb-8 max-w-2xl mx-auto text-white">
              Discover an unparalleled selection of contemporary blockbusters
              🎬, critically acclaimed indie films 🎥, and enduring classics 🎞️
              with MovieMania.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-20">
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
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 mb-20"
        >
          <div className="text-center px-4 sm:px-8 lg:px-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Our Features
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Discover the features that make MovieMania the best choice for
              your movie-watching experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <FaFilm className="text-4xl mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-4">
                  Curated Selections
                </h3>
                <p>
                  We handpick the best movies, from blockbusters to indie gems,
                  ensuring a quality viewing experience every time.
                </p>
              </Card>
              <Card>
                <FaTicketAlt className="text-4xl mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-4">Flexible Booking</h3>
                <p>
                  Book tickets with ease, choose your preferred seats, and enjoy
                  a hassle-free movie experience.
                </p>
              </Card>
              <Card>
                <FaRegSmile className="text-4xl mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-4">
                  Exclusive Rewards
                </h3>
                <p>
                  Earn points on every booking and unlock exclusive rewards,
                  discounts, and movie merchandise.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 mb-20"
        >
          <div className="text-center px-4 sm:px-8 lg:px-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              What Our Users Say
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Hear from our satisfied users and see why they love MovieMania.
            </p>
            <Carousel>
              <Card>
                <p>
                  &quot;MovieMania made finding and booking tickets a breeze! I
                  love the selection and the rewards program.&quot;
                </p>
                <div className="mt-4 flex items-center">
                  <FaUserCheck className="text-xl text-blue-500" />
                  <span className="ml-2 font-semibold">Jane Doe</span>
                </div>
              </Card>
              <Card>
                <p>
                  &quot;The best movie booking app I&apos;ve used. The interface
                  is sleek, and the customer service is top-notch.&quot;
                </p>
                <div className="mt-4 flex items-center">
                  <FaUserCheck className="text-xl text-blue-500" />
                  <span className="ml-2 font-semibold">John Smith</span>
                </div>
              </Card>
              {/* Add more testimonial cards as needed */}
              <Card>
                <p>
                  &quot;MovieMania made finding and booking tickets a breeze! I
                  love the selection and the rewards program.&quot;
                </p>

                <div className="mt-4 flex items-center">
                  <FaUserCheck className="text-xl text-blue-500" />
                  <span className="ml-2 font-semibold">Emily Davis</span>
                </div>
              </Card>
              <Card>
                <p>
                  &quot;MovieMania offers an extensive selection of movies and
                  an intuitive interface. Booking tickets has never been
                  easier.&quot;
                </p>
                <div className="mt-4 flex items-center">
                  <FaUserCheck className="text-xl text-blue-500" />
                  <span className="ml-2 font-semibold">Michael Lee</span>
                </div>
              </Card>
            </Carousel>
          </div>
        </section>

        {/* Call to Action Section */}
        {!user && (
          <section
            id="cta"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Watch?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join MovieMania today and start your movie adventure. Don’t miss
              out on the latest releases and exclusive content.
            </p>
            <Button
              onClick={() => navigate("/auth/sign-in")}
              gradientMonochrome="purple"
              size="lg"
              className="font-extrabold"
            >
              Get Started
            </Button>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
