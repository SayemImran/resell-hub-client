import React from "react";
import { Button } from "@heroui/react";

const CategoryProductDetailsCard = ({ product }) => {
  if (!product) return null;

  const {
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

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-xl
      "
    >
      {/* Image */}
      <div className="aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* Title + category/condition */}
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-default-500">
            {category} · {condition}
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`
            inline-block
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${
              status === "available"
                ? "bg-green-500/10 text-green-600"
                : "bg-default-500/10 text-default-500"
            }
          `}
        >
          {status === "available" ? "Available" : status}
        </span>

        {/* Description */}
        <p className="text-sm text-default-700 sm:text-base">{description}</p>

        {/* Price + Stock */}
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

        {/* Seller info */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <p className="text-xs text-default-500">Seller info:</p>
          <p className="text-sm font-medium sm:text-base">{seller_info?.name}</p>
          <p className="text-xs text-default-500 sm:text-sm">{seller_info?.email}</p>
        </div>

        {/* Action */}
        <Button color="primary" className="w-full">
          Contact Seller
        </Button>
      </div>
    </div>
  );
};

export default CategoryProductDetailsCard;