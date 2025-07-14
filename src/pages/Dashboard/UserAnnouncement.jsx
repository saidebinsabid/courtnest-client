import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import ShowAnnouncementCard from "../../components/ShowAnnouncementCard";
import ReactPaginate from "react-paginate";
import { FaInfoCircle } from "react-icons/fa";

const UserAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: updates = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["userAnnouncements", "Update"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/upadte-announcements?category=Update"
      );
      return res.data;
    },
  });

  if (isLoading || isFetching) return <Loading />;

  const totalPages = Math.ceil(updates.length / itemsPerPage);
  const paginatedUpdates = updates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest Updates</h2>

      {updates.length === 0 ? (
        <div className="text-center py-12 text-gray-500 flex flex-col items-center gap-2">
          <FaInfoCircle className="text-4xl text-yellow-400" />
          <p className="text-black">No updates available at this time.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
            {paginatedUpdates.map((announcement) => (
              <ShowAnnouncementCard
                key={announcement._id}
                announcement={announcement}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center">
            <ReactPaginate
              pageCount={totalPages}
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
        </>
      )}
    </div>
  );
};

export default UserAnnouncement;
