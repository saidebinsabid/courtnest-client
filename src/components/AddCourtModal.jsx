import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
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

const AddCourtModal = ({ isOpen, closeModal, refetch }) => {
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
      setValue("courtId", uuidv4());
    }
  }, [isOpen, setValue]);

  const onSubmit = async (data) => {
    const courtInfo = {
      image: data.image,
      name: data.name,
      description: data.description,
      type: data.type,
      courtId: data.courtId,
      surface: data.surface,
      environment: data.environment,
      capacity: parseInt(data.capacity),
      slotDuration: data.slotDuration,
      slots: data.slots.split(",").map((s) => s.trim()),
      closedDays: data.closedDays || [],
      status: data.status,
      amenities: data.amenities || [],
      price: parseFloat(data.price),
      created_at: new Date(),
    };

    try {
      await axiosSecure.post("/courts", courtInfo);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Court added successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      reset();
      closeModal();
      refetch();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: `Could not add court- ${err}`,
      });
    }
  };

  const inputClass =
    "input input-bordered w-full bg-neutral-800 text-white border-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary";
  const selectClass =
    "select select-bordered w-full bg-neutral-800 text-white border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary";
  const labelClass = "text-gray-300 font-medium";

  return (
    <>
      {isOpen && (
        <dialog open className="modal modal-open w-full h-full fixed top-0 left-0 flex items-center justify-center z-50 bg-black/50">
          <div className="modal-box max-w-2xl w-full max-h-screen overflow-y-auto bg-gradient-to-tr from-black via-neutral-900 to-zinc-800 shadow-xl rounded-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-2xl text-gray-200">
                Add New Court
              </h3>
              <button onClick={closeModal} className="btn hover:bg-primary">
                <GiCrossMark />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Court Name</label>
                  <input
                    {...register("name", { required: true })}
                    placeholder="Enter court name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Image URL</label>
                  <input
                    type="url"
                    {...register("image", { required: true })}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Court Description</label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Describe the court"
                  className={`${inputClass} textarea`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Court Type</label>
                  <select
                    {...register("type", { required: true })}
                    className={selectClass}
                  >
                    <option value="">Select Type</option>
                    <option>Tennis</option>
                    <option>Badminton</option>
                    <option>Football</option>
                    <option>Cricket</option>
                    <option>Hockey</option>
                    <option>Basketball</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Surface Type</label>
                  <select
                    {...register("surface", { required: true })}
                    className={selectClass}
                  >
                    <option value="">Select Surface</option>
                    {surfaceOptions.map((option, i) => (
                      <option key={i}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Indoor/Outdoor</label>
                  <select
                    {...register("environment", { required: true })}
                    className={selectClass}
                  >
                    <option value="">Select</option>
                    <option>Indoor</option>
                    <option>Outdoor</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Capacity</label>
                  <input
                    type="number"
                    {...register("capacity", { required: true })}
                    placeholder="Number of players"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Slot Duration</label>
                  <input
                    {...register("slotDuration", { required: true })}
                    placeholder="e.g. 1 Hour"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Slot Times (comma separated)
                  </label>
                  <input
                    {...register("slots", { required: true })}
                    placeholder="9AM-10AM, 11AM-12PM"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Closed Days</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                  {weekdays.map((day, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <input
                        type="checkbox"
                        value={day}
                        {...register("closedDays")}
                        className="checkbox checkbox-sm checkbox-primary"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Amenities / Facilities</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  {amenitiesList.map((amenity, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <input
                        type="checkbox"
                        value={amenity}
                        {...register("amenities")}
                        className="checkbox checkbox-sm checkbox-primary"
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    {...register("status", { required: true })}
                    className={selectClass}
                  >
                    <option value="">Select Status</option>
                    {courtStatuses.map((status, i) => (
                      <option key={i}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Price per Session</label>
                  <input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="e.g. 10"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Court ID (Auto-generated)</label>
                <input
                  type="text"
                  {...register("courtId")}
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-white border-gray-600 cursor-not-allowed"
                />
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
                  Add Court
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default AddCourtModal;
