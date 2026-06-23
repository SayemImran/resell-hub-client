"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const STATUS_COLORS = {
  pending: "#f59e0b",
  accepted: "#3b82f6",
  processing: "#3b82f6",
  shipped: "#8b5cf6",
  delivered: "#22c55e",
  rejected: "#ef4444",
};

const AnalyticsCharts = ({ salesByStatus, monthlySales, topProducts, summary }) => {
  return (
    <div className="space-y-8">
      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
          <p className="text-xs text-default-500">Total Revenue</p>
          <p className="text-2xl font-bold text-primary">${summary.totalRevenue}</p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
          <p className="text-xs text-default-500">Total Orders</p>
          <p className="text-2xl font-bold">{summary.totalOrders}</p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
          <p className="text-xs text-default-500">Avg Order Value</p>
          <p className="text-2xl font-bold">${summary.avgOrderValue}</p>
        </div>
      </div>

      {/* Sales Chart - orders by status */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Sales Chart — Orders by Status</h2>

        {salesByStatus.length === 0 ? (
          <p className="text-sm text-default-500">No order data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="status" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {salesByStatus.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[entry.status] || "#94a3b8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Monthly Sales Trend */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Monthly Sales Trend</h2>

        {monthlySales.length === 0 ? (
          <p className="text-sm text-default-500">No sales data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top Selling Products */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Top Selling Products</h2>

        {topProducts.length === 0 ? (
          <p className="text-sm text-default-500">No sales data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="title"
                type="category"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCharts;