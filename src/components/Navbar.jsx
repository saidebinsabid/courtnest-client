import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import logoImage from "../assets/website_logo.png";
const Navbar = () => {
  const { isSticky, setSticky } = useState();
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink>Couts</NavLink>
      </li>
      <li>
        <NavLink>About</NavLink>
      </li>
      <li>
        <NavLink>Contact</NavLink>
      </li>
      <li>
        <NavLink>Login</NavLink>
      </li>
    </>
  );
  return (
    <div
      className={`font-poppins w-full top-0 left-0 z-50 transition-all duration-300 ${
        isSticky ? "fixed bg-black shadow-md" : "absolute bg-transparent"
      }`}
    >
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div className="navbar-start">
          <div className="flex justify-center items-center">
            <img className="w-12" src={logoImage} alt="website_logo" />
            <NavLink to="/" className="text-3xl text-white font-semibold">
              Court<span className="text-primary">Nest</span>
            </NavLink>
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="flex gap-8 text-white">{links}</ul>
        </div>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content absolute right-0 bg-base-100 rounded-box z-10 mt-3 p-2 w-32 shadow"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
