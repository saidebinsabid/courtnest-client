import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 10;

const UsersTable = ({ users, onDelete, showDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentUsers = users.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Scrollable Table */}
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {showDelete && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <motion.tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-base-300" : "bg-base-200"}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <td>{offset + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 text-xs rounded-full uppercase">
                    {user.role}
                  </span>
                </td>
                {showDelete && (
                  <td>
                    <button
                      onClick={() => onDelete(user._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          pageCount={Math.ceil(users.length / ITEMS_PER_PAGE)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          forcePage={currentPage}
          containerClassName="flex gap-2"
          activeClassName="bg-[#facc15] text-black"
          pageClassName="border rounded cursor-pointer"
          pageLinkClassName="block px-4 py-2 cursor-pointer"
          previousLabel="←"
          nextLabel="→"
          previousClassName="border rounded cursor-pointer"
          previousLinkClassName="block px-4 py-2 cursor-pointer"
          nextClassName="border rounded cursor-pointer"
          nextLinkClassName="block px-4 py-2 cursor-pointer"
          breakLabel="..."
          breakClassName="cursor-pointer"
          breakLinkClassName="block px-4 py-2"
        />
      </div>
    </div>
  );
};

export default UsersTable;
