import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { FaTimesCircle } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

const PendingBookingTable = ({ bookings, onCancel }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Scrollable Table */}
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Court</th>
              <th>Type</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, idx) => (
              <motion.tr
                key={booking._id}
                className={`${idx % 2 === 0 ? "bg-base-300" : "bg-base-200"}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <td>{offset + idx + 1}</td>
                <td>{booking.courtName}</td>
                <td>{booking.courtType}</td>
                <td>{booking.date}</td>
                <td>
                  {booking.slots?.map((slot, i) => (
                    <span key={i} className="block text-xs">
                      {slot}
                    </span>
                  ))}
                </td>
                <td>${booking.totalPrice}</td>
                <td>
                  <span className="px-2 py-1 rounded text-xs font-medium uppercase bg-yellow-100 text-yellow-700">
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onCancel(booking._id)}
                    className="btn btn-sm flex items-center gap-1 bg-[#facc15] text-black"
                  >
                    <FaTimesCircle />
                    Cancel
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          pageCount={Math.ceil(bookings.length / ITEMS_PER_PAGE)}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          activeClassName={"bg-[#facc15] text-black"}
          pageClassName={"border px-3 py-1 rounded hover:bg-base-300"}
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          previousClassName={"px-3 py-1 border rounded"}
          nextClassName={"px-3 py-1 border rounded"}
        />
      </div>
    </div>
  );
};

export default PendingBookingTable;
