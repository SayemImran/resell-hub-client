"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Color mapping for plain Tailwind CSS badges
const statusStyles = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  accepted: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20", // Added cancelled style
};

const STEPS = ["pending", "accepted", "processing", "shipped", "delivered"];

const DeliveryProgress = ({ orderStatus }) => {
  if (orderStatus === "rejected") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-sm font-medium text-rose-500 w-fit">
        ✕ Order Rejected
      </div>
    );
  }

  // Handle cancelled fallback view
  if (orderStatus === "cancelled") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-sm font-medium text-rose-500 w-fit">
        ✕ Order Cancelled
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(orderStatus);

  return (
    <div className="flex items-center py-1">
      {STEPS.map((step, index) => {
        const isComplete = index <= currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors ${
                  isComplete
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-transparent text-slate-400"
                }`}
              >
                {isComplete ? "✓" : index + 1}
              </div>
              <span
                className={`text-[10px] capitalize sm:text-xs ${
                  isComplete ? "font-medium text-slate-800" : "text-slate-400"
                }`}
              >
                {step}
              </span>
            </div>

            {!isLast && (
              <div
                className={`h-0.5 w-6 sm:w-10 mx-1 ${
                  index < currentIndex ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const SellerOrderCard = ({ order, sellerId }) => {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const {
    _id,
    productTitle,
    productImage,
    quantity,
    totalAmount,
    paymentStatus,
    orderStatus,
    buyerInfo,
    createdAt,
  } = order;

  const orderedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);

      const res = await clientAuthFetch(`${API_URL}/api/orders/${_id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, sellerId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update order");
      }

      toast.success(data.message);
      router.refresh();
    } catch (err) {
      console.error("Failed to update order status:", err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const renderActions = () => {
    if (updating) {
      return (
        <button disabled className="px-4 py-2 text-sm font-medium rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed">
          Updating...
        </button>
      );
    }

    switch (orderStatus) {
      case "pending":
        return (
          <>
            <button
              onClick={() => updateStatus("accepted")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
            >
              Accept Order
            </button>
            <button
              onClick={() => updateStatus("rejected")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100/60 active:scale-95 transition-all"
            >
              Reject Order
            </button>
          </>
        );
      case "accepted":
        return (
          <button
            onClick={() => updateStatus("processing")}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            Start Processing
          </button>
        );
      case "processing":
        return (
          <button
            onClick={() => updateStatus("shipped")}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            Mark as Shipped
          </button>
        );
      case "shipped":
        return (
          <button
            onClick={() => updateStatus("delivered")}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            Mark as Delivered
          </button>
        );
      case "cancelled": // Falls through to return null and hide the action buttons
      case "delivered":
      case "rejected":
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Top row: image + details + buyer + status chips */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24 border border-slate-100">
          <img src={productImage} alt={productTitle} className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-base font-semibold text-slate-800 sm:text-lg">{productTitle}</h3>
          <p className="text-sm text-slate-500">
            Qty: {quantity} · Total: <span className="font-semibold text-slate-800">${totalAmount}</span>
          </p>
          <p className="text-sm text-slate-500">Ordered on {orderedDate}</p>

          <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
            <p className="text-xs text-slate-400 font-medium">Buyer</p>
            <p className="text-sm font-semibold text-slate-700">{buyerInfo?.name}</p>
            <p className="text-xs text-slate-500 select-all">{buyerInfo?.email}</p>
          </div>
        </div>

        <div className="flex flex-row gap-2 sm:flex-col sm:items-end">
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border capitalize ${statusStyles[orderStatus] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
            {orderStatus}
          </span>
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border capitalize ${paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
            {paymentStatus}
          </span>
        </div>
      </div>

      {/* Delivery progress tracking timeline */}
      <div className="overflow-x-auto border-t border-slate-100 pt-4">
        <DeliveryProgress orderStatus={orderStatus} />
      </div>

      {/* Action triggers conditionally evaluated */}
      {renderActions() && (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {renderActions()}
        </div>
      )}
    </div>
  );
};

export default SellerOrderCard;