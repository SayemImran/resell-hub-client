"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-blue-100/30 rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 right-0 w-3/4 h-3/4 bg-purple-100/30 rounded-full blur-[150px]" />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-lg z-10">
        {/* 404 Number */}
        <h1
          className="text-8xl md:text-9xl font-extrabold mb-6 
                       bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                       text-transparent bg-clip-text"
        >
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-950">
          Page Not Found
        </h2>

        <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed max-w-sm mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full font-medium text-lg 
                     transition-all duration-300 ease-in-out
                     text-white bg-blue-600 
                     hover:bg-blue-700 hover:scale-105
                     active:scale-95 shadow-md shadow-blue-500/30"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}