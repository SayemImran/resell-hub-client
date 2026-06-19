import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import OrdersTable from "@/components/dashboard/OrdersTable";
import WishlistPreview from "@/components/dashboard/WishlistPreview";
import CurrentStatus from "@/components/dashboard/CurrentStatus";
import RecentPayments from "@/components/dashboard/RecentPayments";

export default function BuyerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, Alex</h1>
            <p className="text-default-500">
              Today is Friday, June 19, 2026
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white rounded-xl border">
              Overview
            </button>

            <button className="px-4 py-2 bg-white rounded-xl border">
              Reports
            </button>
          </div>
        </div>

        <StatsCards />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <OrdersTable />
          </div>

          <div className="col-span-4">
            <WishlistPreview />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <CurrentStatus />
          </div>

          <div className="col-span-6">
            <RecentPayments />
          </div>
        </div>
      </div>
    </div>
  );
}