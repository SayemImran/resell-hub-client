"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bars,
  Xmark,
  Magnifier,
  House,
  Boxes3,
  Folder,
  LayoutSideContent,
} from "@gravity-ui/icons";
import { CustomAvatar } from "../profiles/CustomAvatar";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: sessionData } = authClient.useSession();
  const currentuser = sessionData?.user.name;
  const role = sessionData?.user.role.toLowerCase();
  console.log("current user :",currentuser);
  console.log("current role :",role);
 
  if(pathname.includes('dashboard')){
    return null;
  }
  const Links = [
    { name: "Home", href: "/", icon: House },
    { name: "Products", href: "/products", icon: Boxes3 },
    { name: "Category", href: "/category", icon: Folder },
    { name: "Dashboard", href: `/dashboard/${role}`, icon: LayoutSideContent },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/5">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg">
              RH
            </div>
            <div>
              <h1 className="text-lg font-bold">Resell Hub</h1>
              <p className="text-xs text-gray-500">Buy • Sell • Grow</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            {Links.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-white/20 text-indigo-600 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Icon width={18} height={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Magnifier
                width={18}
                height={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-11 pr-4 backdrop-blur-md outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {currentuser ? (
              <CustomAvatar />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-full px-4 py-2 hover:bg-white/10 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-white font-medium shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? (
              <Xmark width={24} height={24} />
            ) : (
              <Bars width={24} height={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 lg:hidden">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              {Links.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10"
                  >
                    <Icon width={18} height={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth */}
            <div className="mt-5 flex flex-col gap-3">
              {currentuser ? (
                <CustomAvatar />
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="rounded-xl border border-white/20 px-4 py-3 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-center text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
