"use client";

import { Magnifier } from "@gravity-ui/icons";

export default function Header() {
  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Magnifier className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

          <input
            placeholder="Search orders, brands, or items..."
            className="w-[320px] h-10 rounded-xl border bg-gray-50 pl-10 outline-none"
          />
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
          Sell Now
        </button>
      </div>
    </header>
  );
}