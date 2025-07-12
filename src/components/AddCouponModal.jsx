import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddCouponModal = ({ isOpen, closeModal, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/coupons", { ...data, created_at: new Date() });
      Swal.fire("Success", "Coupon added successfully", "success");
      reset();
      closeModal();
      refetch();
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Failed to add coupon", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl rounded-xl shadow-xl border border-gray-200 bg-base-100 relative">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-red-200"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-center mb-6">Add New Coupon</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Coupon Code */}
          <div className="form-control">
            <label className="label font-medium">Coupon Code</label>
            <input
              {...register("code", { required: true })}
              placeholder="e.g. SUMMER10"
              className="input input-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
            />
          </div>

          {/* Discount Value */}
          <div className="form-control">
            <label className="label font-medium">Discount Value ($)</label>
            <input
              type="number"
              {...register("value", { required: true })}
              placeholder="e.g. 20"
              className="input input-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
            />
          </div>

          {/* Minimum Booking Amount */}
          <div className="form-control">
            <label className="label font-medium">Minimum Booking Amount (optional)</label>
            <input
              type="number"
              {...register("minAmount")}
              placeholder="e.g. 100"
              className="input input-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
            />
          </div>

          {/* Start Date */}
          <div className="form-control">
            <label className="label font-medium">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="input input-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
            />
          </div>

          {/* End Date */}
          <div className="form-control">
            <label className="label font-medium">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="input input-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
            />
          </div>

          {/* Status */}
          <div className="form-control">
            <label className="label font-medium">Status</label>
            <select
              {...register("status", { required: true })}
              className="select select-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-medium">Coupon Description</label>
            <textarea
              {...register("description")}
              placeholder="Write a short note about this coupon"
              className="textarea textarea-bordered w-full focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-action justify-end">
            <button type="button" onClick={closeModal} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddCouponModal;
