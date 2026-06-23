import Link from "next/link";
import { ArrowLeft } from "@gravity-ui/icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CategoryProductDetailsCard from "@/components/products/CategoryProductDetailsCard";
import ReviewsSection from "@/components/products/ReviewSection";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  const [productRes, session] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, { cache: "no-store" }),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!productRes.ok) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-default-500">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-primary hover:underline">
          ← Back to products
        </Link>
      </section>
    );
  }

  const { data: product } = await productRes.json();

  return (
    <section className="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-default-500 hover:text-primary">
        <ArrowLeft width={16} />
        Back to products
      </Link>

      <CategoryProductDetailsCard product={product} currentUser={session?.user} />
      <ReviewsSection productId={id}/>
    </section>
  );
};

export default ProductDetailsPage;