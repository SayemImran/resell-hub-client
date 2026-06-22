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
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/80
            backdrop-blur-md
            transition-colors
            hover:bg-white
          "
        >
          <Heart
            width={18}
            className={isWishlisted ? "text-danger" : "text-default-500"}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-default-500">
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
        <div className="flex gap-3">
          <Link href={`/products/${product._id}`} className="flex-1">
            <Button size="sm" variant="flat" className="w-full">
              Details
            </Button>
          </Link>

          <Button
            size="sm"
            color="primary"
            className="flex-1"
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