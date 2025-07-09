import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';


const UpdateCourtModal = ({ isOpen, closeModal, court, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    image: '',
    type: '',
    slotTimes: [],
    price: '',
  });

  useEffect(() => {
    if (court) {
      setFormData({
        image: court.image || '',
        type: court.type || '',
        slotTimes: court.slotTimes || [],
        price: court.price || '',
      });
    }
  }, [court]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (e, idx) => {
    const newSlots = [...formData.slotTimes];
    newSlots[idx] = e.target.value;
    setFormData({ ...formData, slotTimes: newSlots });
  };

  const addSlot = () => {
    setFormData({ ...formData, slotTimes: [...formData.slotTimes, ''] });
  };

  const removeSlot = (idx) => {
    const newSlots = formData.slotTimes.filter((_, i) => i !== idx);
    setFormData({ ...formData, slotTimes: newSlots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/courts/${court._id}`, formData);
      toast.success('Court updated successfully!');
      refetch();
      closeModal();
    } catch (error) {
      toast.error('Failed to update court');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Update Court</h3>
          <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Court Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Slot Times</label>
            {formData.slotTimes.map((slot, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={slot}
                  onChange={(e) => handleSlotChange(e, idx)}
                  required
                  className="input input-bordered w-full"
                />
                <button type="button" onClick={() => removeSlot(idx)} className="btn btn-xs btn-error">
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={addSlot} className="btn btn-sm mt-2">
              Add Slot
            </button>
          </div>

          <div>
            <label className="block mb-1 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="modal-action">
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

export default UpdateCourtModal;
