import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Boxes3 } from "@gravity-ui/icons";
import WishlistCard from "@/components/products/WishlistCard";
import { serverAuthFetch } from "@/lib/server/serverAuthFetch";

const WishlistPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="p-16 text-center text-default-500">
        Please log in to view your wishlist.
      </div>
    );
  }

  const res = await serverAuthFetch(
    `http://localhost:5000/api/wishlist/${session.user.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-16 text-center text-danger">
        Could not load your wishlist. Please try again.
      </div>
    );
  }

  const { data: wishlistItems } = await res.json();

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">My Wishlist</h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          Products you've saved for later.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-10 text-center sm:p-16">
          <Boxes3 width={40} height={40} className="opacity-40 sm:h-12 sm:w-12" />
          <h3 className="mt-4 text-lg font-semibold sm:text-xl">
            Your Wishlist is Empty
          </h3>
          <p className="mt-2 text-sm text-default-500 sm:text-base">
            Tap the heart icon on any product to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {wishlistItems.map((item) => (
            <WishlistCard key={item._id} product={item.product} userId={session.user.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;