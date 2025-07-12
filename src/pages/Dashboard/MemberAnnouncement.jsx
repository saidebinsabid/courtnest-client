import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import ShowAnnouncementCard from "../../components/ShowAnnouncementCard";


const MemberAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading, isFetching } = useQuery({
    queryKey: ["allAnnouncements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        All Announcements
      </h2>

      {announcements.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No announcements available at this time.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <ShowAnnouncementCard key={announcement._id} announcement={announcement} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberAnnouncement;
