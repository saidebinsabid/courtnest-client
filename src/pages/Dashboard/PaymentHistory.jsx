import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PaymentHistoryTable from "../../components/PaymentHistoryTable";
import PaymentHistoryCard from "../../components/PaymentHistoryCard";
import { TbHistoryOff } from "react-icons/tb";
import { FaThLarge, FaTable } from "react-icons/fa";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [viewType, setViewType] = useState("table");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/payments?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex justify-between items-center mb-6 bg-base-300 px-2 py-2 rounded-md">
        <h2 className="text-3xl font-semibold">
          My <span className="text-primary">Payment</span> History
        </h2>
        <div className="flex gap-3 text-2xl">
          <button
            className={`p-2 rounded ${
              viewType === "grid" ? "bg-yellow-400 text-black" : "bg-base-300"
            }`}
            onClick={() => setViewType("grid")}
          >
            <FaThLarge />
          </button>
          <button
            className={`p-2 rounded ${
              viewType === "table" ? "bg-yellow-400 text-black" : "bg-base-300"
            }`}
            onClick={() => setViewType("table")}
          >
            <FaTable />
          </button>
        </div>
      </div>

      {payments.length > 0 ? (
        viewType === "table" ? (
          <PaymentHistoryTable payments={payments} />
        ) : (
          <PaymentHistoryCard payments={payments} />
        )
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <TbHistoryOff className="text-6xl text-yellow-400 mb-4" />
          <p className="text-lg text-gray-600 font-semibold">
            No payment history found.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
