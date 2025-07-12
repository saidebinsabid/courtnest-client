import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddAnnouncementModal = ({ isOpen, closeModal, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      setValue("createdBy", `${user?.displayName} (${user?.email})`);
    }
  }, [isOpen, user, setValue]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/announcements", {
        ...data,
        created_at: new Date(),
      });
      Swal.fire("Success", "Announcement added", "success");
      reset();
      closeModal();
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to add announcement", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 relative rounded-xl border border-gray-200">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-red-200"
        >
          ✕
        </button>

        <h3 className="font-bold text-2xl mb-6 text-center">Add New Announcement</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="form-control">
            <label className="label font-medium">Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Enter title"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write a description"
              className="textarea textarea-bordered w-full focus:border-primary focus:outline-none"
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-medium">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full focus:border-primary focus:outline-none"
            >
              <option value="">Select Category</option>
              <option>General</option>
              <option>Event</option>
              <option>Alert</option>
              <option>Maintenance</option>
              <option>Update</option>
            </select>
          </div>

          {/* Priority */}
          <div className="form-control">
            <label className="label font-medium">Priority</label>
            <select
              {...register("priority", { required: true })}
              className="select select-bordered w-full focus:border-primary focus:outline-none"
            >
              <option value="">Select Priority</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="form-control">
            <label className="label font-medium">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          {/* End Date */}
          <div className="form-control">
            <label className="label font-medium">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label font-medium">Photo URL</label>
            <input
              type="url"
              {...register("photoUrl", { required: true })}
              placeholder="https://example.com/banner.jpg"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          {/* Created By (readonly) */}
          <div className="form-control">
            <label className="label font-medium">Created By</label>
            <input
              type="text"
              {...register("createdBy")}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-action justify-end">
            <button type="button" onClick={closeModal} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddAnnouncementModal;
