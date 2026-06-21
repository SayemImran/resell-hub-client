import DetailsCard from "@/components/products/DetailsCard";

const ProductDetails = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: "no-store", // always get fresh data, never a stale cached fetch
  });
  console.log(res);
  if (!res.ok) {
    return <div>Product not found.</div>;
  }

  const { data: product } = await res.json();

  return (
    <div>
      <DetailsCard product={product} />
    </div>
  );
};

export default ProductDetails;