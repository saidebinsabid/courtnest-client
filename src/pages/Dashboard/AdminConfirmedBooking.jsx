import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineEventBusy } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AdminConfirmedBookingTable from "../../components/AdminConfirmedBookingTable";

const AdminConfirmedBooking = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-confirmed-bookings", query],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/confirmed");
      return res.data;
    },
  });

  const filteredBookings = bookings.filter((booking) => {
    const lower = query.toLowerCase();
    return (
      booking?.courtName?.toLowerCase().includes(lower) ||
      booking?.userName?.toLowerCase().includes(lower)
    );
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        All Confirmed Bookings
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center gap-2 mb-8">
        <input
          type="text"
          placeholder="Search by Court or Name"
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setQuery(searchTerm)}
          className="btn btn-primary"
        >
          Search Now
        </button>
      </div>

      {filteredBookings.length > 0 ? (
        <AdminConfirmedBookingTable bookings={filteredBookings} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <MdOutlineEventBusy className="text-6xl text-red-400 mb-4" />
          <p className="text-lg text-gray-600 font-semibold">
            No court bookings have been paid for yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminConfirmedBooking;
