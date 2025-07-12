import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ConfirmedBookingTable from "../../components/ConfirmedBookingTable";
import { MdOutlineEventBusy } from "react-icons/md";

const ConfirmedBooking = () => {
  const axiosSecure = useAxiosSecure();

  const { data: confirmedBookings = [], isLoading } = useQuery({
    queryKey: ["confirmed-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/confirmed");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Confirmed Bookings
      </h2>

      {confirmedBookings.length > 0 ? (
        <ConfirmedBookingTable bookings={confirmedBookings} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <MdOutlineEventBusy className="text-6xl text-red-400 mb-4" />
          <p className="text-lg text-gray-600 font-semibold">
            No confirmed bookings found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBooking;
