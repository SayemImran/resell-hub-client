"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

const FeaturedProducts = ({ products }) => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Fresh on the market</h2>
            <p className="mt-2 text-default-500">Recently listed, still available.</p>
          </div>
          <Link href="/products" className="hidden sm:block">
            <Button variant="flat">View all</Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-10 text-default-500">No products yet — check back soon.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/products/${product._id}`}>
                  <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl transition-transform duration-300 hover:-translate-y-1">
                    <div className="aspect-video">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 p-5">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-default-500">{product.category}</p>
                      <p className="font-bold text-primary">${product.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;