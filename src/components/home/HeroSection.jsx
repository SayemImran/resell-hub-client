"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

const HeroSection = ({ products }) => {
  const orbitItems = products.slice(0, 6);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Give it a second life
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Buy and sell what
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              still has life left
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-default-500">
            Resell Hub connects buyers and sellers of pre-loved goods — better
            for your wallet, better for the planet.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/products">
              <Button color="primary" size="lg" className="px-8">
                Browse Products
              </Button>
            </Link>
            <Link href="/dashboard/seller/add-product">
              <Button variant="bordered" size="lg" className="px-8">
                Start Selling
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Orbiting product thumbnails */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto hidden h-[420px] w-[420px] items-center justify-center sm:flex"
        >
          <div className="absolute h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute h-96 w-96 rounded-full border border-white/10" />

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-center text-sm font-semibold text-white shadow-2xl">
            Resell
            <br />
            Hub
          </div>

          {orbitItems.map((product, i) => {
            const angle = (i / orbitItems.length) * 2 * Math.PI;
            const radius = 180;
            const offsetX = Math.round(Math.cos(angle) * radius - 32);
            const offsetY = Math.round(Math.sin(angle) * radius - 32);

            return (
              <motion.div
                key={product._id}
                className="absolute h-16 w-16 overflow-hidden rounded-2xl border border-white/20 shadow-lg"
                style={{
                  left: `calc(50% + ${offsetX}px)`,
                  top: `calc(50% + ${offsetY}px)`,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
