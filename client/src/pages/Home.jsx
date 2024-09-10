import MovieCard from "../components/movie/MovieCard";
import BookingTitleSwitcher from "../components/titleSwitcher/BookingTitleSwitcher";

const Home = () => {
  return (
    <div className="w-full h-auto py-16 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Title Switcher for booking page */}
        <section className="text-center mb-12">
          <BookingTitleSwitcher />
        </section>
        <div className="w-full h-80">
          <video
            autoPlay
            loop
            muted
            src="BookingHeader.mp4"
            className="w-full h-full object-fill rounded-3xl cursor-pointer "
            aria-label="Booking header video"
          />
        </div>
        {/* Cards rendering for movies in Carousal'
         */}
        <div className="mt-10 flex justify-center">
          <MovieCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
