import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Persons, Boxes3, ShoppingCart } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminOverviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  if (session.user.role !== "Admin") {
    return (
      <div className="p-16 text-center text-default-500">
        You don't have permission to view this page.
      </div>
    );
  }

  const res = await fetch(`${API_URL}/api/admin/stats`, { cache: "no-store" });

  const { data } = res.ok
    ? await res.json()
    : { data: { totalUsers: 0, totalProducts: 0, totalOrders: 0 } };

  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Persons,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: Boxes3,
      color: "text-green-600",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-default-500">
          Full overview and control of the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                    <h2 className="mt-3 text-3xl font-bold">{stat.value.toLocaleString("en-US")}</h2>
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
    </section>
  );
};

export default AdminOverviewPage;