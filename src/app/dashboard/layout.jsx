"use client";

import React from "react";
import {
  LayoutCells,
  ShoppingBag,
  Heart,
  Envelope,
  Gear,
  CircleQuestion,
  ArrowRightFromSquare,
  Magnifier,
  Bell,
} from "@gravity-ui/icons";
import { Button, Input } from "@heroui/react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      {/* Sidebar Navigation Shell */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-md px-sm bg-surface-container dark:bg-surface-container-low shadow-sm z-50">
        <div className="mb-lg px-md">
          <h1 className="font-h2 text-h2 text-primary dark:text-primary-fixed">
            ReSell Hub
          </h1>
          <p className="font-label-sm text-on-surface-variant opacity-70">
            Premium Reseller
          </p>
        </div>
        <nav className="flex-1 space-y-xs overflow-y-auto custom-scrollbar">
          {/* Dashboard (Active) */}
          <a
            className="flex items-center gap-sm px-md py-sm text-primary font-h3 border-r-4 border-primary dark:text-primary-fixed dark:border-primary-fixed hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
            href="#"
          >
            <LayoutCells className="size-5" />
            <span className="font-label-md">Dashboard</span>
          </a>
          {/* My Orders */}
          <a
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
            href="#"
          >
            <ShoppingBag className="size-5" />
            <span className="font-label-md">My Orders</span>
          </a>
          {/* Watchlist */}
          <a
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
            href="#"
          >
            <Heart className="size-5" />
            <span className="font-label-md">Watchlist</span>
          </a>
          {/* Messages */}
          <a
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
            href="#"
          >
            <Envelope className="size-5" />
            <span className="font-label-md">Messages</span>
          </a>
          {/* Settings */}
          <a
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
            href="#"
          >
            <Gear className="size-5" />
            <span className="font-label-md">Settings</span>
          </a>
        </nav>
        <div className="mt-auto pt-md border-t border-outline-variant space-y-xs">
          <a
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
            href="#"
          >
            <CircleQuestion className="size-5" />
            <span className="font-label-md">Help Center</span>
          </a>
          <a
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
            href="#"
          >
            <ArrowRightFromSquare className="size-5" />
            <span className="font-label-md">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
