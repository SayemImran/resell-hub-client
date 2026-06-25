"use client";

import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function MobileNav({ role, navItems }) {
  return (
    <div className="md:hidden sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
            Resell Hub
          </h2>
          <p className="text-xs text-default-500">{role} Dashboard</p>
        </div>

        <Drawer>
          <Button isIconOnly variant="flat" radius="full" aria-label="Open menu">
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
                        flex items-center gap-3
                        rounded-2xl px-4 py-3
                        text-sm font-medium
                        transition-all duration-200
                        hover:bg-default-100
                      "
                    >
                      <item.icon className="size-5 shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </Drawer.Body>

              <Drawer.Footer>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md w-full">
                  <p className="font-semibold">Welcome Back 👋</p>
                  <p className="mt-1 text-sm text-default-500">
                    Manage products, orders and track performance.
                  </p>
                </div>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </div>
  );
}