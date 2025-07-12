// PaymentHistory.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PaymentHistoryTable from "../../components/PaymentHistoryTable";
import { TbHistoryOff } from "react-icons/tb";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">My <span className="text-primary">Payment</span> History</h2>

      {payments.length > 0 ? (
        <PaymentHistoryTable payments={payments} />
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
