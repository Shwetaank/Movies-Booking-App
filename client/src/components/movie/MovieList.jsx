import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Table, Toast, Modal } from "flowbite-react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MovieList = ({ movies, onEdit, onDelete }) => {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const moviesPerPage = 5;

  useEffect(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    setDisplayedMovies(movies.slice(startIndex, startIndex + moviesPerPage));
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
      <Button
        key={index}
        onClick={() => page !== "..." && handlePageChange(page)}
        gradientDuoTone="pinkToOrange"
        className={`font-extrabold text-purple-700 px-2 py-1 md:px-4 md:py-2 transition-transform transform duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 ${
          page === currentPage
            ? "bg-blue-700 text-white"
            : "bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg hover:shadow-pink-500/50"
        }`}
        disabled={page === "..." || page === currentPage}
        aria-label={`Go to page ${page}`}
      >
        {page}
      </Button>
    ));
  };

  const openDeleteModal = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMovie) {
      try {
        await onDelete(selectedMovie._id);
        setError(null);
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Failed to delete movie", error);
        setError("Failed to delete movie. Please try again.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className="w-full p-4 sm:px-8">
      {error && (
        <Toast className="mb-4 bg-red-100 text-red-800">
          <div className="flex items-center">
            <span>{error}</span>
          </div>
        </Toast>
      )}
      {!error && (
        <>
          <div
            className="overflow-x-auto mt-12 rounded-xl shadow-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400
dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
          >
            <h2 className="text-3xl font-bold text-center mt-10 mb-10 text-indigo-700">
              🎬 Movie Management
            </h2>
            <Table className="min-w-full">
              <Table.Head>
                <Table.HeadCell className="text-center font-extrabold text-indigo-700">
                  Index
                </Table.HeadCell>
                <Table.HeadCell className="text-center font-extrabold text-indigo-700">
                  Title
                </Table.HeadCell>
                <Table.HeadCell className="text-center font-extrabold text-indigo-700">
                  Actions
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {displayedMovies.map((movie, index) => (
                  <Table.Row
                    key={movie._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Table.Cell className="text-center">
                      {(currentPage - 1) * moviesPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell className="text-center font-extrabold">
                      {movie.title}
                    </Table.Cell>
                    <Table.Cell className="text-center flex justify-center gap-4">
                      <Button
                        onClick={() => onEdit(movie)}
                        gradientDuoTone="purpleToPink"
                        aria-label={`Edit ${movie.title}`}
                        className="flex items-center"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => openDeleteModal(movie)}
                        gradientDuoTone="pinkToOrange"
                        aria-label={`Delete ${movie.title}`}
                        className="flex items-center"
                      >
                        <FaTrashAlt />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {/* Pagination buttons */}
            <Button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`font-bold text-purple-700 px-2 py-1 md:px-4 md:py-2 transition-transform transform duration-300 hover:scale-110 ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-600"
                  : "bg-gradient-to-r from-pink-400 to-orange-400"
              }`}
              aria-label="Go to first page"
            >
              First
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`font-bold text-purple-700 px-2 py-1 md:px-4 md:py-2 transition-transform transform duration-300 hover:scale-110 ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-600"
                  : "bg-gradient-to-r from-pink-400 to-orange-400"
              }`}
              aria-label="Go to previous page"
            >
              Previous
            </Button>
            {renderPageNumbers()}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`font-bold text-purple-700 px-2 py-1 md:px-4 md:py-2 transition-transform transform duration-300 hover:scale-110 ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-600"
                  : "bg-gradient-to-r from-pink-400 to-orange-400"
              }`}
              aria-label="Go to next page"
            >
              Next
            </Button>
            <Button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`font-bold text-purple-700 px-2 py-1 md:px-4 md:py-2 transition-transform transform duration-300 hover:scale-110 ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-600"
                  : "bg-gradient-to-r from-pink-400 to-orange-400"
              }`}
              aria-label="Go to last page"
            >
              Last
            </Button>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {selectedMovie && (
        <Modal show={showDeleteModal} onClose={handleDeleteCancel}>
          <Modal.Header>Confirm Delete</Modal.Header>
          <Modal.Body>
            <p className="text-lg">
              Are you sure you want to delete the movie{" "}
              <span className="font-bold text-purple-700">
                {selectedMovie.title}
              </span>
              ?
            </p>
          </Modal.Body>
          <Modal.Footer className="flex justify-end gap-4 font-extrabold">
            <Button
              gradientDuoTone="pinkToOrange"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
            <Button onClick={handleDeleteCancel} gradientDuoTone="cyanToBlue">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovieList;
