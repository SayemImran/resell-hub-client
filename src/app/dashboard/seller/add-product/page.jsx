import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddProductForm from "@/components/dashboard/sellercomponents/AddProductForm";

const AddProductPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="p-16 text-center text-default-500">Please log in.</div>
    );
  }

  if (!["Seller", "Admin"].includes(session.user.role)) {
    return (
      <div className="p-16 text-center text-default-500">
        You don't have permission to view this page.
      </div>
    );
  }

  return (
    <div>
      <AddProductForm currentUser={session.user} />
    </div>
  );
};

export default AddProductPage;
