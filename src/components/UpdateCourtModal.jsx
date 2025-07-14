import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { GiCrossMark } from "react-icons/gi";

const surfaceOptions = ["Grass", "Clay", "Hard", "Synthetic", "Wooden"];
const courtStatuses = ["Available", "Maintenance", "Unavailable"];
const amenitiesList = [
  "Changing Room",
  "Washroom",
  "Parking",
  "Drinking Water",
  "Lighting",
  "Equipment Available (Racquets, Balls)",
  "Seating Area",
  "First Aid Kit",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const UpdateCourtModal = ({ isOpen, closeModal, court, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    type: "",
    surface: "",
    environment: "",
    capacity: "",
    slotDuration: "",
    slots: [""],
    closedDays: [],
    amenities: [],
    status: "",
    price: "",
  });

  useEffect(() => {
    if (court) {
      setFormData({
        image: court.image || "",
        name: court.name || "",
        description: court.description || "",
        type: court.type || "",
        surface: court.surface || "",
        environment: court.environment || "",
        capacity: court.capacity || "",
        slotDuration: court.slotDuration || "",
        slots: court.slots || [""],
        closedDays: court.closedDays || [],
        amenities: court.amenities || [],
        status: court.status || "",
        price: court.price || "",
      });
    }
  }, [court]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setFormData((prev) => {
      const updated = isChecked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return { ...prev, [field]: updated };
    });
  };

  const handleSlotChange = (e, idx) => {
    const updatedSlots = [...formData.slots];
    updatedSlots[idx] = e.target.value;
    setFormData((prev) => ({ ...prev, slots: updatedSlots }));
  };

  const addSlot = () => {
    setFormData((prev) => ({ ...prev, slots: [...prev.slots, ""] }));
  };

  const removeSlot = (idx) => {
    const updatedSlots = formData.slots.filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, slots: updatedSlots }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/courts/${court._id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Court updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        closeModal();
        refetch();
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: `Something went wrong while updating the court- ${err}`,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-screen overflow-y-auto bg-gradient-to-tr from-black via-neutral-900 to-zinc-800 shadow-xl rounded-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-2xl text-gray-200">Update Court</h3>
          <button onClick={closeModal} className="btn hover:bg-primary">
            <GiCrossMark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300">Court Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input input-bordered w-full bg-neutral-800 text-white border-gray-600 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-gray-300">Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="input input-bordered w-full bg-neutral-800 text-white border-gray-600 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full bg-neutral-800 text-white border-gray-600 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered w-full bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary"
              >
                <option value="">Select</option>
                <option>Tennis</option>
                <option>Badminton</option>
                <option>Football</option>
                <option>Cricket</option>
                <option>Hockey</option>
                <option>Basketball</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300">Surface</label>
              <select
                name="surface"
                value={formData.surface}
                onChange={handleChange}
                className="select select-bordered w-full bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary"
              >
                <option value="">Select</option>
                {surfaceOptions.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300">Environment</label>
              <select
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                className="select select-bordered w-full bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary"
              >
                <option value="">Select</option>
                <option>Indoor</option>
                <option>Outdoor</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300">Capacity</label>
              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="input input-bordered w-full bg-neutral-800 text-white border-gray-600 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300">Slot Duration</label>
              <input
                name="slotDuration"
                value={formData.slotDuration}
                onChange={handleChange}
                required
                className="input input-bordered w-full bg-neutral-800 text-white border-gray-600 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-gray-300">Slot Times</label>
              {formData.slots.map((slot, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    value={slot}
                    onChange={(e) => handleSlotChange(e, idx)}
                    required
                    className="input input-bordered flex-1 bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeSlot(idx)}
                    className="btn btn-xs btn-error"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSlot}
                className="btn btn-sm mt-1"
              >
                + Add Slot
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-300">Closed Days</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {weekdays.map((day, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <input
                    type="checkbox"
                    value={day}
                    checked={formData.closedDays.includes(day)}
                    onChange={(e) => handleCheckboxChange(e, "closedDays")}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-300">Amenities</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {amenitiesList.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.amenities.includes(item)}
                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary"
              >
                {courtStatuses.map((status, i) => (
                  <option key={i}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-300">Price</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                className="input input-bordered w-full bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={closeModal}
              className="btn text-black"
            >
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

export default UpdateCourtModal;
