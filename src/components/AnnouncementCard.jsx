import { FaEdit, FaTrash } from "react-icons/fa";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaTools,
  FaSyncAlt,
} from "react-icons/fa";
import { MdLowPriority, MdPriorityHigh } from "react-icons/md";
import { BsFillLightningFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "General":
        return <FaBullhorn className="inline-block mr-1 text-yellow-300" />;
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

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow border bg-cover bg-center"
      style={{
        backgroundImage: `url(${announcement.photoUrl})`,
        minHeight: "240px",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"></div>
      <div className="relative p-4 text-white flex flex-col h-full justify-between">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">
            {announcement.title}
          </h3>
          <p className="text-sm">
            <span className="bg-white text-black px-2 py-1 rounded-full">
              {getCategoryIcon(announcement.category)}
              {announcement.category}
            </span>{" "}
            ||{" "}
            <span className="bg-black text-white px-2 py-1 rounded-full">
              {getPriorityIcon(announcement.priority)}
              {announcement.priority}
            </span>
          </p>

          <p className="text-md font-semibold flex items-center gap-2">
            <BsTextParagraph className="text-base text-white" />
            {announcement.description?.slice(0, 100)}...
          </p>

          <p className="text-xs flex items-center gap-2">
            <FaCalendarAlt className="text-sm text-white" />
            From: {announcement.startDate?.slice(0, 10)} to{" "}
            {announcement.endDate?.slice(0, 10)}
          </p>

          <p className="text-xs flex items-center gap-2">
            <FaUser className="text-sm text-white" />
            By: {announcement.createdBy}
          </p>
        </div>

        <div className="flex justify-between mt-5">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onEdit(announcement)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(announcement._id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
