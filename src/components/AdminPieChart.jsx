// AdminPieChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#facc15", "#000000", "#4ade80"];

const AdminPieChart = ({ totalUsers, totalMembers, totalCourts }) => {
  const data = [
    { name: "Users", value: totalUsers - totalMembers },
    { name: "Members", value: totalMembers },
    { name: "Courts", value: totalCourts },
  ];

  return (
    <motion.div
      className="max-w-lg h-80 w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
  data={data}
  cx="50%"
  cy="50%"
  outerRadius={80}
  fill="#8884d8"
  dataKey="value"
  label={({ name, value }) => `${name}: ${value}`}
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AdminPieChart;
