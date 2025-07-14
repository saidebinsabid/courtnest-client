import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaDumbbell, FaChalkboardTeacher } from "react-icons/fa";
import AboutBanner from "../assets/About_us_banner.png";

const AboutUs = () => {
  return (
    <section className="bg-[#f9f9f9] w-full py-16">
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side: Image + Badge */}
        <motion.div
          className="relative w-full lg:w-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={AboutBanner}
            alt="About Us"
            className="w-full h-auto rounded-lg"
          />
          <div className="hidden md:inline absolute top-4 left-16 bg-yellow-400 text-black px-4 py-8 rounded-lg shadow-md">
            <div className="text-3xl font-bold leading-tight">
              5+
              <span className="text-base font-medium ml-1">
                years of experience
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-primary uppercase tracking-wide font-semibold">
            About Us
          </p>

          {/* Static Heading replacing TypeAnimation */}
          <h2 className="text-xl md:text-4xl font-bold text-gray-800 mt-4 leading-snug">
            We manage sports courts to offer accessible, well-maintained, and
            professional facilities.
          </h2>

          <p className="text-gray-600 text-base mt-4 mb-6 leading-relaxed">
            Our platform is committed to providing an efficient and
            user-friendly sports court booking experience. We strive to enhance
            the recreational and competitive sports environment through digital
            convenience, professional management, and dedicated support. Our
            goal is to promote active lifestyles and community engagement with a
            modern approach to sports facility management.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Card 1 */}
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserTie className="text-3xl text-primary mb-2" />
              <h4 className="font-semibold text-gray-800">
                Professional Referees and Umpires
              </h4>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <FaChalkboardTeacher className="text-3xl text-primary mb-2" />
              <h4 className="font-semibold text-gray-800">
                Professional Trainings
              </h4>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <FaDumbbell className="text-3xl text-primary mb-2" />
              <h4 className="font-semibold text-gray-800">
                Practice Facilities with Gym
              </h4>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
