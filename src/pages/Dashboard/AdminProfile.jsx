import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import ProfileCard from "../../components/ProfileCard";
import AdminPieChart from "../../components/AdminPieChart";
import Loading from "../../components/Loading";
import { parseMongoDate } from "../../utils/parseMongoDate";
import useAuth from "../../hooks/useAuth";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-stats?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    name,
    email,
    photoURL,
    registerd_at,
    totalUsers,
    totalMembers,
    totalCourts,
  } = stats;
  // console.log("Stats:", stats);
  const registeredAtDate = parseMongoDate(registerd_at);

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-center">
        <div className="w-full md:w-1/2 bg-base-200 p-4 rounded-xl shadow-lg">
          <ProfileCard
            name={name}
            email={email}
            photoURL={photoURL}
            dateLabel="Issued At"
            date={registeredAtDate}
          />
        </div>

        <motion.div
          className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <AdminPieChart
            totalUsers={totalUsers}
            totalMembers={totalMembers}
            totalCourts={totalCourts}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfile;
