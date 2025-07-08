import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import logoImage from "../assets/website_logo.png";
import useAuth from "../hooks/useAuth";
import {
  FaHome,
  FaThList,
  FaInfoCircle,
  FaEnvelope,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCheck,
} from "react-icons/fa";
import Loading from "./Loading";
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isSticky, setSticky] = useState(false);
  const { user, logoutUser, loading } = useAuth();
  const defaultAvatar =
    "https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174702.jpg";
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    if (isHome) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary border-b-2" : "text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink>Courts</NavLink>
      </li>
      <li>
        <NavLink>About</NavLink>
      </li>
      <li>
        <NavLink>Contact</NavLink>
      </li>
      {!user && (
        <li>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              isActive ? "font-semibold text-primary border-b-2" : "text-white"
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  // Mobile Links (No active border styling)
  const mobileLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary text-sm flex items-center gap-2"
              : "text-black text-sm flex items-center gap-2"
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-sm flex items-center gap-2"
              : "text-black text-sm flex items-center gap-2"
          }
        >
          <FaThList /> Courts
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-sm flex items-center gap-2"
              : "text-black text-sm flex items-center gap-2"
          }
        >
          <FaInfoCircle /> About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-sm flex items-center gap-2"
              : "text-black text-sm flex items-center gap-2"
          }
        >
          <FaEnvelope /> Contact
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary text-sm flex items-center gap-2"
                : "text-black text-sm flex items-center gap-2"
            }
          >
            <FaSignInAlt /> Login
          </NavLink>
        </li>
      )}
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-sm flex items-center gap-2"
                  : "text-black text-sm flex items-center gap-2"
              }
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-sm flex items-center gap-2 hover:text-primary hover:font-semibold"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </>
      )}
    </>
  );
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div
      className={`font-poppins w-full top-0 left-0 z-50 transition-all duration-300 ${
        isHome
          ? isSticky
            ? "sticky top-0 z-10 bg-[#18181b] shadow-md"
            : "absolute bg-transparent"
          : "sticky top-0 z-10 bg-[#18181b] shadow-md"
      }`}
    >
      <div className="w-11/12 mx-auto flex justify-between items-center py-3">
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
          {/*User Avatar Dropdown - Desktop */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar ml-8">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || defaultAvatar} alt="User Avatar" />
                </div>
              </div>
              <ul className="dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-42 text-sm text-gray-700">
                <li className="pointer-events-none cursor-not-allowed">
                  <span className="font-medium flex items-center">
                    <FaUserCheck className="mr-2" />
                    {user.displayName || user.email}
                  </span>
                </li>
                <li>
                  <NavLink className="flex items-center" to="">
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center hover:text-primary hover:font-semibold"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-4 relative">
          {/*  Only show hamburger if NOT logged in */}
          {!user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white hover:text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 text-black"
              >
                {/* ✅ Mobile Nav Links without border */}
                {mobileLinks}
              </ul>
            </div>
          )}

          {/*  Avatar dropdown with full menu for logged-in user */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || defaultAvatar} alt="User Avatar" />
                </div>
              </div>
              <ul className="dropdown-content mt-2 z-10 p-3 shadow bg-base-100 rounded-box w-48 text-sm text-gray-700">
                <li className="pointer-events-none">
                  <span className="font-medium flex items-center">
                    <FaUserCheck className="mr-2" />
                    {user.displayName || user.email}
                  </span>
                </li>
                {/*  All nav links in avatar dropdown */}
                {mobileLinks}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
