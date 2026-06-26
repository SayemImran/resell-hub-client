"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// Modern dashboard color palette
const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 text-xs font-semibold rounded-xl shadow-xl border border-slate-800">
        <p className="capitalize mb-0.5">{payload[0].name}</p>
        <p className="text-blue-400">{payload[0].value} Items Listed</p>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ data = [] }) {
  // Format data explicitly into Recharts format matching keys
  const chartData = data.map((item) => ({
    name: item._id || "Uncategorized",
    value: item.count || 0,
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-400">
        No distribution data available
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60} // Makes it a Donut Chart
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="stroke-white outline-none focus:outline-none"
                strokeWidth={3}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}