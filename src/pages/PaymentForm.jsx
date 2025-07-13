import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { HiOutlineMail } from "react-icons/hi";
import {
  MdSportsTennis,
  MdAccessTime,
  MdDateRange,
  MdAttachMoney,
} from "react-icons/md";

const PaymentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["approved-booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${id}`);
      return res.data;
    },
  });

  if (isLoading || !booking?._id) return <Loading />;

  const baseAmount = parseFloat(booking.totalPrice);
  const finalAmount = Math.max(0, baseAmount - discount).toFixed(2);

  const handleApplyCoupon = async () => {
    if (isApplying || couponApplied) return;
    setCouponError("");
    setIsApplying(true);

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      setIsApplying(false);
      return;
    }

    if (baseAmount < 1) {
      setCouponError("Invalid booking amount.");
      setIsApplying(false);
      return;
    }

    try {
      const res = await axiosSecure.post("/apply-coupon", {
        code: couponCode.trim(),
        bookingAmount: baseAmount,
      });

      if (res.data.valid) {
        if (baseAmount < res.data.minAmount) {
          setCouponError(
            `Minimum amount for this coupon is $${res.data.minAmount}.`
          );
          setDiscount(0);
          setIsApplying(false);
          return;
        }

        setDiscount(res.data.discountAmount);
        setCouponError("");
        setCouponApplied(true);
        Swal.fire(
          "Coupon Applied",
          `You got $${res.data.discountAmount} off!`,
          "success"
        );
      } else {
        setDiscount(0);
        setCouponError(res.data.message || "Invalid or expired coupon.");
      }
    } catch (err) {
      console.error("Coupon error", err);
      setCouponError("Failed to apply coupon. Try again.");
    }

    setIsApplying(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setCouponError("");

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    try {
      const { error: cardError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (cardError) {
        setCouponError(cardError.message);
        setProcessing(false);
        return;
      }

      const amountInCents = Math.round(parseFloat(finalAmount) * 100);

      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
        bookingId: booking._id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setCouponError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        await axiosSecure.post("/payments", {
          bookingId: booking._id,
          email: user.email,
          amount: finalAmount,
          discount,
          couponCode: discount > 0 ? couponCode.trim() : "",
          transactionId,
          method: result.paymentIntent.payment_method_types?.[0] || "card",
        });

        await Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          confirmButtonText: "Go to Confirmed Bookings",
        });

        navigate("/dashboard/member/confirmed-booking");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setCouponError("Something went wrong. Try again.");
    }

    setProcessing(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Secure <span className="text-primary">Payment</span>
      </h2>

      <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={couponApplied}
            className="input input-bordered w-full sm:flex-1"
          />
          {!couponApplied && (
            <button
              onClick={handleApplyCoupon}
              type="button"
              disabled={isApplying}
              className="btn btn-primary btn-md"
            >
              {isApplying ? "" : "Apply"}
            </button>
          )}
        </div>
        {couponError && (
          <p className="text-red-500 text-sm font-medium">{couponError}</p>
        )}

        {/* DIVIDER */}
        <hr className="my-2 border-gray-300" />

        {/* PAYMENT FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <HiOutlineMail className="text-lg" />
                Email
              </label>
              <input
                className="input input-bordered w-full"
                value={user.email}
                readOnly
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <MdSportsTennis className="text-lg" />
                Court Type
              </label>
              <input
                className="input input-bordered w-full"
                value={booking.courtType}
                readOnly
              />
            </div>

            {/* Slots */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <MdAccessTime className="text-lg" />
                Selected Slots
              </label>
              <input
                className="input input-bordered w-full"
                value={booking.slots?.join(", ")}
                readOnly
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <MdDateRange className="text-lg" />
                Booking Date
              </label>
              <input
                className="input input-bordered w-full"
                value={booking.date}
                readOnly
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                <MdAttachMoney className="text-lg" />
                Total Payable Amount
              </label>
              <input
                className="input input-bordered w-full font-bold text-green-600"
                value={`$${finalAmount}`}
                readOnly
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-2 text-gray-700">
              Card Details
            </label>
            <div className="p-4 bg-gray-100 rounded border">
              <CardElement
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full btn btn-primary mt-6 transition-all duration-200 ${
              processing ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {processing ? "" : `Pay $${finalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
