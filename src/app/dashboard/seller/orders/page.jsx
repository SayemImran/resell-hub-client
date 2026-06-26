import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Boxes3 } from "@gravity-ui/icons";
import SellerOrderCard from "@/components/dashboard/sellercomponents/SellerOrderCard";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SellerOrdersPage = async () => {
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
            <Link href="/">Return Home</Link>
          </button>
        </div>
      </div>
    );
  }

  const res = await serverAuthFetch(
    `${API_URL}/api/orders/seller/${session.user.id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return (
      <div className="p-16 text-center text-danger">Could not load orders.</div>
    );
  }

  const { data: orders } = await res.json();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Manage Orders</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Handle incoming customer orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center sm:p-16">
          <Boxes3
            width={40}
            height={40}
            className="opacity-40 sm:h-12 sm:w-12"
          />
          <h3 className="mt-4 text-lg font-semibold sm:text-xl">
            No Orders Yet
          </h3>
          <p className="mt-2 text-sm text-default-500 sm:text-base">
            Orders from buyers will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <SellerOrderCard
              key={order._id}
              order={order}
              sellerId={session.user.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SellerOrdersPage;
