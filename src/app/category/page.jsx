"use client";

import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import { Boxes3 } from "@gravity-ui/icons";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ProductCategoryCard from "@/components/products/ProductCategoryCard";

const categories = ["All", "Electronics", "Accessories", "Sports", "Books"];
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlistIds, setWishlistIds] = useState(new Set());

  // No early return before this — keep hook order stable
  const { data: sessionData } = authClient.useSession();
  const currentUserId = sessionData?.user?.id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/products`);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch the buyer's existing wishlist once we know who they are
  useEffect(() => {
    if (!currentUserId) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${API_URL}/api/wishlist/${currentUserId}`);

        if (!res.ok) return; // fail quietly — wishlist hydration isn't critical path

        const { data } = await res.json();
        setWishlistIds(new Set(data.map((item) => item.productId)));
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [currentUserId]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  const handleOrderNow = (product) => {
    console.log("Order requested for:", product);
    toast.success(`Order placed for ${product.title}`);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Browse Products</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Explore listings by category.
        </p>
      </div>

      {/* Category filter */}
      <div className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="flex w-max gap-2 sm:gap-3 lg:w-auto lg:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                shrink-0
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-medium
                transition-colors
                sm:px-5
                ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-white"
                    : "border-white/20 bg-white/10 text-default-700 hover:bg-white/20"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center p-12 sm:p-16">
          <Spinner />
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-3xl border border-dashed border-danger/30 p-10 text-center sm:p-16">
          <p className="text-danger">{error}</p>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCategoryCard
              key={product._id}
              product={product}
              initialIsWishlisted={wishlistIds.has(product._id)}
              onOrderNow={handleOrderNow}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center sm:p-16">
          <Boxes3 width={40} height={40} className="opacity-40 sm:h-12 sm:w-12" />
          <h3 className="mt-4 text-lg font-semibold sm:text-xl">
            No Products Found
          </h3>
          <p className="mt-2 text-sm text-default-500 sm:text-base">
            Try a different category.
          </p>
        </div>
      )}
    </section>
  );
}