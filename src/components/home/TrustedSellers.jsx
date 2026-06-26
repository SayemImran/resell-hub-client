import { Briefcase } from "@gravity-ui/icons";

const TrustedSellers = ({ sellers }) => {
  if (sellers.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Trusted sellers</h2>
        <p className="mt-2 text-default-500">Our top performers, ranked by completed sales.</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sellers.map((seller) => (
            <div
              key={seller._id}
              className="flex items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Briefcase width={24} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold">{seller.name}</p>
                <p className="text-sm text-default-500">{seller.completedSales} completed sales</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSellers;