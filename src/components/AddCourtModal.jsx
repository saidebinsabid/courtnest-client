import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddCourtModal = ({ isOpen, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.slots || data.slots.length === 0) {
      toast.error("Please provide at least one slot time");
      return;
    }

    const courtInfo = {
      image: data.image,
      type: data.type,
      slots: data.slots.split(",").map((s) => s.trim()),
      price: parseFloat(data.price),
      created_at: new Date(),
    };

    try {
      await axiosSecure.post("/courts", courtInfo);
      toast.success("Court added successfully!");
      reset();
      closeModal();
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add court");
    }
  };

  return (
    <>
      {isOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Add New Court</h3>
              <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Court Image URL</label>
                <input
                  type="url"
                  {...register("image", { required: true })}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                />
                {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Court Type</label>
                <select {...register("type", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Type</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Basketball">Basketball</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Slot Times (comma separated)</label>
                <input
                  type="text"
                  {...register("slots", { required: true })}
                  placeholder="e.g. 9AM-10AM, 11AM-12PM"
                  className="input input-bordered w-full"
                />
                {errors.slots && <p className="text-red-500 text-sm">Slots are required</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Price per Session</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="$25"
                  className="input input-bordered w-full"
                />
                {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
              </div>

              <div className="modal-action">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
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
