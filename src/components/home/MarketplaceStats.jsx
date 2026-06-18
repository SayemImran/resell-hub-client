const stats = [
  { value: "1M+", label: "Total Products Sold" },
  { value: "500k+", label: "Verified Buyers" },
  { value: "200k+", label: "Global Sellers" },
  { value: "750k+", label: "Completed Orders" },
];

export default function MarketplaceStats() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((item) => (
          <div key={item.label}>
            <h3 className="text-3xl md:text-4xl font-bold text-green-400">
              {item.value}
            </h3>
            <p className="text-slate-400 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}