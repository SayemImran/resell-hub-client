import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Boxes3, Heart, BriefcaseFill, ShoppingCart } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";
import OrderCard from "@/components/orders/OrderCard";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const paymentStatusColor = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

const BuyerOverviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="p-16 text-center text-default-500">
        Please log in to view your overview.
      </div>
    );
  }

  const userId = session.user.id;

  const [ordersRes, wishlistRes] = await Promise.all([
    serverAuthFetch(`${API_URL}/api/orders/buyer/${userId}`, { cache: "no-store" }),
    serverAuthFetch(`${API_URL}/api/wishlist/${userId}`, { cache: "no-store" }),
  ]);

  const { data: orders = [] } = ordersRes.ok ? await ordersRes.json() : { data: [] };
  const { data: wishlistItems = [] } = wishlistRes.ok ? await wishlistRes.json() : { data: [] };

  // Derived stats
  const totalOrders = orders.length;
  const wishlistCount = wishlistItems.length;

  const totalPurchases = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const recentOrders = orders.slice(0, 5);

  const paymentHistory = orders.map((order) => ({
    _id: order._id,
    productTitle: order.productTitle,
    totalAmount: order.totalAmount,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt,
  }));

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
    },
    {
      label: "Wishlist Items",
      value: wishlistCount,
      icon: Heart,
    },
    {
      label: "Total Purchases",
      value: `$${totalPurchases.toFixed(2)}`,
      icon: BriefcaseFill,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, {session.user.name}
        </h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Here's an overview of your activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Icon width={22} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-default-500">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold sm:text-xl">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center">
            <Boxes3 width={36} height={36} className="opacity-40" />
            <p className="mt-3 text-sm text-default-500">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Payment history */}
     
    </section>
  );
};

export default BuyerOverviewPage;