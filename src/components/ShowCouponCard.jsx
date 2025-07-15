import React from "react";
import {
  FaTags,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";



const ShowCouponCard = ({ coupon }) => {
  const {
    code,
    value,
    minAmount,
    startDate,
    endDate,
    description,
  } = coupon;

  function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

  return (
   <div
      className="rounded-lg p-8 bg-[#fafafa] border border-[#ddd] shadow-sm min-h-[260px] flex flex-col justify-between font-mon"
      style={{ color: "#111" }}
    >
        <h2 className="text-3xl text-center font-semibold tracking-widest">{code}</h2>
    

      <p className="mb-5 text-md font-semibold text-gray-600">
        Save{" "}
        <span  className="text-2xl text-black">
          {value}%
        </span>{" "}
        on bookings over{" "}
        <span>
          ${minAmount || 0}
        </span>
      </p>

      {description && (
        <p className="text-sm mb-6 leading-relaxed text-gray-600 line-clamp-3">
          {description}
        </p>
      )}

      <p className="text-sm font-medium text-gray-600">
        Valid:{" "}
        <span className="text-black">{formatDate(startDate)}</span>{" "}
        to{" "}
        <span className="text-black">{formatDate(endDate)}</span>
      </p>
    </div>
  );
};

export default ShowCouponCard;
