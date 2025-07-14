import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { GiCrossMark } from "react-icons/gi";

const UpdateCouponModal = ({ isOpen, closeModal, coupon, refetch }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      code: "",
      value: "",
      minAmount: "",
      startDate: "",
      endDate: "",
      status: "active",
      description: "",
    },
  });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (coupon) {
      Object.entries(coupon).forEach(([key, value]) => {
        if (key === "startDate" || key === "endDate") {
          // Format date string for date input (ensure YYYY-MM-DD)
          if (value) {
            // If value is already a string like "2025-07-23", just use it
            // If value is a Date object, convert to YYYY-MM-DD
            const dateStr =
              value instanceof Date
                ? value.toISOString().split("T")[0]
                : value.toString().slice(0, 10);
            setValue(key, dateStr);
          }
        } else {
          setValue(key, value);
        }
      });
    } else {
      reset();
    }
  }, [coupon, setValue, reset]);

  if (!isOpen || !coupon) return null;

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/coupons/${coupon._id}`, {
        ...data,
        updated_at: new Date(),
      });
      Swal.fire("Success", "Coupon updated successfully", "success");
      closeModal();
      refetch();
    } catch (err) {
      console.error("Update coupon error:", err);
      Swal.fire("Error", "Failed to update coupon", "error");
    }
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl rounded-xl shadow-xl border border-gray-200 bg-base-100 relative">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-yellow-200"
        >
          <GiCrossMark />
        </button>

        <h3 className="text-2xl font-bold text-center mb-6">Update Coupon</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Coupon Code */}
          <div className="form-control">
            <label className="label font-medium">Coupon Code</label>
            <input
              {...register("code", { required: true })}
              placeholder="e.g. SUMMER10"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          {/* Discount Value */}
          <div className="form-control">
            <label className="label font-medium">Discount Value ($)</label>
            <input
              type="number"
              {...register("value", { required: true })}
              placeholder="e.g. 20"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">
              Minimum Booking Amount (optional)
            </label>
            <input
              type="number"
              {...register("minAmount")}
              placeholder="e.g. 100"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Status</label>
            <select
              {...register("status", { required: true })}
              className="select select-bordered w-full focus:border-primary focus:outline-none"
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
              className="textarea textarea-bordered w-full focus:border-primary focus:outline-none"
              rows={3}
            />
          </div>

          <div className="modal-action justify-end">
            <button type="button" onClick={closeModal} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Coupon
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateCouponModal;
