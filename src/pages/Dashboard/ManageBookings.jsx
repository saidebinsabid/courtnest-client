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
      const res = await axiosSecure.patch(`/bookings/approve/${bookingId}`, {
        email: userEmail,
      });
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

  if (isLoading) return <Loading />;

  const pendingBookings = bookings.filter((b) => b.status === "pending");

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">Manage Bookings</h2>

      {pendingBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z"
            />
          </svg>
          <p className="text-lg font-medium">
            No pending booking requests found.
          </p>
          <p className="text-sm text-black mt-1">
            All court bookings have been reviewed.
          </p>
        </div>
      ) : (
        <BookingsTable
          bookings={pendingBookings}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default ManageBookings;
