import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const { orderId, productTitle, productImage, price, quantity, productId } =
      await req.json();

    if (!orderId || !price || !quantity) {
      return NextResponse.json(
        { error: "Missing required checkout fields" },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productTitle,
              images: productImage ? [productImage] : [],
            },
            unit_amount: Math.round(price * 100), // Stripe expects cents
          },
          quantity,
        },
      ],
      metadata: {
        orderId, // this is what the Express webhook will use to find the order
      },
      success_url: `${origin}/order-success?orderId=${orderId}`,
      cancel_url: `${origin}/products/${productId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}