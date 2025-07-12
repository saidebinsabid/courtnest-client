import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PaymentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["approved-booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${id}`);
      return res.data;
    },
  });

  if (isLoading || !booking?._id) return <Loading />;

  const baseAmount = parseFloat(booking.totalPrice);
  const finalAmount = (baseAmount - discount).toFixed(2);

  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.post("/apply-coupon", {
        code: couponCode,
        email: user.email,
        bookingId: booking._id,
      });

      if (res.data.valid) {
        setDiscount(res.data.discountAmount);
        Swal.fire("Coupon Applied", `You got $${res.data.discountAmount} off!`, "success");
      } else {
        Swal.fire("Invalid Coupon", "This coupon code is not valid.", "error");
      }
    } catch (err) {
      console.error("Coupon error", err);
      Swal.fire("Error", "Failed to apply coupon.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error: cardError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (cardError) {
        setError(cardError.message);
        setProcessing(false);
        return;
      }

      const res = await axiosSecure.post("/create-payment-intent", {
        amount: parseInt(finalAmount * 100),
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
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        await axiosSecure.post("/payments", {
          bookingId: booking._id,
          email: user.email,
          amount: finalAmount,
          discount,
          couponCode,
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
      setError("Something went wrong. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <div className="w-11/12 max-w-xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Pay for your <span className="text-primary">Booking</span>
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* Coupon Section */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="btn btn-outline btn-sm"
          >
            Apply
          </button>
        </div>

        {/* Booking Info */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            value={user.email}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={booking.courtType}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={booking.slots?.join(", ")}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={booking.date}
            readOnly
          />
          <input
            className="input input-bordered w-full font-bold text-green-600"
            value={`$${finalAmount}`}
            readOnly
          />

          <CardElement className="p-3 border rounded bg-gray-100" />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!stripe || processing}
          >
            {processing ? "Processing..." : `Pay $${finalAmount}`}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
