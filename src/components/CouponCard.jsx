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

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div
      className="rounded-lg p-6 bg-[#fafafa] border border-[#ddd] shadow-sm min-h-[260px] flex flex-col justify-between font-mon"
      style={{ color: "#111" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold tracking-widest">{code}</h2>
      </div>

      <p className="mb-5 text-md font-semibold text-gray-600 text-center">
        Save <span className="text-2xl text-black">{value}%</span> on bookings
        over <span>${minAmount || 0}</span>
      </p>

      {description && (
        <p className="text-sm mb-6 leading-relaxed text-gray-600 line-clamp-3 text-center">
          {description}
        </p>
      )}

      <p className="text-sm font-medium text-gray-600 text-center">
        Valid: <span className="text-black">{formatDate(startDate)}</span> to{" "}
        <span className="text-black">{formatDate(endDate)}</span>
      </p>

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
  );
};

export default CouponCard;
