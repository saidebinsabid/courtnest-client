import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const ConfirmedBookingTable = ({ bookings }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Scrollable Table */}
      <div className="overflow-x-auto overflow-y-hidden shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Court</th>
              <th>Type</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Total</th>
              <th>Status</th>
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
                <td>{booking.userName}</td>
                <td>{booking.courtName}</td>
                <td>{booking.courtType}</td>
                <td>{booking.date}</td>
                <td>
                  {booking.slots.map((slot, i) => (
                    <span key={i} className="block text-xs">
                      {slot}
                    </span>
                  ))}
                </td>
                <td>${booking.totalPrice}</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full capitalize">
                    {booking.status}
                  </span>
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

export default ConfirmedBookingTable;
