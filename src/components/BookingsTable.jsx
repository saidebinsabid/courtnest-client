import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 10;

const BookingsTable = ({ bookings, onAccept, onReject }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className=" overflow-x-auto overflow-y-hidden">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th className="hidden lg:inline">User</th>
              <th>Email</th>
              <th>Court</th>
              <th className="hidden lg:inline">Type</th>
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
                <td className="hidden lg:inline">{booking.userName}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.courtName}</td>
                <td className="hidden lg:inline">{booking.courtType}</td>
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
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 items-center">
                  <button
                    disabled={booking.status !== "pending"}
                    onClick={() => onAccept(booking._id, booking.userEmail)}
                    className="btn btn-sm flex items-center gap-1 bg-[#facc15] text-black hover:bg-black hover:text-white transition duration-200 ease-in-out disabled:opacity-50"
                  >
                    <FaCheckCircle />
                    Accept
                  </button>
                  <button
                    disabled={booking.status !== "pending"}
                    onClick={() => onReject(booking._id)}
                    className="btn btn-sm flex items-center gap-1 bg-black text-white hover:bg-[#facc15] hover:text-black transition duration-200 ease-in-out disabled:opacity-50"
                  >
                    <FaTimesCircle />
                    Reject
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
          onPageChange={({ selected }) => setCurrentPage(selected)}
          forcePage={currentPage}
          containerClassName="flex gap-2"
          activeClassName="bg-[#facc15] text-black"
          pageClassName="border rounded cursor-pointer"
          pageLinkClassName="block px-4 py-2 cursor-pointer"
          previousLabel="←"
          nextLabel="→"
          previousClassName="border rounded cursor-pointer"
          previousLinkClassName="block px-4 py-2 cursor-pointer"
          nextClassName="border rounded cursor-pointer"
          nextLinkClassName="block px-4 py-2 cursor-pointer"
          breakLabel="..."
          breakClassName="cursor-pointer"
          breakLinkClassName="block px-4 py-2"
        />
      </div>
    </div>
  );
};

export default BookingsTable;
