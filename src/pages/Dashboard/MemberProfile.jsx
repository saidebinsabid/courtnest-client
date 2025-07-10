// MemberProfile.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ProfileCard from "../../components/ProfileCard";
import Loading from "../../components/Loading";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["memberProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (!userInfo) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 min-h-[80vh] bg-base-200 flex justify-center items-center">
      <ProfileCard
        name={userInfo.name}
        email={userInfo.email}
        photoURL={userInfo.photoURL}
        dateLabel="Member Since"
        date={userInfo.member_since}
      />
    </div>
  );
};

export default MemberProfile;
