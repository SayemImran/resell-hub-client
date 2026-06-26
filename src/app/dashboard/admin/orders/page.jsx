import { serverAuthFetch } from "@/lib/server/serverAuthFetch";
import React from "react";
import AdminOrdersClient from "@/components/dashboard/admin/AdminOrdersClient";

const OrderManagePage = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  let allOrders = [];
  try {
    const res = await serverAuthFetch(`${API_URL}/api/admin/orders`, {
      cache: "no-store",
    });
    
    if (res.ok) {
      const json = await res.json();
      allOrders = json.data || json || [];
    }
  } catch (error) {
    console.error("Error fetching admin orders:", error);
  }

  return (
    <div className="min-h-screen text-slate-800 p-3 sm:p-6 lg:p-8">
      <AdminOrdersClient initialOrders={allOrders} />
    </div>
  );
};

export default OrderManagePage;