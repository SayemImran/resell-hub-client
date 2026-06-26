"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminProductCard = ({ product }) => {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const {
    _id,
    title,
    description,
    imageUrl,
    category,
    condition,
    price,
    stock,
    seller_info,
  } = product;

  const handleDecision = async (approvalStatus) => {
    try {
      setUpdating(true);

      const res = await clientAuthFetch(`${API_URL}/api/admin/products/${_id}/approval`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvalStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      toast.success(data.message);
      router.refresh();
    } catch (err) {
      console.error("Failed to update approval status:", err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">
      <div className="relative aspect-video">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        <Chip size="sm" color="warning" className="absolute right-3 top-3 backdrop-blur-md">
          Pending Review
        </Chip>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-default-500">
            {category} · {condition}
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-default-700">{description}</p>

        <div className="flex items-center justify-between">
          <p className="font-bold text-primary">${price}</p>
          <p className="text-sm text-default-500">Stock: {stock}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-default-500">Seller</p>
          <p className="text-sm font-medium">{seller_info?.name}</p>
          <p className="text-xs text-default-500">{seller_info?.email}</p>
        </div>

        <div className="flex gap-3">
          <Button
            color="primary"
            className="flex-1"
            onClick={() => handleDecision("approved")}
            isDisabled={updating}
          >
            Approve
          </Button>
          <Button
            color="danger"
            variant="flat"
            className="flex-1"
            onClick={() => handleDecision("rejected")}
            isDisabled={updating}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;