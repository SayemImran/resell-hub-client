import OrderSuccessClient from "@/components/orders/OrderSuccessClient";
import { stripe } from "@/lib/stripe";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function OrderSuccessPage({ searchParams }) {
  const { session_id, checkoutGroupId } = await searchParams;

  if (!session_id || !checkoutGroupId) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-danger">Invalid Request</h1>
        <p className="text-default-500">No payment session found.</p>
      </section>
    );
  }

  let paymentConfirmed = false;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const res = await fetch(
        `${API_URL}/api/orders/checkout/${checkoutGroupId}/confirm-payment`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: session.payment_intent,
            paymentMethod: "card",
          }),
        }
      );

      paymentConfirmed = res.ok;
    }
  } catch (err) {
    console.error("Failed to verify Stripe session:", err);
  }

  return <OrderSuccessClient success={paymentConfirmed} />;
}