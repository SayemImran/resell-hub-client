"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Heart } from "@gravity-ui/icons";

const ProductCategoryCard = ({ product, isWishlisted, onToggleWishlist, onOrderNow }) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Image + wishlist icon */}
      <div className="relative aspect-video">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => onToggleWishlist(product._id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="
            absolute
            right-2.5
            top-2.5
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/80
            backdrop-blur-md
            transition-colors
            hover:bg-white
            sm:right-3
            sm:top-3
            sm:h-9
            sm:w-9
          "
        >
          <Heart
            width={16}
            className={isWishlisted ? "text-danger" : "text-default-500"}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
        <div>
          <h3 className="text-base font-semibold sm:text-lg">{product.title}</h3>
          <p className="text-xs text-default-500 sm:text-sm">
            {product.category} · {product.condition}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-default-500">Price</p>
            <p className="font-bold text-primary">${product.price}</p>
          </div>

          <div>
            <p className="text-xs text-default-500">Stock</p>
            <p className="font-semibold">{product.stock}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Link href={`/products/${product._id}`} className="sm:flex-1">
            <Button size="sm" variant="flat" className="w-full">
              Details
            </Button>
          </Link>

          <Button
            size="sm"
            color="primary"
            className="sm:flex-1"
            onClick={() => onOrderNow(product)}
            isDisabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Order Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;