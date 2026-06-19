export default function CurrentStatus() {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div className="flex justify-between mb-6">
        <h2 className="font-semibold">Current Status</h2>

        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
          Out for Delivery
        </span>
      </div>

      <div className="flex gap-4">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          className="w-16 h-16 rounded-xl object-cover"
          alt=""
        />

        <div>
          <h3 className="font-semibold">Sony Headphones</h3>
          <p className="text-sm text-default-500">
            Arriving Today by 5:00 PM
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-3/4 bg-blue-600 rounded-full"></div>
        </div>

        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>Confirmed</span>
          <span>Shipped</span>
          <span>Out for Delivery</span>
          <span>Delivered</span>
        </div>
      </div>
    </div>
  );
}