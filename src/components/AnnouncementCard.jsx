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
      className="flex mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      {/* Image side - 70% */}
      <div style={{ width: "50%" }} className="min-h-[240px]">
        <img
          src={announcement.photoUrl}
          alt={announcement.title}
          className="w-full h-full object-cover p-4"
        />
      </div>

      {/* Info side - 30% */}
      <div
        style={{ width: "50%" }}
        className="p-4 flex flex-col justify-between text-gray-900"
      >
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">{announcement.title}</h3>

          <p className="text-sm text-gray-500 line-clamp-3">
            {announcement.description}
          </p>

          <div className="text-xs font-semibold space-y-1">
            <div className="flex items-center gap-1">
              {getCategoryIcon(announcement.category)}
              <span>{announcement.category}</span>
            </div>
            <div className="flex items-center gap-1">
              {getPriorityIcon(announcement.priority)}
              <span>{announcement.priority}</span>
            </div>
          </div>

          <p className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="mr-1" />
            {formatDate(announcement.startDate)} -{" "}
            {formatDate(announcement.endDate)}
          </p>

          <p className="flex items-center text-xs text-gray-600">
            <FaUser className="mr-1" />
            By: {announcement.createdBy}
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
