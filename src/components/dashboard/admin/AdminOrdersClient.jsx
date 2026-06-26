"use client";

import { useState } from "react";
import { clientAuthFetch } from "@/lib/clientAuthFetch";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ORDER_STATUSES = ["processing", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "paid", "failed"];

// Tailwind utility mapping for cohesive status badge coloration
const orderStatusStyles = {
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const paymentStatusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function AdminOrdersClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders || []);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  const filtered = orders.filter(
    (o) =>
      o.productTitle?.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerInfo?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerInfo?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleStatusChange = async (orderId, field, value) => {
    setUpdating(orderId + field);
    try {
      const res = await clientAuthFetch(
        `${API_URL}/api/admin/orders/${orderId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ [field]: value }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, [field]: value } : o)),
      );
      toast.success(`Order ${field} updated successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <section className="space-y-6 w-full max-w-[1400px] mx-auto p-2 sm:p-4">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Order Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review checkout items, update delivery fulfillments, and track tracking status.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold w-fit">
          {orders.length} total orders
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md w-full">
        <input
          aria-label="Search orders filter input"
          type="text"
          placeholder="Search product, buyer name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm rounded-2xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10 p-1 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Tailwind Responsive Table View wrapper */}
      <div className="w-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Buyer
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700 hidden md:table-cell">
                  Seller
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700 hidden sm:table-cell">
                  Payment
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Order Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700 hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-sm text-slate-400">
                    No records match current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Product Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {order.productImage ? (
                          <img
                            src={order.productImage}
                            alt={order.productTitle || "Product image"}
                            className="w-10 h-10 rounded-full border border-slate-200 shadow-sm shrink-0 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 shadow-sm text-xs font-bold text-slate-400">
                            P
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-slate-800 truncate max-w-[140px] sm:max-w-[200px]">
                            {order.productTitle}
                          </p>
                          <div className="flex flex-col gap-0.5 mt-0.5">
                            <span className="text-xs text-slate-500 font-medium">
                              Qty: {order.quantity}
                            </span>
                            {/* Mobile View responsive fallback */}
                            <span className="text-[11px] text-indigo-600 font-medium md:hidden">
                              Seller: {order.sellerInfo?.name || "N/A"}
                            </span>
                            <span className="text-[11px] text-slate-400 lg:hidden block mt-0.5">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Buyer Cell */}
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate max-w-[120px] sm:max-w-[160px]">
                          {order.buyerInfo?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-[160px] select-all">
                          {order.buyerInfo?.email}
                        </p>
                      </div>
                    </td>

                    {/* Seller Cell */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate max-w-[150px]">
                          {order.sellerInfo?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate max-w-[150px] select-all">
                          {order.sellerInfo?.email}
                        </p>
                      </div>
                    </td>

                    {/* Amount Cell */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-800 text-sm">
                          ${order.totalAmount?.toFixed(2) || order.price?.toFixed(2)}
                        </span>
                        {/* Mobile view indicator */}
                        <div className="sm:hidden">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 font-semibold rounded-md border capitalize ${
                              paymentStatusStyles[order.paymentStatus] || "bg-slate-50 text-slate-700 border-slate-200"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Payment Dropdown */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="relative min-w-[110px] w-[110px]">
                        <select
                          value={order.paymentStatus}
                          disabled={updating === order._id + "paymentStatus"}
                          onChange={(e) => handleStatusChange(order._id, "paymentStatus", e.target.value)}
                          className={`w-full text-xs font-semibold px-2.5 py-1 pr-6 rounded-md border appearance-none capitalize cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:opacity-50 transition-all ${
                            paymentStatusStyles[order.paymentStatus] || "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          {PAYMENT_STATUSES.map((status) => (
                            <option key={status} value={status} className="bg-white text-slate-700 font-normal">
                              {status}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </td>

                    {/* Order Status Dropdown */}
                    <td className="px-6 py-4">
                      <div className="relative min-w-[115px] sm:min-w-[135px] w-full max-w-[140px]">
                        <select
                          value={order.orderStatus}
                          disabled={updating === order._id + "orderStatus"}
                          onChange={(e) => handleStatusChange(order._id, "orderStatus", e.target.value)}
                          className={`w-full text-xs font-semibold px-2.5 py-1 pr-6 rounded-md border appearance-none capitalize cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:opacity-50 transition-all ${
                            orderStatusStyles[order.orderStatus] || "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status} className="bg-white text-slate-700 font-normal">
                              {status}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </td>

                    {/* Date Cell */}
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-xs text-slate-500 whitespace-nowrap font-medium">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}