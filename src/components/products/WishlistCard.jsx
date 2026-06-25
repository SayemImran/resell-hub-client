"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const WishlistCard = ({ product, userId }) => {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  const { _id, title, imageUrl, price, category, condition, stock } = product;

  const handleRemove = async () => {
    try {
      setRemoving(true);

      const res = await clientAuthFetch(`http://localhost:5000/api/wishlist/${userId}/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove from wishlist");
      }

      toast.success("Removed from wishlist");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove. Please try again.");
      setRemoving(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">
      <div className="relative aspect-video">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />

        <button
          onClick={handleRemove}
          disabled={removing}
          aria-label="Remove from wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md hover:bg-white disabled:opacity-50"
        >
          <TrashBin width={16} className="text-danger" />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-default-500">
            {category} · {condition}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-bold text-primary">${price}</p>
          <Chip size="sm" color={stock > 0 ? "success" : "danger"} variant="flat">
            {stock > 0 ? `${stock} In Stock` : "Out of Stock"}
          </Chip>
        </div>

        <Link href={`/products/${_id}`}>
          <Button variant="flat" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WishlistCard;