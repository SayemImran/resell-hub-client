"use client";
import { Button, Input } from "@heroui/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if(pathname.includes('dashboard')){
    return null;
  }
  return (
    <footer className="border-t py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">
            ReSell Hub
          </h3>

          <p className="text-default-500">
            Building the future of sustainable commerce.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">
            Marketplace
          </h4>

          <ul className="space-y-2 text-default-500">
            <li>All Products</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Verified Only</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">
            Resources
          </h4>

          <ul className="space-y-2 text-default-500">
            <li>Seller Guide</li>
            <li>Sustainability Report</li>
            <li>Community Forum</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">
            Newsletter
          </h4>

          <div className="flex gap-2">
            <Input placeholder="email@example.com" />

            <Button color="primary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t mt-10 pt-6 text-center text-sm text-default-500">
        © 2026 ReSell Hub. All rights reserved.
      </div>
    </footer>
  );
}