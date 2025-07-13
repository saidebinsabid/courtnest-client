import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { GiCrossMark } from "react-icons/gi";

const UpdateAnnouncementModal = ({
  isOpen,
  closeModal,
  announcement,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    priority: "Normal",
    startDate: "",
    endDate: "",
    photoUrl: "",
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title || "",
        description: announcement.description || "",
        category: announcement.category || "General",
        priority: announcement.priority || "Normal",
        startDate: (announcement.startDate || "").slice(0, 10),
        endDate: (announcement.endDate || "").slice(0, 10),
        photoUrl: announcement.photoUrl || "",
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/announcements/${announcement._id}`, {
        ...formData,
        updated_at: new Date(),
      });
      Swal.fire("Success", "Announcement updated", "success");
      closeModal();
      refetch();
    } catch (err) {
      Swal.fire("Error", "Update failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 border border-gray-200 rounded-xl relative">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-yellow-200"
        >
          <GiCrossMark />
        </button>

        <h3 className="font-bold text-2xl mb-6 text-center">
          Update Announcement
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a description"
              className="textarea textarea-bordered w-full focus:border-primary focus:outline-none"
              rows={3}
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full focus:border-primary focus:outline-none"
            >
              <option>General</option>
              <option>Event</option>
              <option>Alert</option>
              <option>Maintenance</option>
              <option>Update</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="select select-bordered w-full focus:border-primary focus:outline-none"
            >
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Photo URL</label>
            <input
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="https://example.com/banner.jpg"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
            />
          </div>

          <div className="modal-action justify-end">
            <button type="button" className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateAnnouncementModal;
