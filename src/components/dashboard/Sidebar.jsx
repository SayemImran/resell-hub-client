import { auth } from "@/lib/auth";
import {
  Bars,
  House,
  Boxes3,
  ShoppingCart,
  ChartColumn,
  Heart,
  Briefcase,
  Persons,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

export async function Sidebar() {
  const sidebaritemsbyrole = {
    Seller: [
      { icon: House, label: "Overview", links: "/dashboard/seller" },
      {
        icon: Boxes3,
        label: "Add Product",
        links: "/dashboard/seller/add-product",
      },
      {
        icon: Boxes3,
        label: "My Products",
        links: "/dashboard/seller/products",
      },
      {
        icon: ShoppingCart,
        label: "Manage Orders",
        links: "/dashboard/seller/orders",
      },
      {
        icon: ChartColumn,
        label: "Sales Analytics",
        links: "/dashboard/seller/analytics",
      },
    ],

    Buyer: [
      {
        icon: House,
        label: "Overview",
        links: "/dashboard/buyer",
      },
      {
        icon: ShoppingCart,
        label: "My Orders",
        links: "/dashboard/buyer/orders",
      },
      {
        icon: Heart,
        label: "Wishlist",
        links: "/dashboard/buyer/wishlist",
      },
      {
        icon: Briefcase,
        label: "Payment History",
        links: "/dashboard/buyer/payments",
      },
    ],

    Admin: [
      {
        icon: House,
        label: "Overview",
        links: "/dashboard/admin",
      },
      {
        icon: Persons,
        label: "Manage Users",
        links: "/dashboard/admin/users",
      },
      {
        icon: Boxes3,
        label: "Manage Products",
        links: "/dashboard/admin/products",
      },
      {
        icon: ShoppingCart,
        label: "Manage Orders",
        links: "/dashboard/admin/orders",
      },
      {
        icon: ChartColumn,
        label: "Analytics",
        links: "/dashboard/admin/analytics",
      },
    ],
  };

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const role = user?.role || "Buyer";

  const navItems = sidebaritemsbyrole[role] || [];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
              Resell Hub
            </h2>

            <p className="text-xs text-default-500">{role} Dashboard</p>
          </div>

          <Drawer>
            <Button isIconOnly variant="flat" radius="full">
              <Bars />
            </Button>

            <Drawer.Backdrop />

            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.Header>
                  <div>
                    <Drawer.Heading>Resell Hub</Drawer.Heading>
                    <p className="text-sm text-default-500">{role} Dashboard</p>
                  </div>
                </Drawer.Header>

                <Drawer.Body>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        href={item.links}
                        key={item.label}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-2xl
                          px-4
                          py-3
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          hover:bg-default-100
                        "
                      >
                        <item.icon className="size-5" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="
          hidden
          lg:flex
          w-72
          flex-col
          border-r
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-5
          min-h-screen
        "
      >
        {/* Logo */}
        <div className="mb-8">
          <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
            Resell Hub
          </h2>

          <p className="mt-1 text-sm text-default-500">{role} Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              href={item.links}
              key={item.label}
              className="
                group
                flex
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200
                hover:bg-white/10
                hover:translate-x-1
              "
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer Card */}
        <div
          className="
            mt-auto
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-4
            backdrop-blur-md
          "
        >
          <p className="font-semibold">Welcome Back 👋</p>

          <p className="mt-2 text-sm text-default-500">
            Manage products, orders and track performance from your dashboard.
          </p>
        </div>
      </aside>
    </>
  );
}
