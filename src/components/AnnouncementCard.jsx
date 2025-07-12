
// AnnouncementCard.jsx
import { FaEdit, FaTrash } from "react-icons/fa";

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  return (
    <div className="bg-base-100 border shadow rounded-lg overflow-hidden">
      <img src={announcement.photoUrl} alt="banner" className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{announcement.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{announcement.category} | {announcement.priority}</p>
        <p className="text-sm mb-2">{announcement.description?.slice(0, 100)}...</p>
        <p className="text-xs text-gray-500 mb-1">From: {announcement.startDate?.slice(0, 10)} to {announcement.endDate?.slice(0, 10)}</p>
        <p className="text-xs text-gray-500 mb-2">By: {announcement.createdBy}</p>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => onEdit(announcement)}><FaEdit /></button>
          <button className="btn btn-sm btn-error" onClick={() => onDelete(announcement._id)}><FaTrash /></button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
