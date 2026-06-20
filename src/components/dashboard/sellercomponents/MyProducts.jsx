"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Input, Button } from "@heroui/react";

import { Magnifier, Pencil, TrashBin, Boxes3 } from "@gravity-ui/icons";

const demoProducts = [
  {
    _id: "1",
    title: "MacBook Pro M2",
    category: "Electronics",
    price: 1200,
    stock: 5,
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
  },
  {
    _id: "2",
    title: "Nike Air Max",
    category: "Fashion",
    price: 150,
    stock: 12,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    _id: "3",
    title: "Gaming Chair",
    category: "Furniture",
    price: 280,
    stock: 3,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
  },
];

export default function MyProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ? true : product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleDelete = (id) => {
    console.log("Delete Product:", id);
  };

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

      {/* Products */}
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
                src={product.image}
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

                <p className="text-sm text-default-500">{product.category}</p>
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
                  className="
                    rounded-full
                    bg-green-500/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-green-600
                  "
                >
                  Active
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="sm" variant="flat" className="flex-1">
                  <Pencil width={16} />
                  Edit
                </Button>

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

      {/* Empty State */}
      {filteredProducts.length === 0 && (
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
