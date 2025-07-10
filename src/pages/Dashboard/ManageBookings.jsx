import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import BookingsTable from "../../components/BookingsTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const acceptBookingMutation = useMutation({
    mutationFn: async ({ bookingId, userEmail }) => {
      const res = await axiosSecure.patch(`/bookings/approve/${bookingId}`, { email: userEmail });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Booking has been approved.", "success");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to approve booking.", "error");
    },
  });

  const rejectBookingMutation = useMutation({
    mutationFn: async (bookingId) => {
      const res = await axiosSecure.delete(`/bookings/${bookingId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Booking has been rejected.", "success");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to reject booking.", "error");
    },
  });

  const handleAccept = (bookingId, userEmail) => {
    acceptBookingMutation.mutate({ bookingId, userEmail });
  };

  const handleReject = (bookingId) => {
    rejectBookingMutation.mutate(bookingId);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">Manage Bookings</h2>
      <BookingsTable
        bookings={bookings}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default ManageBookings;
