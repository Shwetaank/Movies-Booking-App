import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Spinner, Modal, Alert } from "flowbite-react";
import { FaTrashAlt } from "react-icons/fa";

const LastBooking = () => {
  const [lastBooking, setLastBooking] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // State to hold the booking ID to delete
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

  useEffect(() => {
    // Fetch movies and last booking from the backend
    const fetchMoviesAndBooking = async () => {
      try {
        // Fetch movies
        const moviesResponse = await axios.get(
          "https://movies-booking-app.onrender.com/movie"
        );
        setMovies(moviesResponse.data.movies);

        // Fetch last booking
        const bookingResponse = await axios.get(
          "https://movies-booking-app.onrender.com/booking"
        );
        setLastBooking(bookingResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("⚠️ Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndBooking();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://movies-booking-app.onrender.com/booking/${bookingIdToDelete}`
      );
      setLastBooking(null); 
      setShowModal(false); 
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("❌ Failed to delete booking.");
    }
  };

  const getMovieName = (movieId) => {
    const movie = movies.find((m) => m._id === movieId);
    return movie ? movie.title : "Unknown Movie";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-auto py-16 px-4 sm:px-8 flex justify-center">
      <div className="max-w-lg w-full">
        {error ? (
          <Alert color="failure" className="mb-4">
            <span>{error}</span>
          </Alert>
        ) : (
          <Card
            className="w-full p-6 rounded-lg shadow-md text-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400
        dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
          >
            <h1 className="text-2xl font-bold mb-4 text-purple-700">
              🎟️ Last Booking
            </h1>
            {lastBooking ? (
              <div className="space-y-4">
                <p className="text-left">
                  <strong className="text-indigo-700">🎬 Movie Name :-</strong>{" "}
                  <span className="font-bold">
                    {getMovieName(lastBooking.movie)}
                  </span>
                </p>
                <p className="text-left">
                  <strong className="text-indigo-700">📅 Date :-</strong>{" "}
                  {new Date(lastBooking.date).toLocaleDateString()}
                </p>
                <p className="text-left">
                  <strong className="text-indigo-700">🪑 Seats :-</strong>{" "}
                  {lastBooking.seats.map((seat) => seat.seatNumber).join(", ")}
                </p>
                <p className="text-left">
                  <strong className="text-indigo-700">🕒 Slot :-</strong>{" "}
                  {lastBooking.slot.label}
                </p>
                <p className="text-left">
                  <strong className="text-indigo-700">👤 Name :-</strong>{" "}
                  {lastBooking.name}
                </p>
                <p className="text-left">
                  <strong className="text-indigo-700">📧 Email:-</strong>{" "}
                  {lastBooking.email}
                </p>
                <p className="text-left">
                  <strong className="text-indigo-700">💵 Total Price :-</strong>{" "}
                  ₹ {lastBooking.totalPrice}
                </p>
                <div className="flex justify-center ">
                  <Button
                    onClick={() => {
                      setBookingIdToDelete(lastBooking._id);
                      setShowModal(true);
                    }}
                    gradientDuoTone="pinkToOrange"
                    className="flex items-center font-extrabold py-2 px-4 text-white rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
                  >
                    <FaTrashAlt className="mr-2 text-xl" />
                    Delete Booking
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No booking found</p>
            )}
          </Card>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your booking?</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Button
            gradientDuoTone="greenToBlue"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            gradientDuoTone="pinkToOrange"
            onClick={() => handleDelete(bookingIdToDelete)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LastBooking;
