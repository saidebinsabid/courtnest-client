import React from "react";

const BookingsTable = ({ bookings, onAccept, onReject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Court</th>
            <th>Type</th>
            <th>Date</th>
            <th>Slots</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, idx) => (
            <tr key={booking._id} className="border-b hover:bg-gray-50">
              <td>{idx + 1}</td>
              <td>{booking.userName}</td>
              <td>{booking.userEmail}</td>
              <td>{booking.courtName}</td>
              <td>{booking.courtType}</td>
              <td>{booking.date}</td>
              <td>
                {booking.slots?.map((slot, i) => (
                  <span key={i} className="block text-xs">
                    {slot}
                  </span>
                ))}
              </td>
              <td>${booking.totalPrice}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                    booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="flex gap-2 items-center">
                <button
                  disabled={booking.status !== "pending"}
                  onClick={() =>
                    onAccept(booking._id, booking.userEmail)
                  }
                  className="btn btn-sm bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                >
                  Accept
                </button>
                <button
                  disabled={booking.status !== "pending"}
                  onClick={() => onReject(booking._id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
