import SellerDashboardOverview from "@/components/dashboard/overview/SellerDashboardOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function SellerDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  const sellerId = session.user.id;

  const [productsRes, ordersRes] = await Promise.all([
    fetch(`${API_URL}/api/products?sellerId=${sellerId}`, { cache: "no-store" }),
    fetch(`${API_URL}/api/orders/seller/${sellerId}`, { cache: "no-store" }),
  ]);

  const { data: products = [] } = productsRes.ok ? await productsRes.json() : { data: [] };
  const { data: orders = [] } = ordersRes.ok ? await ordersRes.json() : { data: [] };

  const totalProducts = products.length;

  const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
  const totalSales = paidOrders.length;
  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = orders.filter((order) => order.orderStatus === "pending").length;

  return (
    <SellerDashboardOverview
      totalProducts={totalProducts}
      totalSales={totalSales}
      totalRevenue={totalRevenue}
      pendingOrders={pendingOrders}
    />
  );
}