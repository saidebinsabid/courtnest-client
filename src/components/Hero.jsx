import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import banner1 from "../assets/banner5.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";

const banners = [
  {
    image: banner1,
    heading: "Where Passion Meets the Court",
    description:
      "At CourtNest, we believe in building more than bookings — we build a community where athletes thrive and every match matters.",
    // First image: eager load with high priority
    loading: "eager",
    fetchpriority: "high",
  },
  {
    image: banner2,
    heading: "Empowering Your Game, Every Day",
    description:
      "From sunrise drills to late-night sessions, we make sure your time on the court is seamless, supported, and full of energy.",
    loading: "lazy",
    fetchpriority: "low",
  },
  {
    image: banner3,
    heading: "A Club That Moves With You",
    description:
      "Modern facilities, smart scheduling, and member-first values — join a club that grows with your goals and respects your rhythm.",
    loading: "lazy",
    fetchpriority: "low",
  },
];

const Hero = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="h-full w-full"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full">
              <img
                src={banner.image}
                alt={banner.heading}
                loading={banner.loading}
                fetchPriority={banner.fetchpriority}
                decoding={idx === 0 ? "sync" : "async"}
                className="w-full h-[80vh] object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center text-center px-4">
                <div className="text-white max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-4">
                    {banner.heading}
                  </h2>
                  <p className="text-base md:text-lg  text-gray-300">
                    {banner.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
