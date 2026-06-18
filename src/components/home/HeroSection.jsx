import { Button } from "@heroui/react";
import Image from "next/image";
import heroImg from"@/../public/hero.png";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-3 py-1 mb-6">
            Trusted by 200k+ Sellers
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Buy and Sell{" "}
            <span className="text-primary">
              Pre-Owned
            </span>{" "}
            Products
          </h1>

          <p className="mt-6 text-lg text-default-500 max-w-xl">
            The world's most transparent circular marketplace
            for premium second-hand goods.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button color="primary" size="lg">
              Browse Products
            </Button>

            <Button
              variant="bordered"
              size="lg"
            >
              Sell Product
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
            <StatCard title="50k+" subtitle="Active Listings" />
            <StatCard title="98%" subtitle="Success Rate" />
            <StatCard
              title="24h"
              subtitle="Avg. Listing Time"
              className="hidden sm:block"
            />
          </div>
        </div>

        <div>
          <Image
            src={heroImg}
            alt="Hero"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`rounded-xl border p-4 bg-white ${className}`}
    >
      <h3 className="text-2xl font-bold text-primary">
        {title}
      </h3>
      <p className="text-sm text-default-500">
        {subtitle}
      </p>
    </div>
  );
}