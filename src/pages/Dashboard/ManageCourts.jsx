import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaExclamationCircle, FaPlus } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddCourtModal from "../../components/AddCourtModal";
import UpdateCourtModal from "../../components/UpdateCourtModal";
import CreatedCourtCard from "../../components/CreatedCourtCard";
import Loading from "../../components/Loading";
import ReactPaginate from "react-paginate";

const ManageCourts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);
  const isUpdateModalOpen = Boolean(editingCourt);
  const closeUpdateModal = () => setEditingCourt(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const axiosSecure = useAxiosSecure();
  const {
    data: courts = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["courts", selectedCategory],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts?category=${selectedCategory}`);
      return res.data;
    },
  });

  const categories = [
    { label: "All Courts", value: "all" },
    { label: "Tennis", value: "Tennis" },
    { label: "Badminton", value: "Badminton" },
    { label: "Football", value: "Football" },
    { label: "Cricket", value: "Cricket" },
    { label: "Hockey", value: "Hockey" },
    { label: "Basketball", value: "Basketball" },
  ];
  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="w-11/12 mx-auto py-16">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-base-300 px-3 py-3 rounded shadow-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Show {courts.length} Courts</h2>
        </div>
        <div className="flex-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="select border rounded py-2 bg-base-200"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <button
            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded hover:bg-primary/90"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add New Court
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AddCourtModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}

      {courts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 p-8 border rounded-lg bg-base-200 text-center">
          <FaExclamationCircle className="text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">
            No court added yet
          </h3>
          <p className="text-gray-500 mt-2">
            Please add a new court to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-6 mt-8">
          {courts
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((court) => (
              <CreatedCourtCard
                key={court._id}
                court={court}
                refetch={refetch}
                setEditingCourt={setEditingCourt}
              />
            ))}
        </div>
      )}

      {isUpdateModalOpen && (
        <UpdateCourtModal
          isOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          court={editingCourt}
          refetch={refetch}
        />
      )}

      <div className="mt-10 flex justify-center items-center">
        <ReactPaginate
          pageCount={Math.ceil(courts.length / itemsPerPage)}
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

export default ManageCourts;
