"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import { TrashBin, Boxes3 } from "@gravity-ui/icons";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CartContents = ({ initialItems, userId }) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);

  const updateQuantity = async (productId, newQuantity, maxStock) => {
    if (newQuantity < 1 || newQuantity > maxStock) return;

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await clientAuthFetch(`${API_URL}/api/cart/${userId}/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Failed to update quantity.");
    }
  };

  const removeItem = async (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));

    try {
      await clientAuthFetch(`${API_URL}/api/cart/${userId}/${productId}`, {
        method: "DELETE",
      });
      toast("Removed from cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item.");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-16 text-center">
        <Boxes3 width={48} height={48} className="opacity-40" />
        <h3 className="mt-4 text-xl font-semibold">Your Cart is Empty</h3>
        <p className="mt-2 text-default-500">Browse products and add something you like.</p>
        <Link href="/products">
          <Button color="primary" className="mt-4">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.productId}
          className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-xl sm:flex-row sm:items-center sm:p-5"
        >
          <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-20">
            <img
              src={item.product.imageUrl}
              alt={item.product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{item.product.title}</h3>
            <p className="text-sm text-default-500">${item.product.price} each</p>
          </div>

          {/* Quantity stepper */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.product.stock)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 disabled:opacity-40"
            >
              −
            </button>
            <span className="w-6 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.product.stock)}
              disabled={item.quantity >= item.product.stock}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 disabled:opacity-40"
            >
              +
            </button>
          </div>

          <p className="w-20 text-right font-semibold text-primary">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => removeItem(item.productId)}
            aria-label="Remove item"
            className="flex h-9 w-9 items-center justify-center rounded-full text-danger hover:bg-danger/10"
          >
            <TrashBin width={16} />
          </button>
        </div>
      ))}

      {/* Subtotal + checkout */}
      <div className="flex items-center justify-between rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
        <div>
          <p className="text-sm text-default-500">Subtotal</p>
          <p className="text-2xl font-bold text-primary">${subtotal.toFixed(2)}</p>
        </div>
        <Button color="primary" size="lg" onClick={() => router.push("/checkout")}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartContents;