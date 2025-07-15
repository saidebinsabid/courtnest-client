import React from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaBullhorn,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaTools,
  FaSyncAlt,
  FaUser,
} from "react-icons/fa";
import { MdLowPriority, MdPriorityHigh } from "react-icons/md";
import { BsFillLightningFill, BsTextParagraph } from "react-icons/bs";

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "General":
        return <FaBullhorn className="inline-block mr-1 text-yellow-400" />;
      case "Event":
        return <FaCalendarAlt className="inline-block mr-1 text-blue-400" />;
      case "Alert":
        return (
          <FaExclamationTriangle className="inline-block mr-1 text-red-500" />
        );
      case "Maintenance":
        return <FaTools className="inline-block mr-1 text-indigo-500" />;
      case "Update":
        return <FaSyncAlt className="inline-block mr-1 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "Normal":
        return <MdLowPriority className="inline-block mr-1 text-gray-400" />;
      case "High":
        return <MdPriorityHigh className="inline-block mr-1 text-orange-500" />;
      case "Urgent":
        return (
          <BsFillLightningFill className="inline-block mr-1 text-red-600" />
        );
      default:
        return null;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col lg:flex-row mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div className="lg:w-5/6">
        <img
          src={announcement.photoUrl}
          alt={announcement.title}
          className="w-full h-full object-cover p-4"
        />
      </div>

      <div className="lg:w-full p-4 flex flex-col justify-between text-gray-900">
        <div className="space-y-4">
          <p className="bg-primary flex justify-center items-center border rounded-tl-2xl rounded-br-2xl py-4">
            <span className="text-4xl font-extrabold">
              {formatDate(announcement.startDate)}
            </span>
          </p>
          <h3 className="text-2xl font-bold">{announcement.title}</h3>

          <p className="text-md text-gray-700 line-clamp-3">
            {announcement.description}
          </p>

          <div className="text-md font-semibold flex justify-between">
            <div className="flex items-center bg-gray-300 px-4 py-1  rounded-full">
              {getCategoryIcon(announcement.category)}
              <span>{announcement.category}</span>
            </div>
            <div className="flex items-center bg-slate-300 px-4 py-1  rounded-full">
              {getPriorityIcon(announcement.priority)}
              <span>{announcement.priority}</span>
            </div>
          </div>

          <p className="flex gap-3 items-center text-md text-gray-600 uppercase">
            <span>Finished At:</span>
            <span className="text-black font-bold">
              {formatDate(announcement.endDate)}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between flex-wrap gap-4 mt-4">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onEdit(announcement)}
          >
            <FaEdit className="mr-1" /> Edit
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(announcement._id)}
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementCard;
