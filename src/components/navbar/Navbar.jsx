"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bars,
  Xmark,
  House,
  Boxes3,
  Folder,
  LayoutSideContent,
} from "@gravity-ui/icons";
import { CustomAvatar } from "../profiles/CustomAvatar";
import { authClient } from "@/lib/auth-client";
import CartIcon from "../cart/CartIcon";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: sessionData } = authClient.useSession();
  const currentuser = sessionData?.user?.name;
  const role = sessionData?.user?.role?.toLowerCase();

  if (pathname.includes("dashboard")) {
    return null;
  }

  // Safely construct dashboard link if role exists
  const Links = [
    { name: "Home", href: "/", icon: House },
    { name: "Products", href: "/products", icon: Boxes3 },
    { name: "Category", href: "/category", icon: Folder },
    ...(role ? [{ name: "Dashboard", href: `/dashboard/${role}`, icon: LayoutSideContent }] : []),
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

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentuser ? (
              <>
                <CartIcon />
                <CustomAvatar />
              </>
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

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? (
              <Xmark width={24} height={24} />
            ) : (
              <Bars width={24} height={24} />
            )}
          </button>
        </div>

        {/* Mobile Slide-down Menu Container */}
        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 lg:hidden">
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

            {/* Mobile Auth Actions */}
            <div className="mt-5 flex flex-col gap-3">
              {currentuser ? (
                <div className="flex items-center gap-4 px-4 py-2 border-t border-white/5 pt-4">
                  <CartIcon />
                  <CustomAvatar />
                </div>
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