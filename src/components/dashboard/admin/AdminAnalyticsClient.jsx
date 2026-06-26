"use client";

import { useState } from "react";
import CategoryPieChart from "./CategoryPieChart";

// Match color scheme indexes with chart colors
const LEGEND_COLORS = ["bg-blue-600", "bg-purple-600", "bg-pink-600", "bg-orange-600", "bg-emerald-600"];

export default function AdminAnalyticsClient({ initialStats }) {
  const [stats] = useState(initialStats || {
    revenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    activeListings: 0,
    categoryDistribution: [],
    recentActivities: []
  });

  const avgOrderValue = stats.totalOrders > 0 ? (stats.revenue / stats.totalOrders).toFixed(2) : 0;

  return (
    <section className="space-y-8 w-full max-w-[1400px] mx-auto p-4 sm:p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Analytics Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time platform performance, financial metrics, and user activity overview.
        </p>
      </div>

      {/* KPI Metric Grid Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric Card: Revenue */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              ${stats.revenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-4">
            ↑ Live platform volume
          </div>
        </div>

        {/* Metric Card: Orders */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Orders</span>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">{stats.totalOrders}</h3>
          </div>
          <div className="text-xs text-indigo-600 font-medium mt-4">
            Avg. Order Value: <span className="font-bold">${avgOrderValue}</span>
          </div>
        </div>

        {/* Metric Card: Users */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Platform Users</span>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">{stats.totalUsers}</h3>
          </div>
          <div className="text-xs text-slate-500 mt-4">Buyers & Sellers combined</div>
        </div>

        {/* Metric Card: Active Listings */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Approved Products</span>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">{stats.activeListings}</h3>
          </div>
          <div className="text-xs text-amber-600 font-medium mt-4">Active on the marketplace</div>
        </div>
      </div>

      {/* Visual Analytics Segment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Recharts Pie Grid Panel */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Category Distribution</h3>
          
          {/* Interactive Graph Canvas Wrapper */}
          <CategoryPieChart data={stats.categoryDistribution} />

          {/* Dynamic Colors Legend Meta-list */}
          <div className="mt-auto space-y-2 pt-4 border-t border-slate-50">
            {stats.categoryDistribution?.map((cat, idx) => (
              <div key={cat._id} className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${LEGEND_COLORS[idx % LEGEND_COLORS.length]}`} />
                  <span className="capitalize truncate max-w-[120px]">{cat._id || "Uncategorized"}</span>
                </div>
                <span className="text-slate-400 font-semibold">{cat.count} items</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Live Log */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent System Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Buyer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {stats.recentActivities?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-slate-400">No recent orders found.</td>
                  </tr>
                ) : (
                  stats.recentActivities.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 pr-2 truncate max-w-[180px]">{order.productTitle}</td>
                      <td className="py-3.5 pr-2 truncate max-w-[120px] text-slate-500">{order.buyerInfo?.name}</td>
                      <td className="py-3.5 font-bold text-slate-800">${order.totalAmount?.toFixed(2)}</td>
                      <td className="py-3.5 text-right">
                        <span className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded-md capitalize ${
                          order.orderStatus === "delivered" ? "bg-emerald-50 text-emerald-700" :
                          order.orderStatus === "cancelled" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}