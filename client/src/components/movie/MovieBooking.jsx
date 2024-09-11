import { useUser } from "@clerk/clerk-react";
import BookingForm from "./bookingform";
import LastBooking from "./lastbooking";

const MovieBooking = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-justify">
        <p className="flex items-center">
          {`Hello ,`}
          <span className="text-purple-700 font-bold cursor-pointer ml-1 mr-1">
            {` ${user.firstName}!`}{" "}
          </span>
          {`🎬 Welcome to the Movie Mania platform. We're delighted to have you with us today. 😊`}
        </p>
      </div>
      {/* Booking Form & Get Last Booking Detail */}
      <div className="w-full flex justify-between mt-10 space-x-4">
        <div className="w-1/2 flex justify-center">
          <BookingForm />
        </div>
        <div className="w-1/2 flex justify-center">
          <LastBooking />
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
