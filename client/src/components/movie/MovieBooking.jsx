import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import BookingForm from "../forms/BookingForm";
import LastBooking from "./LastBooking";
import { Spinner, Alert } from "flowbite-react";

const MovieBooking = () => {
  const { user } = useUser();
  const [bookingUpdated, setBookingUpdated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBookingSuccess = () => {
    setBookingUpdated((prev) => !prev); // Toggle bookingUpdated state
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <p className="text-lg">
          {`Hello, `}
          <span className="text-purple-700 font-bold">
            {` ${user.firstName}! `}
          </span>
          {`🎬 Welcome to the Movie Mania platform. We're delighted to have you with us today. 😊`}
        </p>
      </div>

      {/* Booking Form & Last Booking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-screen-lg">
        <div className="w-full flex justify-center">
          <BookingForm
            onSuccess={handleBookingSuccess}
            onError={handleError}
            onLoading={handleLoading}
          />
        </div>
        <div className="w-full flex justify-center">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner size="xl" />
            </div>
          ) : error ? (
            <Alert color="failure" className="w-full max-w-md">
              <span>{error}</span>
            </Alert>
          ) : (
            <LastBooking bookingUpdated={bookingUpdated} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
