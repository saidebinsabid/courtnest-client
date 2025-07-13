import {
  FaCalendarAlt,
} from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { MdLowPriority, MdPriorityHigh } from "react-icons/md";
import { BsFillLightningFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { BsTextParagraph } from "react-icons/bs";
const ShowAnnouncementCard = ({ announcement }) => {
  const {
    title,
    description,
    category,
    priority,
    startDate,
    endDate,
    photoUrl,
  } = announcement;

  const getCategoryIcon = (category) => {
    switch (category) {
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
 <motion.div
      whileHover={{ scale: 1.03 }}        
      transition={{ duration: 0.3 }}     
      className="relative rounded-lg overflow-hidden shadow border bg-cover bg-center"
      style={{
        backgroundImage: `url(${photoUrl})`,
        minHeight: "240px",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" />
      <div className="relative p-4 text-white flex flex-col h-full justify-between">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-sm">
            <span className="bg-white text-black px-2 py-1 rounded-full">
              {getCategoryIcon(category)}
              {category}
            </span>{" "}
            ||{" "}
            <span className="bg-black text-white px-2 py-1 rounded-full">
              {getPriorityIcon(priority)}
              {priority}
            </span>
          </p>

          <p className="text-md font-semibold flex items-center gap-2">
            <BsTextParagraph className="text-base text-white" />
            {description?.slice(0, 100)}...
          </p>

          <p className="text-xs flex items-center gap-2">
            <FaCalendarAlt className="text-sm text-white" />
            From: {startDate?.slice(0, 10)} - {endDate?.slice(0, 10)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowAnnouncementCard;
