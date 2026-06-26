import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Boxes3 } from "@gravity-ui/icons";
import OrderCard from "@/components/orders/OrderCard";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";

const BuyerOrdersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="p-16 text-center text-default-500">
        Please log in to view your orders.
      </div>
    );
  }

  const res = await serverAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/buyer/${session.user.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-16 text-center text-danger">
        Could not load your orders. Please try again.
      </div>
    );
  }

  const { data: orders } = await res.json();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">My Orders</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Track the status of everything you've ordered.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center sm:p-16">
          <Boxes3 width={40} height={40} className="opacity-40 sm:h-12 sm:w-12" />
          <h3 className="mt-4 text-lg font-semibold sm:text-xl">No Orders Yet</h3>
          <p className="mt-2 text-sm text-default-500 sm:text-base">
            Items you order will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BuyerOrdersPage;