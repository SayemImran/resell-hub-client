"use client";

import Link from "next/link";
import { House, Person } from "@gravity-ui/icons";

export default function DashboardNavbar() {
  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>

          <p className="text-sm text-default-500">Welcome back 👋</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="
              flex items-center gap-2
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm font-medium
              transition-all duration-200
              hover:bg-white/10
            "
          >
            <House className="size-4" />
            Go Home
          </Link>

          <Link
            href="/profile"
            className="
              flex items-center gap-2
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              px-4 py-2
              text-sm font-medium
              text-white
              shadow-lg
              transition-all duration-200
              hover:scale-[1.02]
            "
          >
            <Person className="size-4" />
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
