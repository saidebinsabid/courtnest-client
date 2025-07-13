import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import ApprovedBookingTable from "../../components/ApprovedBookingTable";
import useAuth from "../../hooks/useAuth";
import { MdOutlineEventBusy } from "react-icons/md";

const ApprovedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["approvedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/member-approved?email=${user.email}`
      );
      return res.data;
    },
  });
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

  const handlePay = (booking) => {
    navigate(`/dashboard/member/payment/${booking._id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">
        My Approved <span className="text-primary">Courts</span> For Payment
      </h2>

      {bookings.length > 0 ? (
        <ApprovedBookingTable
          bookings={bookings}
          onPay={handlePay}
          onCancel={handleCancel}
        />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <MdOutlineEventBusy className="text-6xl text-yellow-400 mb-4" />
          <p className="text-lg text-gray-600 font-semibold">
            No Approved bookings found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovedBookings;
