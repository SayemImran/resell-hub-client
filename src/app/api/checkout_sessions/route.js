import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const { checkoutGroupId, items } = await req.json();
    // items: [{ title, image, price, quantity }, ...]

    if (!checkoutGroupId || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing checkout data" }, { status: 400 });
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      metadata: {
        checkoutGroupId,
      },
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}&checkoutGroupId=${checkoutGroupId}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}