import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import ApprovedBookingTable from "../../components/ApprovedBookingTable";

const ApprovedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch approved bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["approvedBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/approved");
      return res.data;
    },
  });

  // Cancel mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled", "Booking cancelled successfully", "success");
      queryClient.invalidateQueries(["approvedBookings"]);
    },
  });

  // Handle cancel button
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  // Handle payment button
  const handlePay = (booking) => {
  navigate(`/dashboard/member/payment/${booking._id}`);
};


  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">Approved Bookings</h2>

      <ApprovedBookingTable
        bookings={bookings}
        onPay={handlePay}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ApprovedBookings;
