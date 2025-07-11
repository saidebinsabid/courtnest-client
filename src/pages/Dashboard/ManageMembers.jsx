import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UsersTable from "../../components/UsersTable";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=member");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Member has been removed.", "success");
      queryClient.invalidateQueries(["members"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredMembers = members.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if(isLoading) return <Loading></Loading>

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
        <p className="text-center">Loading...</p>
      ) : filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg shadow-md bg-base-100 text-center">
          <FaUserSlash className="text-5xl text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-600">
            No members found
          </h2>
          <p className="text-gray-500">Try adjusting your search term.</p>
        </div>
      ):(

      <UsersTable users={filteredMembers} onDelete={handleDelete} showDelete={true} />
      )}
    </div>
  );
};

export default ManageMembers;
