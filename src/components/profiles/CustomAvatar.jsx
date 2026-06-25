"use client";

import { authClient, signOut } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { useRouter } from "next/navigation";

export function CustomAvatar() {
  const { data: sessionData } = authClient.useSession();
  const router = useRouter();

  const name = sessionData?.user?.name;
  const email = sessionData?.user?.email;
  const imglink = sessionData?.user?.profile;
  const role = sessionData?.user?.role;

  // e.g. "Seller" -> "/dashboard/seller", "Buyer" -> "/dashboard/buyer", "Admin" -> "/dashboard/admin"
  const dashboardPath = role ? `/dashboard/${role.toLowerCase()}` : "/dashboard";

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image alt={name || "User"} src={imglink} />
          <Avatar.Fallback delayMs={600}>
            {name ? name.slice(0, 2).toUpperCase() : "JD"}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image alt={name || "User"} src={imglink} />
              <Avatar.Fallback delayMs={600}>
                {name ? name.slice(0, 2).toUpperCase() : "JD"}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{name}</p>
              <p className="text-xs leading-none text-muted">{email}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item
            id="dashboard"
            textValue="Dashboard"
            onClick={() => router.push(dashboardPath)}
          >
            <div className="flex w-full items-center gap-2">
              <Persons className="size-3.5" />
              <Label>Dashboard</Label>
            </div>
          </Dropdown.Item>

          <Dropdown.Item
            id="profile"
            textValue="Profile"
            onClick={() => router.push("/profile")}
          >
            <div className="flex w-full items-center gap-2">
              <Gear className="size-3.5" />
              <Label>Profile</Label>
            </div>
          </Dropdown.Item>

          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            onClick={async () => {
              await signOut();
              window.location.href = "/auth/login";
            }}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}