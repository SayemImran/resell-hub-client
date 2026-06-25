import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CartContents from "@/components/cart/CartContents";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CartPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in to view your cart.</div>;
  }

  const res = await fetch(`${API_URL}/api/cart/${session.user.id}`, {
    cache: "no-store",
  });

  const { data: cartItems } = res.ok ? await res.json() : { data: [] };

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">My Cart</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Review your items before checkout.
        </p>
      </div>

      <CartContents initialItems={cartItems} userId={session.user.id} />
    </section>
  );
};

export default CartPage;