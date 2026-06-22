"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardFooter,
  Chip,
  Button,
  Avatar,
} from "@heroui/react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

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

  const [placingOrder, setPlacingOrder] = useState(false);

  // No early return before this — keep hook order stable
  const { data: sessionData } = authClient.useSession();
  const currentUser = sessionData?.user;

  const isOwner = seller_info?.seller_id === currentUser?.id;

  const handleOrder = async () => {
    if (!currentUser) {
      toast.error("Please log in to place an order.");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerInfo: {
            userId: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
          },
          productId: _id,
          quantity: 1,
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
    <Card
      className="
        group
        bg-white/60
        backdrop-blur-xl
        border border-white/70
        shadow-[0_8px_32px_rgba(31,38,135,0.08)]
        hover:shadow-[0_12px_40px_rgba(31,38,135,0.15)]
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status */}
        <Chip
          size="sm"
          color={status === "active" ? "success" : "danger"}
          className="absolute top-3 right-3 backdrop-blur-md"
        >
          {status}
        </Chip>
        {/* Category */}
        <Chip
          size="sm"
          variant="flat"
          className="absolute top-3 left-3 bg-white/70 backdrop-blur-md"
        >
          {category}
        </Chip>

        {/* Owner badge */}
        {isOwner && (
          <Chip
            size="sm"
            color="primary"
            className="absolute bottom-3 left-3 backdrop-blur-md"
          >
            Your Listing
          </Chip>
        )}
      </div>

      <Card.Content className="gap-3">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <span className="text-xl font-bold text-primary whitespace-nowrap">
            ${price}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* Product Meta */}
        <div className="flex flex-wrap gap-2">
          <Chip size="sm" variant="flat">
            {condition}
          </Chip>
          <Chip
            size="sm"
            variant="flat"
            color={stock > 0 ? "success" : "danger"}
          >
            {stock > 0 ? `${stock} In Stock` : "Out of Stock"}
          </Chip>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-3 pt-2">
          <Avatar size="sm" src={seller_info?.avatar} name={seller_info?.name} />
          <div>
            <p className="text-sm font-medium text-gray-800">
              {seller_info?.name}
            </p>
            <p className="text-xs text-gray-500">Verified Seller</p>
          </div>
        </div>
      </Card.Content>

      <CardFooter className="gap-2">
        {!isOwner && (
          <Button
            color="primary"
            className="flex-1 font-medium"
            isDisabled={stock <= 0 || placingOrder}
            onClick={handleOrder}
          >
            {placingOrder ? "Placing..." : "Order now"}
          </Button>
        )}

        <Link href={`/products/${_id}`} className={isOwner ? "flex-1" : ""}>
          <Button variant="bordered" className={isOwner ? "w-full" : ""}>
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;