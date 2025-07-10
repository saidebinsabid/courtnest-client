// CourtPage.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourtCard from "../components/CourtCard";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";

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

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-11/12 mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">
        Available {courts.length} <span className="text-primary">Courts</span>
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedCourts.map((court) => (
          <CourtCard key={court._id} court={court} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          &larr;
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          const isActive = pageNumber === page;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 flex justify-center items-center rounded cursor-pointer
          ${
            isActive
              ? "bg-primary text-black"
              : "bg-base-100 text-gray-700 hover:bg-gray-200"
          }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default CourtPage;
