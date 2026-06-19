import { authClient, signOut } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { useRouter } from "next/navigation";

export function CustomAvatar() {
  const {data:sessionData} = authClient.useSession();
  const name = sessionData?.user.name;
  const email = sessionData?.user.email;
  const imglink = sessionData?.user.profile;
  const router = useRouter();
  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt="Junior Garcia"
            src={imglink}
          />
          <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt="Jane"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
              />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{name}</p>
              <p className="text-xs leading-none text-muted">
                {email}
              </p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile">
            <Label>Profile</Label>
          </Dropdown.Item>
          <Dropdown.Item id="settings" textValue="Settings">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Settings</Label>
              <Gear className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="new-project" textValue="New project">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Create Team</Label>
              <Persons className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            onClick={async () => {
              await signOut();
              router.push("/auth/login");
              router.refresh();
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
