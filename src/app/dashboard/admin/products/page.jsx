import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Boxes3 } from "@gravity-ui/icons";
import AdminProductCard from "@/components/dashboard/admin/AdminProductCard";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminProductsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  // Page-level gate — not real security yet, just hides the UI from non-admins
  // TODO: once JWT/server auth is added, also verify role on the Express side
  if (session.user.role !== "Admin") {
    return (
      <div className="p-16 text-center text-default-500">
        You don't have permission to view this page.
      </div>
    );
  }

  const res = await serverAuthFetch(`${API_URL}/api/admin/products/pending`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-16 text-center text-danger">Could not load pending products.</div>;
  }

  const { data: products } = await res.json();

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Product Approvals</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Review and approve or reject newly listed products.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center sm:p-16">
          <Boxes3 width={40} height={40} className="opacity-40 sm:h-12 sm:w-12" />
          <h3 className="mt-4 text-lg font-semibold sm:text-xl">All Caught Up</h3>
          <p className="mt-2 text-sm text-default-500 sm:text-base">
            No products waiting for approval.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {products.map((product) => (
            <AdminProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminProductsPage;