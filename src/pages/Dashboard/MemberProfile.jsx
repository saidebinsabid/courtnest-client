// MemberProfile.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ProfileCard from "../../components/ProfileCard";
import Loading from "../../components/Loading";
import { parseMongoDate } from "../../utils/parseMongoDate";

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
  const registeredAtDate = parseMongoDate(userInfo.member_since);

  return (
    <div className="w-11/12 mx-auto py-16">
      <ProfileCard
        name={userInfo.name}
        email={userInfo.email}
        photoURL={userInfo.photoURL}
        dateLabel="Member Since"
        date={registeredAtDate}
      />
    </div>
  );
};

export default MemberProfile;
