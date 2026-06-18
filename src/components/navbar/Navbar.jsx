"use client";

import { useState } from "react";
import {
  Bars,
  Xmark,
  Bell,
  ShoppingCart,
  Magnifier,
} from "@gravity-ui/icons";
import { Button, Input, Avatar } from "@heroui/react";
import { CustomAvatar } from "../profiles/CustomAvatar";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">
          ReSell Hub
        </h1>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-primary font-medium">
            Marketplace
          </a>
          <a href="#">Categories</a>
          <a href="#">Enterprise</a>
          <a href="#">Help</a>
        </nav>

        <div className="hidden lg:block w-72">
          <Input
            placeholder="Search marketplace..."
            startcontent={<Magnifier />}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button isIconOnly variant="light">
            <Bell />
          </Button>

          <Button isIconOnly variant="light">
            <ShoppingCart />
          </Button>

            <Link href="/auth/login">
            <Button>
                login
            </Button>
            </Link>

            <Link href="/auth/register">
               <Button>
                Register
            </Button>
            </Link>
         
          <CustomAvatar/>

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <Xmark /> : <Bars />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-4 gap-4">
            <a href="#">Marketplace</a>
            <a href="#">Categories</a>
            <a href="#">Enterprise</a>
            <a href="#">Help</a>
          </div>
        </div>
      )}
    </header>
  );
}