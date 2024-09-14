import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AdminMovieForm from "../forms/AdminMovieForm";
import MovieList from "./MovieList";
import LoadingSpinner from "../spinner/LoadingSpinner";

const MovieManagement = ({ onLogout }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://movies-booking-app.onrender.com/movie", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      // Ensure we handle the response format correctly
      if (response.data && Array.isArray(response.data.movies)) {
        setMovies(response.data.movies);
      } else {
        console.error("Unexpected data format:", response.data);
        setMovies([]); // Handle unexpected data format
      }
    } catch (err) {
      console.error("Failed to fetch movies", err);
      setMovies([]); // Handle fetch error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://movies-booking-app.onrender.com/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );
    } catch (err) {
      console.error("Failed to delete movie", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMovie = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === updatedMovie._id ? updatedMovie : movie
      )
    );
    setSelectedMovie(null);
  };

  return (
    <div className="w-full p-4 md:p-8 mt-8">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          <div className="flex flex-col">
            <AdminMovieForm
              onLogout={onLogout}
              movie={selectedMovie}
              onUpdateMovie={handleUpdateMovie}
            />
          </div>

          <div className="flex flex-col">
            <MovieList
              movies={movies}
              onDelete={handleDelete}
              onEdit={setSelectedMovie}
            />
          </div>
        </div>
      )}
    </div>
  );
};

MovieManagement.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default MovieManagement;
