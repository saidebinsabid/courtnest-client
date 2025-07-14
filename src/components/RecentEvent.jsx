import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Loading from "./Loading";
import useAxios from "../hooks/useAxios";
import ShowAnnouncementCard from "./ShowAnnouncementCard";

const RecentEvent = () => {
  const axios = useAxios();

  const {
    data: events = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["recentEvents"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const res = await axios.get(
        `/recent-event-announcements?category=Event&startDate=${today}`
      );
      const filtered = res.data
        .filter((event) => new Date(event.startDate) >= new Date(today))
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      return filtered.slice(0, 2);
    },
  });

  if (isLoading || isFetching) return <Loading />;

  return (
    <section className="py-16 w-full">
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-left space-y-3">
            <span className="text-primary font-bold text-xl">Event</span>
            <h2 className="text-3xl md:text-4xl font-bold ">Recent Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our upcoming activities and organized events.
            </p>
          </div>

          <Link to="/all-announcement">
            <button className="btn btn-md bg-primary text-black hover:bg-primary/90">
              Show More
            </button>
          </Link>
        </div>

        {/* Events */}
        {events.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-lg">
            No upcoming events at the moment.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {events.map((event) => (
              <ShowAnnouncementCard key={event._id} announcement={event} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentEvent;
