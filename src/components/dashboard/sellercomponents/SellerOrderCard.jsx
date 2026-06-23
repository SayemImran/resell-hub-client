"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { Check, Xmark } from "@gravity-ui/icons";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const statusColor = {
  pending: "warning",
  accepted: "primary",
  processing: "primary",
  shipped: "secondary",
  delivered: "success",
  rejected: "danger",
};

// Order matters here — index = step position in the flow
const STEPS = ["pending", "accepted", "processing", "shipped", "delivered"];

const DeliveryProgress = ({ orderStatus }) => {
  if (orderStatus === "rejected") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
        <Xmark width={16} />
        Order Rejected
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(orderStatus);

  return (
    <div className="flex items-center">
      {STEPS.map((step, index) => {
        const isComplete = index <= currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`
                  flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold
                  ${
                    isComplete
                      ? "border-primary bg-primary text-white"
                      : "border-default-300 bg-transparent text-default-400"
                  }
                `}
              >
                {isComplete ? <Check width={14} /> : index + 1}
              </div>
              <span
                className={`text-[10px] capitalize sm:text-xs ${
                  isComplete ? "font-medium text-foreground" : "text-default-400"
                }`}
              >
                {step}
              </span>
            </div>

            {!isLast && (
              <div
                className={`h-0.5 w-6 sm:w-10 ${
                  index < currentIndex ? "bg-primary" : "bg-default-200"
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

      const res = await fetch(`${API_URL}/api/orders/${_id}/status`, {
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
      return <Button isDisabled>Updating...</Button>;
    }

    switch (orderStatus) {
      case "pending":
        return (
          <>
            <Button color="primary" onClick={() => updateStatus("accepted")}>
              Accept Order
            </Button>
            <Button color="danger" variant="flat" onClick={() => updateStatus("rejected")}>
              Reject Order
            </Button>
          </>
        );
      case "accepted":
        return (
          <Button color="primary" onClick={() => updateStatus("processing")}>
            Start Processing
          </Button>
        );
      case "processing":
        return (
          <Button color="primary" onClick={() => updateStatus("shipped")}>
            Mark as Shipped
          </Button>
        );
      case "shipped":
        return (
          <Button color="primary" onClick={() => updateStatus("delivered")}>
            Mark as Delivered
          </Button>
        );
      case "delivered":
      case "rejected":
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-xl sm:p-5">
      {/* Top row: image + details + buyer + status chips */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
          <img src={productImage} alt={productTitle} className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-base font-semibold sm:text-lg">{productTitle}</h3>
          <p className="text-sm text-default-500">
            Qty: {quantity} · Total: <span className="font-semibold text-foreground">${totalAmount}</span>
          </p>
          <p className="text-sm text-default-500">Ordered on {orderedDate}</p>

          <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-2.5">
            <p className="text-xs text-default-500">Buyer</p>
            <p className="text-sm font-medium">{buyerInfo?.name}</p>
            <p className="text-xs text-default-500">{buyerInfo?.email}</p>
          </div>
        </div>

        <div className="flex flex-row gap-2 sm:flex-col sm:items-end">
          <Chip size="sm" variant="flat" color={statusColor[orderStatus] || "default"}>
            {orderStatus}
          </Chip>
          <Chip size="sm" variant="flat" color={paymentStatus === "paid" ? "success" : "warning"}>
            {paymentStatus}
          </Chip>
        </div>
      </div>

      {/* Delivery progress */}
      <div className="overflow-x-auto border-t border-white/10 pt-4">
        <DeliveryProgress orderStatus={orderStatus} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
        {renderActions()}
      </div>
    </div>
  );
};

export default SellerOrderCard;