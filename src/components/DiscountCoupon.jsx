import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import ShowCouponCard from "./ShowCouponCard";
import { FaTags } from "react-icons/fa";
import Loading from "./Loading";

const DiscountCoupon = () => {
  const axios = useAxios();
  const swiperRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["public-coupons"],
    queryFn: async () => {
      const res = await axios.get("/active-coupon");
      return res.data;
    },
  });

  const initialSlide = coupons.length > 0 ? Math.floor(coupons.length / 2) : 0;

  if (isLoading) return <Loading />;

  return (
    <section className="py-16 w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Exclusive Discount Coupons
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Grab exciting discount coupons to make your court bookings more
          affordable. Apply codes during checkout to save more!
        </p>

        {coupons.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center border border-dashed border-yellow-400 p-8 rounded-lg bg-white mt-4"
          >
            <FaTags className="text-5xl text-yellow-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-700">
              No Discount Coupons Available
            </h4>
            <p className="text-gray-500">
              Please check back later for special deals.
            </p>
          </motion.div>
        ) : (
          <Swiper
            modules={[EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            initialSlide={initialSlide}
            spaceBetween={30}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              764: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
          >
            {coupons.map((coupon, index) => (
              <SwiperSlide
                key={coupon._id}
                className="w-11/12 mx-auto max-w-[380px]"
                style={{ height: "100%" }}
              >
                <motion.div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-lg cursor-pointer mt-8 ${
                    hoveredIndex === index
                      ? "shadow-yellow-400 shadow-lg"
                      : "shadow-md"
                  }`}
                  style={{ height: "100%" }}
                >
                  <ShowCouponCard coupon={coupon} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default DiscountCoupon;
