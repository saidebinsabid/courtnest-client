import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CouponCard = ({ coupon, refetch, setEditingCoupon }) => {
  const axiosSecure = useAxiosSecure();

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
        const res = await axiosSecure.delete(`/coupons/${coupon._id}`);
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
    <div className="card bg-base-100 shadow-md border border-base-300 p-4">
      <h3 className="font-semibold text-lg text-primary mb-1">{coupon.code}</h3>
      <p>Discount: <span className="font-medium">${coupon.value}</span></p>
      <p>Min Amount: ${coupon.minAmount || "None"}</p>
      <p>
        Status:{" "}
        <span
          className={`font-bold ${
            coupon.status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {coupon.status}
        </span>
      </p>
      <p className="text-sm">
        Valid:{" "}
        <span className="text-gray-700">
          {coupon.startDate} to {coupon.endDate}
        </span>
      </p>
      {coupon.description && (
        <p className="text-sm mt-2 text-gray-600">{coupon.description}</p>
      )}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="btn btn-sm btn-outline btn-primary"
          onClick={() => setEditingCoupon(coupon)}
        >
          <FaEdit className="mr-1" /> Update
        </button>
        <button className="btn btn-sm btn-outline btn-error" onClick={handleDelete}>
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
