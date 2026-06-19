import { auth } from "@/lib/auth";
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";

export async function Sidebar() {
  const sidebaritemsbyrole = {
    Seller: [
      { icon: House, label: "Home", links: "dashboard/seller" },
      { icon: House, label: "Profile", links: "dashboard/seller" },
      { icon: House, label: "My Listings", links: "dashboard/seller" },
      { icon: House, label: "Add product", links: "dashboard/seller" },
    ],
    Buyer: [
      { icon: House, label: "Home", links: "dashboard/buyer" },
      { icon: House, label: "My orders", links: "dashboard/buyer" },
      { icon: House, label: "Wishlist", links: "dashboard/buyer" },
      { icon: House, label: "Profile", links: "dashboard/buyer" },
    ],
    Admin: [
      { icon: House, label: "Home", links: "dashboard/admin" },
      { icon: House, label: "Users", links: "dashboard/admin" },
      { icon: House, label: "Orders", links: "dashboard/admin" },
      { icon: House, label: "Analytics", links: "dashboard/admin" },
      { icon: House, label: "Statistics", links: "dashboard/admin" },
      { icon: House, label: "Profile", links: "dashboard/admin" },
    ],
  };

  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log(user);
  const role = user?.role || "buyer";
  const navItems = sidebaritemsbyrole[role];
console.log(navItems);

  return (
    <Drawer>
      <Button variant="secondary" className={`hidden`}>
        <Bars />
        Menu
      </Button>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
        ))}
      </nav>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
