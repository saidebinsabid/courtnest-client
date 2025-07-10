import React from "react";
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

const CourtCard = ({ court }) => {
  const { name, image, type, slots = [], price } = court;

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
      <img src={image} alt={name} className="h-48 w-full object-cover" />

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          {name}
        </h2>
        {/* Court Name & Type */}
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
          {getCourtIcon(type)} {type}
        </p>
        {/* Slot Times Dropdown */}
        <div className="mb-2 flex justify-between items-center gap-3">
          {/* Label */}
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap flex items-center gap-1 font-roboto">
            <FaCalendarAlt className="text-primary" />
            Available Slot
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary w-36"
            defaultValue=""
          >
            <option value="" disabled>
              Select Slot
            </option>
            {slots.map((slot, idx) => (
              <option key={idx} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <p className="flex items-center text-sm font-semibold text-gray-700 mb-3">
          <FaDollarSign className="mr-1 text-primary" />
          Price: {price} per session
        </p>
        {/* Book Now Button */}
        <button className="mt-auto font-roboto w-full border border-primary text-black hover:text-white hover:bg-primary/90 flex items-center justify-center gap-2 py-2 rounded">
          Book Now <FaArrowRightFromBracket />
        </button>
      </div>
    </div>
  );
};

export default CourtCard;
