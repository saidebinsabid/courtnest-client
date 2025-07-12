import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UsersTable from "../../components/UsersTable";
import Loading from "../../components/Loading";
import { FaUserSlash } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {isLoading ? (
        <Loading></Loading>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 text-center">
          <FaUserSlash className="text-5xl text-yellow-400" />
          <h2 className="text-xl font-semibold text-black">
            No users found
          </h2>
          <p className="text-gray-500">Try adjusting your search term.</p>
        </div>
      ) : (
        <UsersTable users={filteredUsers} showDelete={false} />
      )}
    </div>
  );
};

export default AllUsers;
