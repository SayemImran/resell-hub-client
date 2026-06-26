"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-primary sm:text-5xl">
        {display.toLocaleString("en-US")}+
      </p>
      <p className="mt-2 text-sm text-default-500">{label}</p>
    </div>
  );
};

const MarketplaceStats = ({ stats }) => {
  const items = [
    { label: "Total Products", value: stats.totalProducts || 0 },
    { label: "Total Sellers", value: stats.totalSellers || 0 },
    { label: "Total Buyers", value: stats.totalBuyers || 0 },
    { label: "Completed Orders", value: stats.completedOrders || 0 },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-xl sm:p-12"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {items.map((item) => (
              <StatCounter key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplaceStats;