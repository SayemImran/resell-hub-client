const SustainabilityImpact = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-green-500/20 bg-green-500/5 p-8 text-center backdrop-blur-xl sm:p-14">
        <span className="inline-block rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-600">
          Sustainability
        </span>
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
          Every resale is one less item in a landfill
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-default-500">
          Buying second-hand extends the life of products that already exist,
          reducing demand for new manufacturing and the waste that comes with it.
          Every purchase here is a small vote for a more circular economy.
        </p>
      </div>
    </section>
  );
};

export default SustainabilityImpact;