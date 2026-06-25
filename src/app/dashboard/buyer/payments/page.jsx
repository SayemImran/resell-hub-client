import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PaymentHistories from "@/components/payments/PaymentHistories";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PaymentHistoryPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  const res = await fetch(`${API_URL}/api/orders/buyer/${session.user.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-16 text-center text-danger">Could not load payment history.</div>;
  }

  const { data: orders } = await res.json();

  const paymentHistory = orders.map((order) => ({
    _id: order._id,
    productTitle: order.productTitle,
    totalAmount: order.totalAmount,
    paymentStatus: order.paymentStatus,
    paymentIntentId: order.paymentIntentId,
    createdAt: order.createdAt,
  }));

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Payment History</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          A record of all your past payments.
        </p>
      </div>

      <PaymentHistories paymentHistory={paymentHistory} />
    </section>
  );
};

export default PaymentHistoryPage;