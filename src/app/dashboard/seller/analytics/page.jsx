import AnalyticsCharts from "@/components/dashboard/sellercomponents/AnalyticsCharts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SellerAnalyticsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  const res = await fetch(`${API_URL}/api/orders/seller/${session.user.id}`, {
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