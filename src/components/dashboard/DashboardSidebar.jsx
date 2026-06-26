"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars,
  Xmark,
  House,
  Boxes3,
  ShoppingCart,
  ChartColumn,
  Heart,
  Briefcase,
  Persons,
} from "@gravity-ui/icons";

const ICONS = {
  House,
  Boxes3,
  ShoppingCart,
  ChartColumn,
  Heart,
  Briefcase,
  Persons,
};

const DashboardSidebar = ({ navItems, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const NavLinks = ({
    onItemClick,
    showLabels = true,
    iconSize = "size-5",
  }) => (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = ICONS[item.icon];
        const isActive = pathname === item.links;

        return (
          <Link
            key={item.label}
            href={item.links}
            onClick={onItemClick}
            title={!showLabels ? item.label : undefined}
            className={`
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
              ${showLabels ? "" : "justify-center px-0"}
              ${isActive ? "bg-primary/15 text-primary" : "hover:bg-white/10"}
            `}
          >
            <Icon className={iconSize} />
            {showLabels && item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ===== Mobile top bar (below md) ===== */}
      <div className="md:hidden sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
              Resell Hub
            </h2>
            <p className="text-xs text-default-500">{role} Dashboard</p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <Bars className="size-5" />
          </button>
        </div>
      </div>

      {/* ===== Mobile drawer (manual, no third-party overlay) ===== */}
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      {/* Sliding panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-white/10 bg-background p-5
          transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
              Resell Hub
            </h2>
            <p className="text-sm text-default-500">{role} Dashboard</p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
          >
            <Xmark className="size-5" />
          </button>
        </div>

        <NavLinks onItemClick={() => setIsOpen(false)} />
      </aside>

      {/* ===== Tablet rail (md to lg) ===== */}
      <aside className="hidden md:flex lg:hidden w-20 flex-col items-center gap-2 border-r border-white/10 bg-white/5 backdrop-blur-xl py-5 min-h-screen">
        <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-bold text-white">
          RH
        </div>
        <NavLinks showLabels={false} />
      </aside>

      {/* ===== Desktop sidebar (lg+) ===== */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl p-5 min-h-screen">
        <div className="mb-8">
          <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
            Resell Hub
          </h2>
          <p className="mt-1 text-sm text-default-500">{role} Dashboard</p>
        </div>

        <NavLinks />

        <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p className="font-semibold">Welcome Back 👋</p>
          <p className="mt-2 text-sm text-default-500">
            Manage products, orders and track performance from your dashboard.
          </p>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
