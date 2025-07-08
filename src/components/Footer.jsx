import React from "react";
import logoImage from "../assets/website_logo.png";
import footerBg from "../assets/footer_bg.jpeg"; // replace with your background image
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer
      className="w-full bg-cover bg-center relative font-roboto"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"></div>

      {/* Footer content */}
      <div className="relative w-11/12 mx-auto py-16 flex flex-col md:flex-row justify-between gap-10 text-white z-10">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-14" src={logoImage} alt="CourtNest logo" />
            <span className="text-3xl lg:text-4xl font-poppins font-semibold">
              Court<span className="text-primary">Nest</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base leading-relaxed text-gray-300">
            At CourtNest, we offer a luxury sports experience beyond bookings.
            Enjoy our state-of-the-art courts, designed for athletes, families,
            and fitness enthusiasts seeking quality and community.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            {[
              { href: "https://facebook.com", icon: <FaFacebookF /> },
              { href: "https://instagram.com", icon: <FaInstagram /> },
              { href: "https://twitter.com", icon: <FaTwitter /> },
              { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-primary text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle div Contact Us */}
        <div className="text-gray-300 md:w-1/2 space-y-6">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            Contact <span className="text-primary">Us</span>
          </h2>
          <div className="flex items-center gap-1">
            <span className="text-primary text-lg">
              <RiPhoneLine className="text-primary text-lg" />
            </span>
            <p>
              <a
                href="tel:+8801234567890"
                className="hover:text-primary transition"
              >
                +880 1234 567 890
              </a>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary text-lg">
              <RiMailLine className="text-primary text-lg" />
            </span>
            <p>
              <a
                href="mailto:support@courtnest.com"
                className="hover:text-primary transition"
              >
                support@courtnest.com
              </a>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary text-lg">
              <RiMapPinLine className="text-primary text-lg" />
            </span>
            <p>Banani, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            Subscribe <span className="text-primary">Now</span>
          </h2>
          <p className="text-sm lg:text-base leading-relaxed text-gray-300">
            Don’t miss our latest discounts to book the courts. With a proven
            track record of delivering premium facilities and seamless bookings,
            we ensure your game never stops.
          </p>

          {/* Subscribe Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-primary transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-primary text-white font-medium px-6 py-2  border border-primary transition-all duration-300 hover:bg-transparent hover:text-primary"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="bg-[#18181b] w-full py-4">
        <div className="w-11/12 mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-white">
          <h1 className="mb-2 md:mb-0">
            Copyright © 2025. All rights reserved
          </h1>
          <div className="flex gap-4">
            <p>Privacy Policy</p>
            <p>Term & Condition</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
