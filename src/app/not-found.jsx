"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

        <p className="text-gray-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
