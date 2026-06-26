"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddToCartButton = ({ productId, quantity = 1, currentUser, stock }) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  // Check if the current user has the admin role safely
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      setAdding(true);

      const res = await clientAuthFetch(`${API_URL}/api/cart`, {
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

  // If the user is an admin, intercept and render the details button instead
  if (isAdmin) {
    return (
      <button
        type="button"
        onClick={() => router.push(`/products/${productId}`)}
        className="w-full text-center text-sm font-semibold px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors shadow-sm"
      >
        View Details
      </button>
    );
  }

  // Standard buyer add to cart button layout 
  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={stock === 0 || adding}
      className={`w-full text-center text-sm font-semibold px-5 py-2.5 rounded-xl text-white shadow-md transition-all active:scale-[0.99] ${
        stock === 0
          ? "bg-slate-300 cursor-not-allowed shadow-none"
          : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
      }`}
    >
      {stock === 0 ? "Out of Stock" : adding ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;