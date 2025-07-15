import React from "react";
import { GiCrossMark } from "react-icons/gi";

const DescriptionModal = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
         <GiCrossMark />
        </button>
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-800 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default DescriptionModal;
