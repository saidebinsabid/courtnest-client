import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFilter, FaClipboardList } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ShowAnnouncementCard from "../components/ShowAnnouncementCard";

const categories = [
  "All",
  "General",
  "Event",
  "Alert",
  "Maintenance",
  "Update",
];
const ITEMS_PER_PAGE = 6;

const AnnouncementSummaryFilter = () => {
  const axios = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const { data = { count: 0, data: [] }, isLoading } = useQuery({
    queryKey: ["announcements", selectedCategory],
    queryFn: async () => {
      const endpoint =
        selectedCategory === "All"
          ? "/public-announcements"
          : `/public-announcements?category=${selectedCategory}`;
      const res = await axios.get(endpoint);
      return res.data;
    },
  });

  const announcements = data.data;
  const totalCount = data.count;

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = announcements.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <section className="py-16 w-full bg-base-100">
      <div className="w-11/12 mx-auto space-y-10">
        {/* Top bar */}
        <div className="flex flex-wrap sm:flex-row justify-between items-center gap-4 bg-base-200 py-2 px-4 rounded">
          <h2 className="text-xl md:text-4xl font-bold flex items-center gap-2 text-black">
            <FaClipboardList /> Show All {totalCount} <h2 className="text-primary">Announcements</h2>
          </h2>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="focus:border-primary border-2 border-gray-300 py-2 px-2 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentItems.length === 0 && !isLoading ? (
          <div className="text-center text-gray-500 py-20 flex flex-col items-center">
            <MdAnnouncement className="text-6xl text-warning mb-4" />
            <p className="text-lg font-semibold">
              No announcements found for category: {selectedCategory}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {currentItems.map((announcement) => (
              <ShowAnnouncementCard
                key={announcement._id}
                announcement={announcement}
              />
            ))}
          </motion.div>
        )}


          <div className="flex justify-center mt-8">
            <ReactPaginate
              pageCount={Math.ceil(announcements.length / ITEMS_PER_PAGE)}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              forcePage={currentPage}
              containerClassName="flex gap-2"
              activeClassName="bg-yellow-400 text-white"
              pageClassName="border rounded"
              pageLinkClassName="block px-4 py-2"
              previousLabel="←"
              nextLabel="→"
              previousClassName="border rounded"
              previousLinkClassName="block px-4 py-2"
              nextClassName="border rounded"
              nextLinkClassName="block px-4 py-2"
              breakLabel="..."
              breakClassName="cursor-pointer"
              breakLinkClassName="block px-4 py-2"
            />
          </div>
      </div>
    </section>
  );
};

export default AnnouncementSummaryFilter;
