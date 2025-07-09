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

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border relative">
      <img src={court.image} alt={court.type} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold capitalize">{court.type}</h3>
        <p className="text-sm font-medium">Price/Session: ${court.price}</p>
        <div className="text-sm">
          <span className="font-semibold">Slots:</span>
          <ul className="list-disc pl-5">
            {court.slots?.map((slot, i) => (
              <li key={i}>{slot}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-3">
          <button
  onClick={() => setEditingCourt(court)}
  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
>
  <FaEdit /> Update
</button>
          <button
            onClick={() => handleDelete(court._id)}
            className="text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedCourtCard;
