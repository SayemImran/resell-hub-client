import { Chip } from "@heroui/react";

const paymentStatusColor = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

const orderStatusColor = {
  processing: "primary",
  confirmed: "primary",
  shipped: "secondary",
  delivered: "success",
  cancelled: "danger",
};

const OrderCard = ({ order }) => {
  const {
    productTitle,
    productImage,
    price,
    quantity,
    totalAmount,
    paymentStatus,
    orderStatus,
    sellerInfo,
    paymentIntentId,
    createdAt,
  } = order;

  const orderedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-3xl
        border border-white/20
        bg-white/10
        p-4
        backdrop-blur-xl
        shadow-xl
        sm:flex-row
        sm:items-center
        sm:p-5
      "
    >
      {/* Image */}
      <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
        <img
          src={productImage}
          alt={productTitle}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-1">
        <h3 className="text-base font-semibold sm:text-lg">{productTitle}</h3>
        <p className="text-sm text-default-500">
          Sold by {sellerInfo?.name} · Ordered on {orderedDate}
        </p>
        <p className="text-sm text-default-500">
          Qty: {quantity} × ${price} = <span className="font-semibold text-foreground">${totalAmount}</span>
        </p>

        {paymentIntentId && (
          <p className="truncate text-xs text-default-400">
            Transaction ID: <span className="font-mono">{paymentIntentId}</span>
          </p>
        )}
      </div>

      {/* Status badges */}
      <div className="flex flex-row gap-2 sm:flex-col sm:items-end sm:gap-2">
        <Chip
          size="sm"
          color={paymentStatusColor[paymentStatus] || "default"}
          variant="flat"
        >
          Payment: {paymentStatus}
        </Chip>
        <Chip
          size="sm"
          color={orderStatusColor[orderStatus] || "default"}
          variant="flat"
        >
          {orderStatus}
        </Chip>
      </div>
    </div>
  );
};

export default OrderCard;