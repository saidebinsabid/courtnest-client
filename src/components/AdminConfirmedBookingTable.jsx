import React from "react";

const AdminConfirmedBookingTable = ({ bookings }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="table w-full">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Court</th>
            <th>Date</th>
            <th>Slots</th>
            <th>Paid</th>
            <th>Amount</th>
            <th>Method</th>
            <th>TXN ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, idx) => (
            <tr key={booking._id} className="hover:bg-gray-50 text-sm">
              <td>{idx + 1}</td>
              <td>{booking.userName}</td>
              <td>{booking.userEmail}</td>
              <td>{booking.courtName}</td>
              <td>{booking.date}</td>
              <td>
                {booking.slots?.map((slot, i) => (
                  <span key={i} className="block text-xs">
                    {slot}
                  </span>
                ))}
              </td>
              <td>
                {booking.paid ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 font-medium">No</span>
                )}
              </td>
              <td>${booking.paymentAmount}</td>
              <td>{booking.paymentMethod || "N/A"}</td>
              <td className="text-xs break-all">{booking.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminConfirmedBookingTable;
