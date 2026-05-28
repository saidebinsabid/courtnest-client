import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CreatedCourtCard = ({ court, refetch, setEditingCourt }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The court has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );

  return (
    <div className="bg-base-200 rounded-xl shadow-sm hover:shadow-md border border-base-300 transition-all duration-300">
      <div className="relative">
        <img
          src={court.image}
          alt={court.type}
          loading="lazy"
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-0 left-0 px-3 py-1 text-xs font-semibold bg-[#facc15] text-black rounded-tr-full uppercase tracking-wide shadow">
          {court.type}
        </div>
      </div>

      <div className="p-5 text-black space-y-4">
        <div>
          <h3 className="text-xl font-bold">{court.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{court.description}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <DetailItem label="Surface" value={court.surface} />
          <DetailItem label="Environment" value={court.environment} />
          <DetailItem label="Capacity" value={`${court.capacity} players`} />
          <DetailItem label="Slot" value={court.slotDuration} />
          <DetailItem label="Price" value={`$${court.price}`} />
        </div>

        {court.slots?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Available Slots</h4>
            <div className="flex flex-wrap gap-2">
              {court.slots.map((slot, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        )}

        {court.closedDays?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Closed Days</h4>
            <div className="flex flex-wrap gap-2">
              {court.closedDays.map((day, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-base-300 rounded">
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}

        {court.amenities?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {court.amenities.map((a, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t border-base-300">
          <button
            onClick={() => setEditingCourt(court)}
            className="text-sm text-black hover:text-white bg-[#facc15] hover:bg-yellow-500 font-medium px-4 py-1.5 rounded-md flex items-center gap-1 transition"
          >
            <FaEdit className="text-sm" /> Update
          </button>

          <button
            onClick={() => handleDelete(court._id)}
            className="text-sm text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-1.5 rounded-md flex items-center gap-1 transition"
          >
            <FaTrash className="text-sm" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedCourtCard;
