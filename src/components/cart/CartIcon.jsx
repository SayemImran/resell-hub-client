"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CartIcon = () => {
  const [count, setCount] = useState(0);

  const { data: sessionData } = authClient.useSession();
  const userId = sessionData?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchCartCount = async () => {
      try {
        const res = await clientAuthFetch(`${API_URL}/api/cart/${userId}`);
        if (!res.ok) return;
        const { data } = await res.json();
        setCount(data.reduce((sum, item) => sum + item.quantity, 0));
      } catch (err) {
        console.error("Failed to fetch cart count:", err);
      }
    };

    fetchCartCount();
  }, [userId]);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart width={22} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;