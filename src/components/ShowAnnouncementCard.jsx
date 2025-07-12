// ShowAnnouncementCard.jsx
import { FaBullhorn, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";

const ShowAnnouncementCard = ({ announcement }) => {
  const {
    title,
    description,
    category,
    priority,
    startDate,
    endDate,
    photoUrl,
    createdBy,
  } = announcement;

  return (
    <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden border border-base-300">
      <img src={photoUrl} alt={title} className="w-full h-52 object-cover" />
      <div className="p-5 space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaBullhorn className="text-primary" /> {title}
        </h2>
        <p className="text-sm text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-3 text-sm mt-3">
          <span className="flex items-center gap-1 bg-base-200 px-2 py-1 rounded">
            <MdUpdate className="text-blue-400" /> {category}
          </span>
          <span className="flex items-center gap-1 bg-base-200 px-2 py-1 rounded">
            <FaExclamationTriangle className="text-red-400" /> {priority}
          </span>
          <span className="flex items-center gap-1 bg-base-200 px-2 py-1 rounded">
            <FaCalendarAlt className="text-green-400" /> {startDate} to {endDate}
          </span>
        </div>
        <p className="text-xs text-gray-400 italic mt-2">Created By: {createdBy}</p>
      </div>
    </div>
  );
};

export default ShowAnnouncementCard;
