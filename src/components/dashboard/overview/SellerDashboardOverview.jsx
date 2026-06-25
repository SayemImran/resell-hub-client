"use client";

import { Boxes3, ShoppingBag, ArrowChevronUp, Clock } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

export default function SellerDashboardOverview({
  totalProducts = 0,
  totalSales = 0,
  totalRevenue = 0,
  pendingOrders = 0,
}) {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Boxes3,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Sales",
      value: totalSales,
      icon: ShoppingBag,
      color: "text-green-600",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString("en-US")}`,
      icon: ArrowChevronUp,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
        <p className="mt-2 text-default-500">
          Monitor your products, sales performance, and orders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border border-white/10 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Card.Content className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-default-500">{stat.title}</p>
                    <h2 className="mt-3 text-3xl font-bold">{stat.value}</h2>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-2xl`}>
                    <Icon width={24} height={24} className={stat.color} />
                  </div>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      <Card className="border border-white/10 bg-white/60 backdrop-blur-xl shadow-lg">
        <Card.Content className="p-6">
          <h3 className="text-lg font-semibold">Performance Summary</h3>
          <p className="mt-2 text-default-500">
            You currently have{" "}
            <span className="font-semibold">{totalProducts}</span> active
            products, completed{" "}
            <span className="font-semibold">{totalSales}</span> sales, generated{" "}
            <span className="font-semibold">
              ${totalRevenue.toLocaleString("en-US")}
            </span>{" "}
            in revenue, and have{" "}
            <span className="font-semibold">{pendingOrders}</span> pending
            orders awaiting action.
          </p>
        </Card.Content>
      </Card>
    </section>
  );
}