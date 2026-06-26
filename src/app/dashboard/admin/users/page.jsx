import UsersTable from "@/components/dashboard/admin/UserTable";
import { auth } from "@/lib/auth";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminUsersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div className="p-16 text-center text-default-500">Please log in.</div>;
  }

  if (session.user.role !== "Admin") {
    return (
      <div className="p-16 text-center text-default-500">
        You don't have permission to view this page.
      </div>
    );
  }

  const res = await serverAuthFetch(`${API_URL}/api/admin/users`, { cache: "no-store" });
  const { data: users } = res.ok ? await res.json() : { data: [] };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="mt-2 text-default-500">
          View, search, and manage platform users.
        </p>
      </div>

      <UsersTable initialUsers={users} currentAdminId={session.user.id} />
    </section>
  );
};

export default AdminUsersPage;