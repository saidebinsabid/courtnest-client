// ManageAnnouncement.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaExclamationCircle, FaPlus } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import AddAnnouncementModal from "../../components/AddAnnouncementModal";
import AnnouncementCard from "../../components/AnnouncementCard";
import UpdateAnnouncementModal from "../../components/UpdateAnnouncementModal";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const ManageAnnouncement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const isUpdateModalOpen = Boolean(editingAnnouncement);
  const closeUpdateModal = () => setEditingAnnouncement(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const axiosSecure = useAxiosSecure();

  const {
    data: announcements = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the announcement.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/announcements/${id}`);
      Swal.fire("Deleted!", "Announcement has been deleted.", "success");
      refetch();
    }
  };

  if (isLoading || isFetching) return <Loading />;

  // Calculate total pages
  const pageCount = Math.ceil(announcements.length / itemsPerPage);

  // Slice data for current page
  const paginatedAnnouncements = announcements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-11/12 mx-auto py-16">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-base-300 px-3 py-3 rounded shadow-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Show {announcements.length} Announcements</h2>
        </div>
        <div>
          <button
            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded hover:bg-primary/90"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add Announcement
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <AddAnnouncementModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}

      {/* List or Empty Message */}
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <FaExclamationCircle className="text-6xl text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold text-black">No announcements yet</h3>
          <p className="text-gray-500 mt-2">Add a new announcement to notify users.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          {paginatedAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement._id}
              announcement={announcement}
              refetch={refetch}
              onEdit={setEditingAnnouncement}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Update modal */}
      {isUpdateModalOpen && (
        <UpdateAnnouncementModal
          isOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          announcement={editingAnnouncement}
          refetch={refetch}
        />
      )}

      {/* React Pagination */}
        <div className="mt-10 flex justify-center items-center">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName="flex gap-2"
            activeClassName="bg-yellow-400 text-black"
            pageClassName="border rounded cursor-pointer"
            pageLinkClassName="block px-4 py-2"
            previousLabel="←"
            nextLabel="→"
            previousClassName="border rounded cursor-pointer"
            previousLinkClassName="block px-4 py-2"
            nextClassName="border rounded cursor-pointer"
            nextLinkClassName="block px-4 py-2"
            breakLabel="..."
            breakClassName="cursor-pointer"
            breakLinkClassName="block px-4 py-2"
          />
        </div>
    </div>
  );
};

export default ManageAnnouncement;
