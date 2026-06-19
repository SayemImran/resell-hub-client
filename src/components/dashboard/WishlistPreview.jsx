const products = [
  {
    name: "Noise-Cancelling Headphones",
    price: "$299",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    name: "Pro Ultrabook",
    price: "$1249",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    name: "Leather Journal",
    price: "$75",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db",
  },
  {
    name: "Task Chair",
    price: "$450",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
];

export default function WishlistPreview() {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div className="flex justify-between mb-5">
        <h2 className="font-semibold">Wishlist Preview</h2>
        <button className="text-blue-600">See All</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border overflow-hidden"
          >
            <img
              src={item.image}
              alt=""
              className="h-28 w-full object-cover"
            />

            <div className="p-3">
              <h4 className="text-sm font-medium line-clamp-1">
                {item.name}
              </h4>

              <p className="text-blue-600 font-semibold">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}