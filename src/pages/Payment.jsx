import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["approved-booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${id}`);
      return res.data;
    },
  });

  if (isLoading || !booking?._id) return <Loading />;

  return (
    <div className="w-11/12 max-w-xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Pay for your <span className="text-primary">Booking</span>
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <div>
          <p className="text-lg font-semibold">
            Court: <span className="text-primary">{booking.courtName}</span>
          </p>
          <p>Date: {booking.date}</p>
          <p>Slot(s): {booking.slots?.join(", ")}</p>
          <p className="text-lg font-bold mt-2">
            Amount to Pay: ${booking.totalPrice}
          </p>
        </div>

        <div className="border p-4 rounded space-y-4 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Card Information</h3>

          <input
            type="text"
            placeholder="Card Number"
            className="input input-bordered w-full"
            disabled
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="input input-bordered w-full"
              disabled
            />
            <input
              type="text"
              placeholder="CVC"
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <input
            type="text"
            placeholder="Card Holder Name"
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <button className="btn btn-primary w-full cursor-not-allowed" disabled>
          Pay ${booking.totalPrice}
        </button>
      </div>
    </div>
  );
};

export default Payment;
