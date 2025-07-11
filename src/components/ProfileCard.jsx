import React from "react";
import { motion } from "framer-motion";

const ProfileCard = ({ name, email, photoURL, dateLabel, date }) => {
  const displayDate =
    date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })
      : "Date not available";

  return (
    <motion.div
      className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={photoURL}
          alt={name}
          className="w-28 h-28 rounded-full border-4 border-[#facc15] shadow-md object-cover"
          whileHover={{ rotate: 2, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-500 text-sm">{email}</p>
        <div className="mt-4 bg-base-200 px-4 py-2 rounded-md">
          <span className="font-medium text-gray-700">{dateLabel}:</span>{" "}
          <span className="text-gray-600">{displayDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
