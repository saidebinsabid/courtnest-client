import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 10;

const ApprovedBookingTable = ({ bookings, onCancel, onPay }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Court</th>
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
                  <span className="px-2 py-1 rounded text-xs font-medium uppercase bg-green-100 text-green-700">
                    {booking.status}
                  </span>
                </td>
                <td className="flex flex-col gap-2">
                  <button
                    onClick={() => onPay(booking)}
                    className="btn btn-sm flex items-center gap-1 bg-[#facc15] text-black hover:bg-black hover:text-white transition duration-200 ease-in-out disabled:opacity-50"
                  >
                    Pay ${booking.totalPrice}
                  </button>

                  <button
                    onClick={() => onCancel(booking._id)}
                    className="btn btn-sm flex items-center gap-1 bg-black text-white hover:bg-[#facc15] hover:text-black transition duration-200 ease-in-out disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default ApprovedBookingTable;
