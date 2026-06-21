"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Input, Button, Spinner } from "@heroui/react";

import {
  Magnifier,
  Pencil,
  TrashBin,
  Boxes3,
  CloudGear,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Load current user — no early return here, just compute values
  const { data: sessionData, isLoading: sessionLoading } =
    authClient.useSession();
  const seller = sessionData?.user;
  const CURRENT_SELLER_ID = seller?.id;

  useEffect(() => {
    // Wait until the session has resolved AND we have an id
    if (sessionLoading || !CURRENT_SELLER_ID) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/api/products");

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        const myProducts = data.data.filter(
          (product) => product.seller_info?.seller_id === CURRENT_SELLER_ID,
        );

        setProducts(myProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load your products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sessionLoading, CURRENT_SELLER_ID]); // re-run when these change

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ? true : product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`);
      }

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Loading check now happens in JSX, AFTER all hooks have run
  if (sessionLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>

          <p className="mt-2 text-default-500">
            Manage, edit, and track all your product listings.
          </p>
        </div>

        <Link href="/dashboard/seller/add-product">
          <Button color="primary">Add Product</Button>
        </Link>
      </div>

      {/* Search + Filter */}
      <div
        className="
          rounded-3xl
          border border-white/20
          bg-white/10
          p-5
          backdrop-blur-xl
          shadow-xl
        "
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              rounded-xl
              border border-white/20
              bg-white/10
              px-4
              py-3
              backdrop-blur-md
              outline-none
            "
          >
            <option value="all">All Categories</option>

            <option value="Electronics">Electronics</option>

            <option value="Fashion">Fashion</option>

            <option value="Furniture">Furniture</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center p-16">
          <Spinner />
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border border-dashed
            border-danger/30
            p-16
            text-center
          "
        >
          <p className="text-danger">{error}</p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
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
              {/* Image */}
              <div className="aspect-video">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

              {/* Content */}
              <div className="space-y-4 p-5">
                <div>
                  <h3 className="text-lg font-semibold">{product.title}</h3>

                  <p className="text-sm text-default-500">
                    {product.category} · {product.condition}
                  </p>
                </div>

                {/* Stats */}
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

                {/* Status */}
                <div>
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        product.status === "available"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-default-500/10 text-default-500"
                      }
                    `}
                  >
                    {product.status === "available" ? "Active" : product.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/seller/products/${product._id}`}
                    className="flex-1"
                  >
                    <Button size="sm" variant="flat" className="w-full">
                      <Pencil width={16} />
                      view
                    </Button>
                  </Link>
                      <Link href={`/dashboard/seller/products/edit/${product._id}`}>
                      <Button size="sm" variant="flat" className="w-full">
                      <Pencil width={16} />
                      Edit
                    </Button>
                      </Link>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="flex-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <TrashBin width={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border border-dashed
            border-white/20
            p-16
            text-center
          "
        >
          <Boxes3 width={48} height={48} className="opacity-40" />

          <h3 className="mt-4 text-xl font-semibold">No Products Found</h3>

          <p className="mt-2 text-default-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </section>
  );
}
