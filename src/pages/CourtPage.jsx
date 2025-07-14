import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourtCard from "../components/CourtCard";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";
import ReactPaginate from "react-paginate";

const CourtPage = () => {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts", page],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts/details");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedCourts = courts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(courts.length / itemsPerPage);

  return (
    <div className="w-11/12 mx-auto py-16">
      <h1 className="text-xl md:text-4xl flex items-center gap-1 font-bold mb-6">
        Available {courts.length} <span className="text-primary font-poppins">Courts</span>
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {paginatedCourts.map((court) => (
          <CourtCard key={court._id} court={court} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
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

export default CourtPage;
