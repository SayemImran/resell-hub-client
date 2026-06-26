"use client";

import { useMemo, useState } from "react";
import { Button, Chip, Input } from "@heroui/react";
import { Magnifier, TrashBin } from "@gravity-ui/icons";
import { toast } from "sonner";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const roleColor = {
  Admin: "danger",
  Seller: "primary",
  Buyer: "default",
};

const UsersTable = ({ initialUsers, currentAdminId }) => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const term = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term)
    );
  }, [users, search]);

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";

    try {
      setUpdatingId(userId);

      const res = await clientAuthFetch(`${API_URL}/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountStatus: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, accountStatus: newStatus } : u))
      );

      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (userId) => {
    if (userId === currentAdminId) {
      toast.error("You can't delete your own account.");
      return;
    }

    if (!confirm("Are you sure you want to permanently delete this user?")) return;

    try {
      const res = await clientAuthFetch(`${API_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startcontent={<Magnifier width={16} />}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-lg">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/20 text-default-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-default-500">{user.email}</td>
                <td className="p-4">
                  <Chip size="sm" variant="flat" color={roleColor[user.role] || "default"}>
                    {user.role}
                  </Chip>
                </td>
                <td className="p-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={user.accountStatus === "blocked" ? "danger" : "success"}
                  >
                    {user.accountStatus === "blocked" ? "Blocked" : "Active"}
                  </Chip>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      color={user.accountStatus === "blocked" ? "success" : "warning"}
                      isDisabled={updatingId === user._id}
                      onClick={() => toggleStatus(user._id, user.accountStatus)}
                    >
                      {user.accountStatus === "blocked" ? "Unblock" : "Block"}
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      isIconOnly
                      onClick={() => handleDelete(user._id)}
                      aria-label="Delete user"
                    >
                      <TrashBin width={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="p-8 text-center text-sm text-default-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersTable;