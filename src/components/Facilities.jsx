import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Icons
import {
  FaLock,
  FaChalkboardTeacher,
  FaUtensils,
  FaShoppingBag,
  FaFootballBall,
  FaCouch,
  FaShower,
  FaParking,
  FaWifi,
  FaCamera,
} from "react-icons/fa";

const facilities = [
  {
    icon: <FaLock className="text-4xl text-primary" />,
    title: "Locker Room",
    description:
      "Secure lockers to safely store your personal items during games.",
  },
  {
    icon: <FaChalkboardTeacher className="text-4xl text-primary" />,
    title: "Sports Academy",
    description:
      "Train with experts in a structured and supportive environment.",
  },
  {
    icon: <FaUtensils className="text-4xl text-primary" />,
    title: "Restaurant",
    description: "Enjoy delicious meals and beverages after your match.",
  },
  {
    icon: <FaShoppingBag className="text-4xl text-primary" />,
    title: "Sports Shop",
    description: "Buy premium gear, apparel, and sports accessories on-site.",
  },
  {
    icon: <FaFootballBall className="text-4xl text-primary" />,
    title: "Rental Equipment",
    description: "Rent high-quality sports equipment hassle-free at the venue.",
  },
  {
    icon: <FaCouch className="text-4xl text-primary" />,
    title: "Waiting Lounge",
    description: "Relax in our comfy lounge while you wait for your session.",
  },
  {
    icon: <FaShower className="text-4xl text-primary" />,
    title: "Shower Rooms",
    description: "Freshen up with clean and private shower facilities.",
  },
  {
    icon: <FaParking className="text-4xl text-primary" />,
    title: "Ample Parking",
    description:
      "Spacious and secure parking space for all guests and members.",
  },
  {
    icon: <FaWifi className="text-4xl text-primary" />,
    title: "Free Wi-Fi",
    description:
      "Enjoy seamless high-speed internet connectivity in all areas.",
  },
  {
    icon: <FaCamera className="text-4xl text-primary" />,
    title: "CCTV Security",
    description: "24/7 surveillance ensures a safe and protected environment.",
  },
];

const Facilities = () => {
  return (
    <section className="text-black py-16 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Discover Our <span className="text-primary font-poppins">Facilities</span>
        </h2>
        <p className="text-gray-500 mb-10 max-w-3xl mx-auto text-lg">
          Book your favorite court first, and unlock a full suite of premium
          facilities designed for both comfort and performance. From locker
          rooms to lounges, we ensure your game-day experience is nothing short
          of exceptional.
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          freeMode={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[FreeMode, Autoplay, Pagination]}
          className="mySwiper"
        >
          {facilities.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl bg-base-200 shadow-lg text-center p-6 h-64 flex flex-col justify-center items-center transition-transform hover:scale-105 duration-300">
                <div className="border border-primary p-2">{item.icon}</div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Facilities;
