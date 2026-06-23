import EditProductForm from "@/components/products/EditProductForm";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Product not found.</div>;
  }

  const { data: product } = await res.json();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
};

export default EditPage;