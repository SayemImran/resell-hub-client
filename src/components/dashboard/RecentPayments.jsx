const payments = [
  {
    id: "TXN-902142",
    amount: "-$349.99",
    status: "Success",
  },
  {
    id: "TXN-885498",
    amount: "-$120.00",
    status: "Pending",
  },
  {
    id: "TXN-872242",
    amount: "-$45.00",
    status: "Failed",
  },
];

export default function RecentPayments() {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <h2 className="font-semibold mb-5">Recent Payments</h2>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h4 className="font-medium">{payment.id}</h4>
              <p className="text-sm text-default-500">
                Bank Transfer
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{payment.amount}</p>

              <span
                className={`text-xs font-medium ${
                  payment.status === "Success"
                    ? "text-green-600"
                    : payment.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}