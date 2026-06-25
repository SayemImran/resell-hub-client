"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddToCartButton = ({ productId, quantity = 1, currentUser, stock }) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      setAdding(true);

      const res = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          productId,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      toast.success("Added to cart!");
      router.refresh();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Button
      color="primary"
      className="w-full"
      onClick={handleAddToCart}
      isDisabled={stock === 0 || adding}
    >
      {stock === 0 ? "Out of Stock" : adding ? "Adding..." : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;