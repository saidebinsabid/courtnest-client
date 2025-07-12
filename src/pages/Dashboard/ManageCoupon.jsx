// ManageCoupon.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaPlus, FaExclamationCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddCouponModal from "../../components/AddCouponModal";
import UpdateCouponModal from "../../components/UpdateCouponModal";
import CouponCard from "../../components/CouponCard";
import Loading from "../../components/Loading";

const ManageCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const isUpdateModalOpen = Boolean(editingCoupon);
  const closeUpdateModal = () => setEditingCoupon(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const axiosSecure = useAxiosSecure();
  const {
    data: coupons = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-16">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-base-300 px-3 py-3 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Show {coupons.length} Coupons</h2>

        <button
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add New Coupon
        </button>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <AddCouponModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}

      {/* Coupons Grid or No Data */}
      {coupons.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <FaExclamationCircle className="text-6xl text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">
            No coupons added yet
          </h3>
          <p className="text-gray-500 mt-2">
            Please add a new coupon to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {coupons
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                refetch={refetch}
                setEditingCoupon={setEditingCoupon}
              />
            ))}
        </div>
      )}

      {/* Update Coupon Modal */}
      {isUpdateModalOpen && (
        <UpdateCouponModal
          isOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          coupon={editingCoupon}
          refetch={refetch}
        />
      )}

      {/* Pagination */}
      {coupons.length > itemsPerPage && (
        <div className="mt-10 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="btn btn-sm rounded border px-3"
            disabled={currentPage === 1}
          >
            &#8592;
          </button>
          {Array.from({ length: Math.ceil(coupons.length / itemsPerPage) }).map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`btn btn-sm px-3 border rounded ${
                  currentPage === idx + 1 ? "btn-primary text-white" : ""
                }`}
              >
                {idx + 1}
              </button>
            )
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(coupons.length / itemsPerPage))
              )
            }
            className="btn btn-sm rounded border px-3"
            disabled={currentPage === Math.ceil(coupons.length / itemsPerPage)}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageCoupon;
