import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, Button, Badge, Tooltip } from "flowbite-react";
import { motion } from "framer-motion";
import LoadingError from "../spinner/LoadingError";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [animation, setAnimation] = useState("opacity-100");
  const moviesPerPage = 3;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/movie/");
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    setAnimation("opacity-0"); // Trigger fade-out
    const timer = setTimeout(() => {
      setDisplayedMovies(movies.slice(startIndex, startIndex + moviesPerPage));
      setAnimation("opacity-100"); // Trigger fade-in
    }, 300); // Duration for fade-out
    return () => clearTimeout(timer);
  }, [movies, currentPage]);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = useCallback(
    (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );

  const renderPageNumbers = () => {
    const pages = [];
    const pageLimit = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => page !== "..." && handlePageChange(page)}
          gradientDuoTone="pinkToOrange"
          className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto transition-transform transform duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 ${
            page === currentPage
              ? "bg-blue-700"
              : "bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg hover:shadow-pink-500/50"
          }`}
          disabled={page === "..." || page === currentPage}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </Button>
      </motion.div>
    ));
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <LoadingError loading={loading} error={error} />

      {!loading && !error && (
        <>
          <div
            className={`w-full flex flex-wrap justify-center gap-6 ${animation}`}
          >
            {displayedMovies.map((movie) => {
              const genres =
                Array.isArray(movie.genre) && movie.genre.length > 0
                  ? movie.genre[0].split(",").map((g) => g.trim())
                  : [];

              return (
                <motion.div
                  key={movie._id}
                  className="w-full sm:w-80 md:w-96 lg:w-96 p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="flex flex-col relative cursor-pointer bg-[linear-gradient(to_bottom,_var(--tw-gradient-stops))] from-gray-200 to-gray-700 dark:from-gray-700 dark:to-gray-900">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-48  object-fill rounded-xl"
                    />
                    <div className="p-4 flex-1 flex flex-col">
                      <h5 className="text-xl font-bold text-center text-purple-700">
                        {movie.title}
                      </h5>
                      <p className="text-justify mb-2 flex-1">
                        {movie.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-6 mb-4">
                        {genres.map((g, index) => (
                          <Badge
                            key={index}
                            color="purple"
                            className="cursor-pointer transition-transform transform hover:scale-105 hover:bg-purple-200"
                          >
                            {g}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <p className="text-sm text-center mb-2">
                          <strong className="font-extrabold text-purple-800">
                            Cast :-{" "}
                          </strong>
                          {movie.cast.join(", ")}
                        </p>
                      </div>
                      <div className="flex">
                        <Tooltip content="Release Date" placement="bottom">
                          <p className="text-sm mb-2 font-semibold">
                            {formatDate(movie.releaseDate)}
                          </p>
                        </Tooltip>
                      </div>
                      <p className="text-sm flex justify-end mb-2">
                        <strong> Duration :- </strong>
                        <span className="text-purple-700 font-bold ml-1">
                          {formatDuration(movie.duration)} Hr
                        </span>
                      </p>
                      <div className="flex justify-center items-center mt-5">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Button
                            gradientDuoTone="pinkToOrange"
                            className="shadow-md font-bold text-purple-700 hover:shadow-pink-500/80 transition duration-300 ease-in-out animate-pulse"
                          >
                            Book Movie Now
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-10 w-full md:gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto transition-transform transform duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 ${
                  currentPage === 1
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg hover:shadow-pink-500/50"
                }`}
                aria-label="Go to first page"
              >
                First
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto transition-transform transform duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 ${
                  currentPage === 1
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg hover:shadow-pink-500/50"
                }`}
                aria-label="Go to previous page"
              >
                Previous
              </Button>
            </motion.div>
            {renderPageNumbers()}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto transition-transform transform duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 ${
                  currentPage === totalPages
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg hover:shadow-pink-500/50"
                }`}
                aria-label="Go to next page"
              >
                Next
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto transition-transform transform duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 ${
                  currentPage === totalPages
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg hover:shadow-pink-500/50"
                }`}
                aria-label="Go to last page"
              >
                Last
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
