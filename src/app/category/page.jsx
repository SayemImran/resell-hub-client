"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ProductCategoryCard from "@/components/products/ProductCategoryCard";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const categories = ["All", "Electronics", "Accessories", "Sports", "Books"];
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Track search text input
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default"); // "default", "low-to-high", "high-to-low"
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const { data: sessionData } = authClient.useSession();
  const currentUserId = sessionData?.user?.id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/products?approvalStatus=approved`);

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

  // Fetch the buyer's existing wishlist once known
  useEffect(() => {
    if (!currentUserId) return;

    const fetchWishlist = async () => {
      try {
        const res = await clientAuthFetch(`${API_URL}/api/wishlist/${currentUserId}`);
        if (!res.ok) return;

        const { data } = await res.json();
        setWishlistIds(new Set(data.map((item) => item.productId)));
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [currentUserId]);

  // Combined Search + Category Filter + Price Sort operation
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by text search query (checks title and description safely)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // 2. Filter by category selection
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // 3. Sort remaining filtered results by price
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [products, searchQuery, activeCategory, sortOrder]);

  const handleOrderNow = (product) => {
    console.log("Order requested for:", product);
    toast.success(`Order placed for ${product.title}`);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Browse Products</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Find your favorite items by searching, categorizing, or sorting by price.
        </p>
      </div>

      {/* Control Panel: Search Bar, Categories, & Sorting Dropdown */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        
        {/* Search Bar Input Row */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm rounded-2xl px-4 py-2.5 pl-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10 p-1 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories + Sorting Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-1">
          {/* Category filter pills */}
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 scrollbar-none">
            <div className="flex gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Sorting Dropdown */}
          <div className="relative min-w-[160px] w-full sm:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full text-sm font-medium px-3 py-2 pr-8 rounded-xl border border-slate-200 bg-white text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="default">Sort by: Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Loading state */}
      {/* {loading && (
        <div className="flex items-center justify-center p-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      )} */}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-3xl border border-dashed border-rose-200 bg-rose-50/50 p-10 text-center sm:p-16">
          <p className="text-sm font-medium text-rose-600">{error}</p>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && processedProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {processedProducts.map((product) => (
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
      {!loading && !error && processedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 p-10 text-center sm:p-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-800 sm:text-lg">
            No Products Found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search query, selecting a different category, or updating your sorting filters.
          </p>
        </div>
      )}
    </section>
  );
}