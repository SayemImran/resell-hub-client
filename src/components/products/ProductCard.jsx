"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    description,
    price,
    imageUrl,
    category,
    condition,
    seller_info,
    status,
    stock,
  } = product;

  const { data: sessionData } = authClient.useSession();
  const currentUser = sessionData?.user;

  // Role & Ownership Logic
  const isOwner = seller_info?.seller_id === currentUser?.id;
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  
  // Hide cart interactions for both the listing's owner and platform admins
  const hideCartAction = isOwner || isAdmin;

  return (
    <div
      className="
        group
        bg-white
        border border-slate-200
        shadow-sm
        hover:shadow-md
        transition-all duration-300
        overflow-hidden
        rounded-3xl
        flex flex-col
      "
    >
      {/* Product Image Section */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-50">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
        />
        
        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full capitalize backdrop-blur-md ${
            status === "active" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
              : "bg-rose-50 text-rose-700 border border-rose-200"
          }`}
        >
          {status}
        </span>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-slate-700 border border-slate-100 shadow-sm backdrop-blur-md">
          {category}
        </span>

        {/* Dynamic Context Tag */}
        {hideCartAction && (
          <span className={`absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white backdrop-blur-md ${
            isOwner ? "bg-blue-600/90" : "bg-slate-800/90"
          }`}>
            {isOwner ? "Your Listing" : "Admin View"}
          </span>
        )}
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Title & Pricing Summary */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-slate-800 line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          <span className="text-lg font-extrabold text-blue-600 whitespace-nowrap">
            ${price}
          </span>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Condition & Stock Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[11px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-100">
            {condition}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${
            stock > 0 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-rose-50 text-rose-700 border-rose-100"
          }`}>
            {stock > 0 ? `${stock} In Stock` : "Out of Stock"}
          </span>
        </div>

        {/* Seller Context Info Card */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-slate-50 mt-1">
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
            {seller_info?.avatar ? (
              <img src={seller_info.avatar} alt={seller_info.name} className="h-full w-full object-cover" />
            ) : (
              seller_info?.name?.charAt(0).toUpperCase() || "S"
            )}
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-700 truncate">
              {seller_info?.name || "Anonymous Seller"}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Verified Seller</p>
          </div>
        </div>
      </div>

      {/* Interactive Footer Layout Strip */}
      <div className="p-5 pt-0 flex gap-2">
        {!hideCartAction && (
          <div className="flex-1">
            <AddToCartButton
              productId={_id}
              quantity={1}
              currentUser={currentUser}
              stock={stock}
            />
          </div>
        )}

        <Link href={`/products/${_id}`} className={hideCartAction ? "w-full" : ""}>
          <button 
            type="button"
            className={`text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors ${
              hideCartAction ? "w-full text-center" : ""
            }`}
          >
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;