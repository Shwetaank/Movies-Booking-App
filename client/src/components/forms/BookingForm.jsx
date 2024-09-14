import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextInput,
  Label,
  Spinner,
  Toast,
  Select,
  Tooltip,
  Card,
} from "flowbite-react";
import axios from "axios";

const BookingForm = ({ onSuccess }) => {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState([{ seatNumber: "" }]);
  const [slot, setSlot] = useState("morning");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingMovies, setFetchingMovies] = useState(true);

  // Memoized slot pricing
  const slotPricing = useMemo(
    () => ({
      morning: 30,
      noon: 45,
      evening: 60,
      night: 100,
    }),
    []
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/movie/");
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMessage("⚠️ Failed to fetch movies.");
        setMessageType("error");
      } finally {
        setFetchingMovies(false);
      }
    };

    fetchMovies();
  }, []);

  // Memoized calculateTotalPrice function to avoid ESLint warnings
  const calculateTotalPrice = useCallback(() => {
    const seatCount = seats.length;
    const slotPrice = slotPricing[slot];
    return seatCount * slotPrice;
  }, [seats.length, slot, slotPricing]);

  // Update total price when slot or seats change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [slot, seats, calculateTotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType("");

    const bookingData = {
      movie,
      date,
      seats,
      slot: { label: slot },
      name,
      email,
      totalPrice,
    };

    try {
      await axios.post("http://localhost:8080/booking", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("🎉 Booking confirmed!");
      setMessageType("success");
      onSuccess && onSuccess();
    } catch (err) {
      console.error("Error occurred during booking:", err);
      setMessage("⚠️ Failed to confirm booking. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatChange = (index, value) => {
    const updatedSeats = [...seats];
    updatedSeats[index].seatNumber = value;
    setSeats(updatedSeats);
  };

  const addSeatField = () => setSeats([...seats, { seatNumber: "" }]);

  return (
    <div className="w-full h-auto py-16 px-4 sm:px-8 flex justify-center">
      <div className="max-w-lg">
        <Card className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
            🎟️ Booking Form
          </h2>

          {/* Message Toast */}
          {message && (
            <div className="w-full flex justify-center mb-4">
              <Toast
                className={`${
                  messageType === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div className="flex items-center">
                  <span className="ml-2">{message}</span>
                </div>
              </Toast>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Movie Dropdown */}
            <div>
              <Label htmlFor="movie" value="Select Movie" />
              {fetchingMovies ? (
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <Select
                  id="movie"
                  value={movie}
                  onChange={(e) => setMovie(e.target.value)}
                  required
                >
                  <option value="">Select a movie</option>
                  {movies.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.title}
                    </option>
                  ))}
                </Select>
              )}
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date" value="Date" />
              <TextInput
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Seats */}
            <div>
              <Label value="Seats" />
              {seats.map((seat, index) => (
                <div key={index} className="flex items-center gap-4 mt-2">
                  <TextInput
                    type="text"
                    placeholder={`Seat ${index + 1} (e.g., A1)`}
                    value={seat.seatNumber}
                    onChange={(e) => handleSeatChange(index, e.target.value)}
                    required
                  />
                  {index === seats.length - 1 && (
                    <Button
                      onClick={addSeatField}
                      gradientDuoTone="pinkToOrange"
                    >
                      Add Seat
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Slot */}
            <div>
              <Label value="Slot" />
              <Select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="mt-2"
                required
              >
                <option value="morning">Morning</option>
                <option value="noon">Noon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </Select>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Enter your email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Total Price with Tooltip */}
            <div className="relative">
              <Label htmlFor="totalPrice" value="Total Price" />
              <Tooltip
                content={`Total Price = ${seats.length} seats x ${slotPricing[slot]} per seat`}
              >
                <TextInput
                  id="totalPrice"
                  type="number"
                  value={totalPrice}
                  readOnly
                />
              </Tooltip>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full font-bold mt-4"
              gradientDuoTone="greenToBlue"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Confirm Booking"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

BookingForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default BookingForm;
