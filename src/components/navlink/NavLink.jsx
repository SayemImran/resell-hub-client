"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className = "",
  startcontent,
  endContent,
  ...props
}) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`
        group relative flex items-center gap-2
        rounded-xl px-4 py-2.5
        text-sm font-medium
        transition-all duration-300

        ${
          isActive
            ? `
              bg-white/15
              backdrop-blur-lg
              text-primary
              shadow-lg shadow-primary/10
              border border-white/20
            `
            : `
              text-default-600
              hover:text-foreground
              hover:bg-white/10
            `
        }

        ${className}
      `}
      {...props}
    >
      {startcontent && (
        <span
          className={`
            flex items-center transition-transform duration-300
            ${isActive ? "scale-110" : "group-hover:scale-105"}
          `}
        >
          {startcontent}
        </span>
      )}

      <span>{children}</span>

      {endContent && (
        <span className="flex items-center">
          {endContent}
        </span>
      )}

      {/* Animated Active Indicator */}
      <span
        className={`
          absolute bottom-0 left-1/2 h-[2px]
          -translate-x-1/2 rounded-full
          bg-primary transition-all duration-300

          ${
            isActive
              ? "w-8 opacity-100"
              : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-60"
          }
        `}
      />
    </Link>
  );
}