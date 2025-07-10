// PendingBookings.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PendingBookingTable from "../../components/PendingBookingTable";
import Loading from "../../components/Loading";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data.filter((booking) => booking.status === "pending");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled!", "Booking has been cancelled.", "success");
      queryClient.invalidateQueries(["pendingBookings"]);
      queryClient.invalidateQueries(["bookings"]); // to refresh admin list also
    },
    onError: () => {
      Swal.fire("Error!", "Failed to cancel booking.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">My Pending Bookings</h2>
      <PendingBookingTable bookings={bookings} onCancel={handleCancel} />
    </div>
  );
};

export default PendingBookings;
