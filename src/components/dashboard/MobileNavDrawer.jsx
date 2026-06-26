"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

const MobileNavDrawer = ({ navItems, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button isIconOnly variant="flat" radius="full" onClick={() => setIsOpen(true)}>
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
                  onClick={() => setIsOpen(false)}
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
  );
};

export default MobileNavDrawer;