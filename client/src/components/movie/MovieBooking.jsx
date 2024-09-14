import { useUser } from "@clerk/clerk-react";
import BookingForm from "../forms/BookingForm";
import LastBooking from "./LastBooking";

const MovieBooking = () => {
  const { user } = useUser();

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

      {/* Booking Form & Get Last Booking Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-screen-lg">
        <div className="w-full flex justify-center">
          <BookingForm />
        </div>
        <div className="w-full flex justify-center">
          <LastBooking />
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
