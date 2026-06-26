import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardSidebar from "./DashboardSidebar";

export async function Sidebar() {
  const sidebaritemsbyrole = {
    Seller: [
      { icon: "House", label: "Overview", links: "/dashboard/seller" },
      { icon: "Boxes3", label: "Add Product", links: "/dashboard/seller/add-product" },
      { icon: "Boxes3", label: "My Products", links: "/dashboard/seller/products" },
      { icon: "ShoppingCart", label: "Manage Orders", links: "/dashboard/seller/orders" },
      { icon: "ChartColumn", label: "Sales Analytics", links: "/dashboard/seller/analytics" },
    ],
    Buyer: [
      { icon: "House", label: "Overview", links: "/dashboard/buyer" },
      { icon: "ShoppingCart", label: "My Orders", links: "/dashboard/buyer/orders" },
      { icon: "Heart", label: "Wishlist", links: "/dashboard/buyer/wishlist" },
      { icon: "Briefcase", label: "Payment History", links: "/dashboard/buyer/payments" },
    ],
    Admin: [
      { icon: "House", label: "Overview", links: "/dashboard/admin" },
      { icon: "Persons", label: "Manage Users", links: "/dashboard/admin/users" },
      { icon: "Boxes3", label: "Manage Products", links: "/dashboard/admin/products" },
      { icon: "ShoppingCart", label: "Manage Orders", links: "/dashboard/admin/orders" },
      { icon: "ChartColumn", label: "Analytics", links: "/dashboard/admin/analytics" },
    ],
  };

  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role || "Buyer";
  const navItems = sidebaritemsbyrole[role] || [];

  return <DashboardSidebar navItems={navItems} role={role} />;
}