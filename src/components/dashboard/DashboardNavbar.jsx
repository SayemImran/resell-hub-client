"use client";

import Link from "next/link";

const House = () => null; // temporary test
const Person = () => null;

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-xl rounded-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
        >
          Go Home
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
        >
          Profile
        </Link>
      </div>
    </header>
  );
}
