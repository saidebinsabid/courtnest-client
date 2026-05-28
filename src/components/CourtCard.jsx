import React, { useState } from "react";
import {
  MdSportsTennis,
  MdSportsSoccer,
  MdSportsBasketball,
  MdSportsCricket,
  MdSportsHockey,
} from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import BookingModalCourt from "./BookingModalCourt";

const CourtCard = ({ court }) => {
  const { name, image, type, slots = [], price } = court;
    const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = () => {
    if (!user) return window.location.href = "/auth/login";
    setIsModalOpen(true);
  };

  const getCourtIcon = (type) => {
    switch (type.toLowerCase()) {
      case "tennis":
        return <MdSportsTennis className="text-primary" />;
      case "badminton":
        return <GiShuttlecock className="text-primary" />;
      case "football":
      case "soccer":
        return <MdSportsSoccer className="text-primary" />;
      case "cricket":
        return <MdSportsCricket className="text-primary" />;
      case "hockey":
        return <MdSportsHockey className="text-primary" />;
      case "basketball":
        return <MdSportsBasketball className="text-primary" />;
      default:
        return <MdSportsTennis className="text-primary" />;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
      {/* Court Image */}
      <img src={image} alt={name} className="h-48 w-full object-cover" loading="lazy" />

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          {name}
        </h2>
        {/* Court Name & Type */}
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
          {getCourtIcon(type)} {type}
        </p>
        <div className="mb-2 flex flex-col gap-2">
  {/* Label */}
  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
    <FaCalendarAlt className="text-primary" />
    Available Slot
  </label>

  {/* Slots as badges */}
  <div className="flex flex-wrap gap-2">
    {slots.map((slot, idx) => (
      <span
        key={idx}
        className="bg-primary text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-primary-dark"
      >
        {slot}
      </span>
    ))}
  </div>
</div>


        {/* Price */}
        <p className="flex items-center text-sm font-semibold text-gray-700 mb-3">
          <FaDollarSign className="mr-1 text-primary" />
          Price: {price} per session
        </p>
        {/* Book Now Button */}
        <button
        onClick={handleBookingClick}
        className="mt-auto  w-full bg-primary text-black hover:text-white hover:bg-primary/90 flex items-center justify-center gap-2 py-2 rounded"
      >
        Book Now <FaArrowRightFromBracket />
      </button>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModalCourt
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          court={court}
        />
      )}
      </div>
    </div>
  );
};

export default CourtCard;
