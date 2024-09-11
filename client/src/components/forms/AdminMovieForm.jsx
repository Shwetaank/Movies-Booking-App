import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button, TextInput, Label, Textarea } from "flowbite-react";
import axios from "axios";

const AdminMovieForm = ({ onLogout }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [moviePoster, setMoviePoster] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("title", movieTitle);
    formData.append("description", movieDescription);
    formData.append("genre", movieGenre);
    formData.append("releaseDate", releaseDate);
    if (moviePoster) {
      formData.append("poster", moviePoster);
    }

    try {
      await axios.post("http://localhost:8080/admin/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setSuccess("Movie added successfully!");
      // Reset form fields
      setMovieTitle("");
      setMovieDescription("");
      setMovieGenre("");
      setReleaseDate("");
      setMoviePoster(null);
    } catch (err) {
      console.error(err); // Log error for debugging
      setError(
        err.response?.data?.message || "Failed to add movie. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Movie</h2>

        {/* Display success or error messages */}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Movie Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="movieTitle" value="Movie Title" />
            </div>
            <TextInput
              id="movieTitle"
              type="text"
              placeholder="Enter movie title"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="movieDescription" value="Movie Description" />
            </div>
            <Textarea
              id="movieDescription"
              placeholder="Enter movie description"
              value={movieDescription}
              onChange={(e) => setMovieDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="movieGenre" value="Movie Genre" />
            </div>
            <TextInput
              id="movieGenre"
              type="text"
              placeholder="Enter movie genre"
              value={movieGenre}
              onChange={(e) => setMovieGenre(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="releaseDate" value="Release Date" />
            </div>
            <TextInput
              id="releaseDate"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="moviePoster" value="Movie Poster" />
            </div>
            <input
              id="moviePoster"
              type="file"
              accept="image/*"
              onChange={(e) => setMoviePoster(e.target.files[0])}
            />
          </div>

          <Button
            type="submit"
            gradientMonochrome="info"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Adding Movie..." : "Add Movie"}
          </Button>
        </form>

        {/* Logout Button */}
        <Button
          type="button"
          color="failure"
          className="mt-4 w-full"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

AdminMovieForm.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AdminMovieForm;
