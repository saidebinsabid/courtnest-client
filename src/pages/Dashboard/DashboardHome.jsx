import React from "react";
import Loading from "../../components/Loading";
import useUserRole from "../../hooks/useUserRole";
import UserDashboard from "./UserDashboard";
import MemberDashboard from "./MemberDashboard";
import Forbidden from "../Forbidden";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading || !role) {
    return <Loading></Loading>;
  }

  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  }
  if (role === "member") {
    return <MemberDashboard></MemberDashboard>;
  }
  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
