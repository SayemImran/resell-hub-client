import AnalyticsCharts from "@/components/dashboard/sellercomponents/AnalyticsCharts";
import { auth } from "@/lib/auth";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";
import { headers } from "next/headers";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SellerAnalyticsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

   if (session.user.role !== "Seller") {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 p-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Lock Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Text Context */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">
              Restricted Access
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
              You don't have the required account permissions to view this
              dashboard page.
            </p>
          </div>

          {/* Action Redirect */}
          <button
            type="button"
            className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-98"
          >
            <Link href="/">
            Return Home
            </Link>
          </button>
        </div>
      </div>
    );
  }

  const res = await serverAuthFetch(`${API_URL}/api/orders/seller/${session.user.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-16 text-center text-danger">Could not load analytics.</div>;
  }

  const { data: orders } = await res.json();

  // TODO: once Stripe is live, filter to paymentStatus === "paid" instead of just excluding "rejected"
  const validOrders = orders.filter((o) => o.orderStatus !== "rejected");

  // --- Sales by status ---
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {});

  const salesByStatus = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  // --- Monthly sales trend ---
  const monthlyMap = {};
  validOrders.forEach((order) => {
    const date = new Date(order.createdAt);
    const key = date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    monthlyMap[key] = (monthlyMap[key] || 0) + order.totalAmount;
  });

  const monthlySales = Object.entries(monthlyMap)
    .map(([month, revenue]) => ({ month, revenue }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  // --- Top selling products ---
  const productMap = {};
  validOrders.forEach((order) => {
    if (!productMap[order.productId]) {
      productMap[order.productId] = {
        productId: order.productId,
        title: order.productTitle,
        revenue: 0,
        quantitySold: 0,
      };
    }
    productMap[order.productId].revenue += order.totalAmount;
    productMap[order.productId].quantitySold += order.quantity;
  });

  const topProducts = Object.values(productMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // --- Summary stats ---
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Sales Analytics</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Visual representation of your performance.
        </p>
      </div>

      <AnalyticsCharts
        salesByStatus={salesByStatus}
        monthlySales={monthlySales}
        topProducts={topProducts}
        summary={{
          totalRevenue: totalRevenue.toFixed(2),
          totalOrders,
          avgOrderValue: avgOrderValue.toFixed(2),
        }}
      />
    </section>
  );
};

export default SellerAnalyticsPage;