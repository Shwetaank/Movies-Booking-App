import { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Modal,
  Table,
} from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Admin = () => {
  // State to manage the list of movies
  const [movies, setMovies] = useState([
    { id: 1, title: "Movie A", description: "Description of Movie A" },
    { id: 2, title: "Movie B", description: "Description of Movie B" },
  ]);

  // State for the modal (add/edit form)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // State for the form inputs
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Open the modal for adding a new movie
  const handleAddMovie = () => {
    setForm({ title: "", description: "" }); // Clear form
    setEditingMovie(null); // Not editing
    setModalOpen(true);
  };

  // Open the modal for editing an existing movie
  const handleEditMovie = (movie) => {
    setForm({ title: movie.title, description: movie.description }); // Set form with movie data
    setEditingMovie(movie); // Set the movie being edited
    setModalOpen(true);
  };

  // Handle form submission for adding or updating a movie
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMovie) {
      // Update existing movie
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === editingMovie.id ? { ...movie, ...form } : movie
        )
      );
    } else {
      // Add a new movie
      setMovies((prevMovies) => [
        ...prevMovies,
        { id: Date.now(), ...form }, // Assign a unique id to new movie
      ]);
    }
    setModalOpen(false); // Close modal
  };

  // Handle deleting a movie
  const handleDeleteMovie = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
        Admin Dashboard
      </h1>

      <div className="text-center mb-8">
        <Button onClick={handleAddMovie} gradientDuoTone="pinkToOrange">
          Add New Movie
        </Button>
      </div>

      <Table className="w-full text-center">
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {movies.map((movie) => (
            <Table.Row key={movie.id}>
              <Table.Cell>{movie.title}</Table.Cell>
              <Table.Cell>{movie.description}</Table.Cell>
              <Table.Cell>
                <Button
                  className="mr-2"
                  color="blue"
                  onClick={() => handleEditMovie(movie)}
                >
                  <FaEdit />
                </Button>
                <Button color="red" onClick={() => handleDeleteMovie(movie.id)}>
                  <FaTrash />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Modal for adding/updating movies */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>
          {editingMovie ? "Edit Movie" : "Add New Movie"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Movie Title</Label>
              <TextInput
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Movie Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" gradientDuoTone="pinkToOrange">
              {editingMovie ? "Update Movie" : "Add Movie"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin;
