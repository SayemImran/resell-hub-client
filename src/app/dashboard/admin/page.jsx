import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Persons, Boxes3, ShoppingCart } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminOverviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="p-16 text-center text-default-500">Please log in.</div>
    );
  }

  if (session.user.role !== "Admin") {
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

  const res = await serverAuthFetch(`${API_URL}/api/admin/stats`, {
    cache: "no-store",
  });

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
                    <h2 className="mt-3 text-3xl font-bold">
                      {stat.value.toLocaleString("en-US")}
                    </h2>
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
