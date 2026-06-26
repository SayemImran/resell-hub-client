"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, InputGroup, Label } from "@heroui/react";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CheckoutForm = ({ cartItems, currentUser }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [address, setAddress] = useState(currentUser.address || "");
  const [phone, setPhone] = useState(currentUser.phone || "");

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!address.trim() || !phone.trim()) {
      toast.error("Please fill in your delivery information.");
      return;
    }

    try {
      setProcessing(true);

      // Step 1: create one order per cart item, linked by checkoutGroupId
      const orderRes = await clientAuthFetch(`${API_URL}/api/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerInfo: {
            userId: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
          },
          items: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          deliveryInfo: { address, phone },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Step 2: create Stripe Checkout Session for the whole cart
      const checkoutRes = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkoutGroupId: orderData.checkoutGroupId,
          items: cartItems.map((item) => ({
            title: item.product.title,
            image: item.product.imageUrl,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });

      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok) {
        throw new Error(checkoutData.error || "Failed to start checkout");
      }

      window.location.href = checkoutData.url;
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error(err.message);
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Order summary */}
      <div className="space-y-3 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
        <h2 className="font-semibold">Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item.productId} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{item.product.title}</p>
              <p className="text-default-500">
                ${item.product.price} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <p className="font-semibold">Total Amount</p>
          <p className="text-xl font-bold text-primary">${total.toFixed(2)}</p>
        </div>
      </div>

      {/* Delivery info */}
      <div className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
        <h2 className="font-semibold">Delivery Information</h2>

        <TextField className="w-full">
          <Label>Phone Number</Label>
          <InputGroup>
            <InputGroup.Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXXXXXXXX"
              className="w-full"
            />
          </InputGroup>
        </TextField>

        <TextField className="w-full">
          <Label>Delivery Address</Label>
          <InputGroup>
            <InputGroup.Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, Country"
              className="w-full"
            />
          </InputGroup>
        </TextField>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="flat"
          className="flex-1"
          onClick={() => router.push("/cart")}
          isDisabled={processing}
        >
          Cancel Checkout
        </Button>
        <Button
          color="primary"
          className="flex-1"
          onClick={handleCheckout}
          isDisabled={processing}
        >
          {processing ? "Processing..." : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;