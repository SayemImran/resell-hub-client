import Link from "next/link";

const categories = [
  { name: "Electronics", emoji: "💻" },
  { name: "Fashion", emoji: "👕" },
  { name: "Furniture", emoji: "🛋️" },
  { name: "Books", emoji: "📚" },
  { name: "Sports", emoji: "🏀" },
  { name: "Accessories", emoji: "👜" },
];

const PopularCategories = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Shop by category</h2>
        <p className="mt-2 text-default-500">Find exactly what you're looking for.</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-3 rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;