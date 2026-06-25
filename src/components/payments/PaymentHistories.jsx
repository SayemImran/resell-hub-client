import { Chip } from "@heroui/react";
import { BriefcaseFill } from "@gravity-ui/icons";

const paymentStatusColor = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

const PaymentHistories = ({ paymentHistory = [] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold sm:text-xl">Payment History</h2>

      {paymentHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center">
          <BriefcaseFill width={36} height={36} className="opacity-40" />
          <p className="mt-3 text-sm text-default-500">No payment history yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">
          <div className="divide-y divide-white/10">
            {paymentHistory.map((payment) => (
              <div
                key={payment._id}
                className="flex items-center justify-between gap-4 p-4 sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium sm:text-base">
                    {payment.productTitle}
                  </p>
                  <p className="text-xs text-default-500">
                    {new Date(payment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  {payment.paymentIntentId && (
                    <span className="mt-1 inline-block truncate rounded-lg bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
                      {payment.paymentIntentId}
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <p className="font-semibold">${payment.totalAmount}</p>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={paymentStatusColor[payment.paymentStatus] || "default"}
                  >
                    {payment.paymentStatus}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistories;