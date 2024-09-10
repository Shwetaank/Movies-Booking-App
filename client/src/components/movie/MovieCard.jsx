import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, Button, Badge, Tooltip } from "flowbite-react";
import LoadingError from "../spinner/LoadingError";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    setDisplayedMovies(movies.slice(startIndex, startIndex + moviesPerPage));
  }, [movies, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(movies.length / moviesPerPage),
    [movies]
  );

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
      <Button
        key={index}
        onClick={() => page !== "..." && handlePageChange(page)}
        gradientDuoTone="pinkToOrange"
        className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 ${
          page === currentPage ? "bg-blue-700" : "bg-blue-500"
        }`}
        disabled={page === "..." || page === currentPage}
        aria-label={`Go to page ${page}`}
      >
        {page}
      </Button>
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
    <div className="w-full h-full flex flex-col items-center p-4 perspective-1000">
      <LoadingError loading={loading} error={error} />

      {!loading && !error && (
        <>
          <motion.div
            className="w-full flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800"
                    style={{ perspective: 1000 }}
                    whileHover={{ rotateY: 360 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <Card>
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-52 object-fill rounded-xl overflow-hidden transition-transform duration-500 transform hover:scale-105 cursor-pointer"
                      />
                      <div className="p-4">
                        <h5 className="text-xl font-bold text-center text-purple-700 mb-1">
                          {movie.title}
                        </h5>
                        <p className="text-justify mb-2">{movie.description}</p>
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
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pagination Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6 w-full md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              gradientDuoTone="pinkToOrange"
              className="font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto"
              aria-label="Go to first page"
            >
              First
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              gradientDuoTone="pinkToOrange"
              className="font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto"
              aria-label="Go to previous page"
            >
              Previous
            </Button>
            {renderPageNumbers()}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              gradientDuoTone="pinkToOrange"
              className="font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto"
              aria-label="Go to next page"
            >
              Next
            </Button>
            <Button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              gradientDuoTone="pinkToOrange"
              className="font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 w-20 md:w-auto"
              aria-label="Go to last page"
            >
              Last
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
