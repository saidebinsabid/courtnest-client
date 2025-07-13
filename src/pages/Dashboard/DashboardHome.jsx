import React from "react";
import Loading from "../../components/Loading";
import useUserRole from "../../hooks/useUserRole";
import Forbidden from "../Forbidden";
import UserProfile from "./UserProfile";
import MemberProfile from "./MemberProfile";
import AdminProfile from "./AdminProfile";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading || !role) {
    return <Loading></Loading>;
  }

  if (role === "user") {
    return <UserProfile></UserProfile>;
  }
  if (role === "member") {
    return <MemberProfile></MemberProfile>;
  }
  if (role === "admin") {
    return <AdminProfile></AdminProfile>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
