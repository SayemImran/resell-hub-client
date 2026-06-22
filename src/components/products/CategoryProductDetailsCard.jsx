"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "sonner";

const CategoryProductDetailsCard = ({ product, currentUser }) => {
  const [quantity, setQuantity] = useState(1);
  const [placingOrder, setPlacingOrder] = useState(false);

  if (!product) return null;

  const {
    _id,
    title,
    imageUrl,
    description,
    category,
    condition,
    price,
    stock,
    status,
    seller_info,
  } = product;

  const isOwner = seller_info?.seller_id === currentUser?.id;

  const increment = () => setQuantity((q) => Math.min(q + 1, stock));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleOrder = async () => {
    if (!currentUser) {
      toast.error("Please log in to place an order.");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerInfo: {
            userId: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
          },
          productId: _id,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      toast.success("Order placed successfully!");
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error(err.message || "Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">
      <div className="aspect-video">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-default-500">
            {category} · {condition}
          </p>
        </div>

        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            status === "available"
              ? "bg-green-500/10 text-green-600"
              : "bg-default-500/10 text-default-500"
          }`}
        >
          {status === "available" ? "Available" : status}
        </span>

        <p className="text-sm text-default-700 sm:text-base">{description}</p>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs text-default-500">Price</p>
            <p className="text-lg font-bold text-primary sm:text-xl">${price}</p>
          </div>

          <div className="text-right sm:text-left">
            <p className="text-xs text-default-500">Stock</p>
            <p className="text-sm font-semibold sm:text-base">{stock} available</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <p className="text-xs text-default-500">Seller info:</p>
          <p className="text-sm font-medium sm:text-base">{seller_info?.name}</p>
          <p className="text-xs text-default-500 sm:text-sm">{seller_info?.email}</p>
        </div>

        {isOwner ? (
          <div className="rounded-2xl bg-primary/10 p-4 text-center text-sm font-medium text-primary">
            This is your own listing
          </div>
        ) : stock === 0 ? (
          <Button isDisabled className="w-full">
            Out of Stock
          </Button>
        ) : (
          <>
            {/* Quantity stepper */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={decrement}
                disabled={quantity <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 disabled:opacity-40"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                onClick={increment}
                disabled={quantity >= stock}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 disabled:opacity-40"
              >
                +
              </button>
            </div>

            <Button
              color="primary"
              className="w-full"
              onClick={handleOrder}
              isDisabled={placingOrder}
            >
              {placingOrder ? "Placing Order..." : `Order Now — $${price * quantity}`}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProductDetailsCard;