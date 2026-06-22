import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";
import CategoryProductDetailsCard from "@/components/products/CategoryProductDetailsCard";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-default-500">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-primary hover:underline">
          ← Back to products
        </Link>
      </section>
    );
  }

  const { data: product } = await res.json();

  return (
    <section className="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-default-500 hover:text-primary"
      >
        <ArrowLeft width={16} />
        Back to products
      </Link>

      <CategoryProductDetailsCard product={product} />
    </section>
  );
};

export default ProductDetailsPage;