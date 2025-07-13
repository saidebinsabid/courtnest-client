import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const PaymentHistoryTable = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPayments = payments.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-hidden shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Paid At</th>
              <th>Court</th>
              <th>Slots</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((item, idx) => (
              <motion.tr
                key={item._id}
                className={`${idx % 2 === 0 ? "bg-base-300" : "bg-base-200"}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <td>{offset + idx + 1}</td>
                <td className="font-medium">
                  <span className="bg-green-100 px-2 py-1 rounded-full">
                    {item.transactionId}
                  </span>
                </td>
                <td>${item.paymentAmount}</td>
                <td>{item.paymentMethod}</td>
                <td>{new Date(item.paidAt).toLocaleString()}</td>
                <td>{item.courtName}</td>
                <td>
                  {item.slots.map((slot, i) => (
                    <span key={i} className="block text-xs">
                      {slot}
                    </span>
                  ))}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          pageCount={Math.ceil(payments.length / ITEMS_PER_PAGE)}
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

export default PaymentHistoryTable;
