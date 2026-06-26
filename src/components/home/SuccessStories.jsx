const stories = [
  {
    name: "Tahmid R.",
    role: "Buyer",
    quote: "Found a barely-used laptop at half the retail price. Saved a ton and got exactly what I needed.",
  },
  {
    name: "Nusrat J.",
    role: "Seller",
    quote: "Cleared out furniture I no longer needed and made back real money instead of throwing it away.",
  },
  {
    name: "Imran H.",
    role: "Buyer",
    quote: "The seller communication and order tracking made the whole process feel safe and easy.",
  },
];

const SuccessStories = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Stories from our community</h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.name}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl"
            >
              <p className="text-default-700">"{story.quote}"</p>
              <p className="mt-4 text-sm font-semibold">{story.name}</p>
              <p className="text-xs text-default-500">{story.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;