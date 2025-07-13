import React from "react";
import {
  FaTrash,
  FaEdit,
  FaTags,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CouponCard = ({ coupon, refetch, setEditingCoupon }) => {
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    code,
    value,
    minAmount,
    startDate,
    endDate,
    status,
    description,
    photo,
  } = coupon;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this coupon!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/coupons/${_id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Coupon has been deleted.", "success");
          refetch();
        } else {
          Swal.fire("Error", "Failed to delete the coupon.", "error");
        }
      } catch (err) {
        console.error("Delete Error:", err);
        Swal.fire("Error", "Server error occurred.", "error");
      }
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow border text-white min-h-[260px]"
      style={{
        backgroundImage: photo ? `url(${photo})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.46)]" />

      <div className="relative z-10 p-4 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="border-5 border-t-0 border-r-0 max-w-2/4">
            {" "}
            <h3 className="text-2xl md:text-4xl font-bold font-mono bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              {code}
            </h3>
          </div>
          <p className="absolute right-0 top-0 flex items-center gap-1 bg-black px-3 py-1 rounded-tl-full text-md font-semibold">
            <FaTags className="text-yellow-300" />
            Discount:{" "}
            <span className="font-medium">
              {minAmount ? ((value / minAmount) * 100).toFixed(0) : 0}%
            </span>
          </p>

          {description && (
            <p className="text-sm text-gray-200">{description}</p>
          )}

          <div className="space-y-2">
            <p className="text-sm flex items-center gap-1">
              <FaMoneyBillWave className="text-yellow-400" />
              Min Amount: ${minAmount || "None"}
            </p>

            <p className="text-sm flex items-center gap-1">
              {status === "active" ? (
                <FaCheckCircle className="text-green-400" />
              ) : (
                <FaTimesCircle className="text-red-400" />
              )}
              Status:{" "}
              <span
                className={`font-bold uppercase ${
                  status === "active" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status}
              </span>
            </p>

            <p className="text-sm flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              Valid: {formatDate(startDate)} to {formatDate(endDate)}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => setEditingCoupon(coupon)}
          >
            <FaEdit className="mr-1" /> Update
          </button>
          <button
            className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
