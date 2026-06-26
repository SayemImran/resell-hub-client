"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const ProductCategoryCard = ({ product, initialIsWishlisted = false, onOrderNow }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [togglingWishlist, setTogglingWishlist] = useState(false);

  const { data: sessionData } = authClient.useSession();
  const currentUser = sessionData?.user;

  // Role Checks
  const isOwner = product.seller_info?.seller_id === currentUser?.id;
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  
  // Admins or Owners should not be allowed to buy or wishlist items
  const hideBuyerActions = isOwner || isAdmin;

  const handleToggleWishlist = async () => {
    if (!currentUser) {
      toast.error("Please log in to use your wishlist.");
      return;
    }

    const wasWishlisted = isWishlisted;
    setIsWishlisted(!wasWishlisted);
    setTogglingWishlist(true);

    try {
      if (wasWishlisted) {
        const res = await clientAuthFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${currentUser.id}/${product._id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to remove from wishlist");
        toast("Removed from wishlist");
      } else {
        const res = await clientAuthFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.id,
            productId: product._id,
          }),
        });
        if (!res.ok) throw new Error("Failed to add to wishlist");
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
      toast.error("Something went wrong. Please try again.");
      setIsWishlisted(wasWishlisted);
    } finally {
      setTogglingWishlist(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Image + Header Tags Container */}
      <div className="relative aspect-video bg-slate-50">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        {/* Status Badges */}
        {product.approvalStatus === "approved" && (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-md sm:left-3 sm:top-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Approved
          </span>
        )}

        {/* Context Overlays for Owners and Admins vs Regular Buyers */}
        {hideBuyerActions ? (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-slate-800/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white sm:right-3 sm:top-3">
            {isOwner ? "Your Listing" : "Admin Preview"}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleToggleWishlist}
            disabled={togglingWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 border border-slate-100 shadow-sm backdrop-blur-md transition-colors hover:bg-white disabled:opacity-50 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
          >
            <svg 
              className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-slate-600"}`} 
              fill={isWishlisted ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Info Body */}
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
        <div>
          <h3 className="text-base font-semibold text-slate-800 line-clamp-1 sm:text-lg">{product.title}</h3>
          <p className="text-xs text-slate-400 font-medium sm:text-sm">
            {product.category} · {product.condition}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-b border-slate-50 py-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Price</p>
            <p className="font-bold text-blue-600">${product.price}</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Stock</p>
            <p className={`font-semibold text-sm ${product.stock === 0 ? "text-rose-600" : "text-slate-700"}`}>
              {product.stock} units
            </p>
          </div>
        </div>

        {/* Component Action Footer Options */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-1">
          <Link href={`/products/${product._id}`} className={hideBuyerActions ? "w-full" : "sm:flex-1"}>
            <button 
              type="button" 
              className="w-full text-center text-xs font-semibold px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            >
              Details
            </button>
          </Link>

          {!hideBuyerActions && (
            <button
              type="button"
              onClick={() => onOrderNow(product)}
              disabled={product.stock === 0}
              className={`sm:flex-1 text-center text-xs font-bold px-4 py-2 rounded-xl text-white transition-all ${
                product.stock === 0 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-sm shadow-blue-100"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Order Now"}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCategoryCard;