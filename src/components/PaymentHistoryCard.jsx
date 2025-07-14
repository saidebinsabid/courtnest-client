import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  FaMoneyBill,
  FaCreditCard,
  FaCalendarAlt,
  FaFutbol,
  FaClock,
  FaHashtag,
} from "react-icons/fa";
import cardSignal from "../assets/card_signal.png";
import cardSim from "../assets/card_sim.png";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

const PaymentHistoryCard = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPayments = payments.slice(offset, offset + ITEMS_PER_PAGE);

  const formatAmount = (amount) => {
    const numeric = Math.floor(amount).toString();
    const padded = ("0" + numeric).padStart(16, "0");
    return padded.match(/.{1,4}/g).join(" ");
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {currentPayments.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-[#111827] relative text-white p-5 rounded-lg shadow-md space-y-1"
          >
            <div className="flex items-center gap-2 text-xs text-black font-semibold absolute top-2 left-0 bg-white px-2 py-1 rounded-tr-full">
              <FaHashtag className="text-gray-400" /> {item.transactionId}
            </div>

            <div className="flex items-center justify-end gap-2 text-sm">
              <FaFutbol className="text-orange-400" size={20} />
              <span className=" text-3xl font-semibold">
                {item.courtName}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <img src={cardSim} alt="card_icon" className="w-8" />
              <img src={cardSignal} alt="card_icon" className="w-5" />
            </div>

            <div className="text-md text-gray-400">
              <p>Pay Amount</p>
              <span className="flex gap-1 items-center text-lg -tracking-wider text-white">
                <FaMoneyBill className="text-gray-400" />
                <span className="text-2xl md:text-4xl">
                  {formatAmount(item.paymentAmount)}
                </span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-400 font-semibold uppercase">
                  Payment Method
                  <span className="flex items-center gap-1 text-white">
                    <FaCreditCard className="text-gray-400" />
                    {item.paymentMethod}
                  </span>
                </span>
              </div>

              <div className="text-sm uppercase">
                <p className="text-gray-400">Payment At</p>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <div className="leading-tight">
                    <div>
                      {new Date(item.paidAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div>
                      {new Date(item.paidAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm uppercase">
              <p className="text-gray-400">Booked Slots</p>
              <div className="flex items-center gap-1">
                <FaClock className="text-gray-600" />
                <div className="flex flex-col">
                  {item.slots.map((slot, i) => (
                    <span key={i} className="text-sm">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <ReactPaginate
          pageCount={Math.ceil(payments.length / ITEMS_PER_PAGE)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          forcePage={currentPage}
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
  );
};

export default PaymentHistoryCard;
