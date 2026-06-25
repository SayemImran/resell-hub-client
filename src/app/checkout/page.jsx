import CheckoutForm from "@/components/cart/CheckoutForm";
import { auth } from "@/lib/auth";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CheckoutPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  const res = await serverAuthFetch(`${API_URL}/api/cart/${session.user.id}`, { cache: "no-store" });
  const { data: cartItems } = res.ok ? await res.json() : { data: [] };

  if (cartItems.length === 0) {
    return (
      <div className="p-16 text-center text-default-500">
        Your cart is empty. Add something before checking out.
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Review your order before payment.
        </p>
      </div>

      <CheckoutForm cartItems={cartItems} currentUser={session.user} />
    </section>
  );
};

export default CheckoutPage;