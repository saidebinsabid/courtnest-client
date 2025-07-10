import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaBuilding,
  FaClock,
  FaUsers,
  FaCalendarTimes,
  FaTools,
  FaParking,
  FaChair,
  FaFirstAid,
  FaBath,
  FaTint,
  FaLightbulb,
  FaFutbol,
} from "react-icons/fa";
import { TbSoccerField } from "react-icons/tb";
import { GiGolfFlag } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  MdSportsBasketball,
  MdSportsCricket,
  MdSportsHockey,
  MdSportsSoccer,
  MdSportsTennis,
} from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BookingModalCourt = ({ isOpen, setIsOpen, court }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isClosedToday, setIsClosedToday] = useState(false);

  const {
    name,
    type,
    price,
    slots = [],
    surface,
    environment,
    capacity,
    slotDuration,
    closedDays = [],
    status,
    amenities = [],
  } = court || {};

  const todayName = dayNames[new Date().getDay()];

  useEffect(() => {
    setIsClosedToday(closedDays.includes(todayName));
  }, [closedDays]);

  const handleSlotToggle = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const bookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const res = await axiosSecure.post("/bookings", bookingData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Booking request sent successfully!");
      queryClient.invalidateQueries(["user-bookings"]);
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Booking failed.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || selectedSlots.length === 0) {
      toast.error("Please select a date and at least one slot.");
      return;
    }

    const bookingData = {
      courtId: court._id,
      courtName: name,
      userEmail: user?.email,
      userName: user?.displayName || "Unknown",
      courtType: type,
      date: selectedDate,
      slots: selectedSlots,
      totalPrice: price * selectedSlots.length,
      status: "pending",
      created_at: new Date(),
    };

    bookingMutation.mutate(bookingData);
  };

  const getCourtIcon = (type) => {
    switch (type.toLowerCase()) {
      case "tennis":
        return <MdSportsTennis className="text-green-700" />;
      case "badminton":
        return <GiShuttlecock className="text-green-700" />;
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

  // Icon Mapping
  const iconMap = {
    "Changing Room": <FaTools className="text-primary" />,
    Washroom: <FaBath className="text-primary" />,
    Parking: <FaParking className="text-primary" />,
    "Drinking Water": <FaTint className="text-primary" />,
    Lighting: <FaLightbulb className="text-primary" />,
    "Equipment Available (Racquets, Balls)": (
      <FaFutbol className="text-primary" />
    ),
    "Seating Area": <FaChair className="text-primary" />,
    "First Aid Kit": <FaFirstAid className="text-primary" />,
  };

  // Motion Variants
  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="modal modal-middle sm:modal-middle">
        <div className="modal-box rounded-xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-yellow-400 hover:text-black"
          >
            ✕
          </button>

          <h3 className="text-3xl font-semibold mb-4 text-center">
            Book <span className="text-primary">Court</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Court Info */}
            <div className="bg-base-200 p-4 rounded-lg shadow-md">
              <p className="text-lg font-medium text-center flex items-center justify-center">
                <GiGolfFlag />
                <span className="font-semibold">{name}</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <p className="text-base flex items-center justify-center gap-1">
                  {getCourtIcon(type)}
                  <strong>{type}</strong>
                </p>
                <div className="flex items-center gap-1">
                  <TbSoccerField className="text-slate-500" />
                  <strong>{surface}</strong>
                </div>
                <div className="flex items-center gap-1">
                  <FaBuilding className="text-indigo-500" />
                  <strong>{environment}</strong>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-blue-500" />
                  <strong>{capacity}</strong>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-yellow-500" />
                  <strong>{slotDuration}</strong>
                </div>
              </div>
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <p className="flex items-center gap-1 mt-1 font-semibold">
                <FaDollarSign />
                <span>
                  Price per slot: <span className="font-normal">${price}</span>{" "}
                </span>
              </p>

              <div className="flex items-start gap-2 col-span-2 sm:col-span-3">
                <FaCalendarTimes className="mt-1" />
                <span className="font-semibold">Closed Days: </span>
                <div className="flex flex-wrap gap-2">
                  {closedDays.length > 0 ? (
                    closedDays.map((day, idx) => (
                      <span
                        key={idx}
                        className="bg-red-50 text-red-700 border border-red-200 px-3 rounded-full text-sm"
                      >
                        {day}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <p className="text-sm font-semibold mb-2">Amenities:</p>
              <ul className="list-none space-y-2">
                {amenities.map((item, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-xl">{iconMap[item] || "🛠️"}</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* Date Picker */}
            <div className="form-control">
              <label className="label text-sm font-semibold text-black">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> Select Date
                </span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Slot Picker */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Available Slots
              </label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSlotToggle(slot)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition border ${
                      selectedSlots.includes(slot)
                        ? "text-black bg-green-200 border-green-500"
                        : "bg-white hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="border-t pt-4 text-right">
              <p className="text-sm font-semibold mb-2">
                Total Price:{" "}
                <span className="text-primary text-2xl font-semibold">
                  ${price * selectedSlots.length}
                </span>
              </p>
              <button
                type="submit"
                className={`btn w-full ${
                  isClosedToday || status !== "Available"
                    ? "btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "btn-primary"
                }`}
                disabled={
                  bookingMutation.isPending ||
                  isClosedToday ||
                  status !== "Available"
                }
              >
                {isClosedToday
                  ? `Closed on ${todayName}`
                  : bookingMutation.isPending
                  ? "Processing..."
                  : "Submit Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModalCourt;
