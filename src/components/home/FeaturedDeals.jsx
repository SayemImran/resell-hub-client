import {
  Heart,
  ShoppingCart,
  StarFill,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";

const products = [
  {
    id: 1,
    title: "MacBook Pro M2",
    price: "$1299",
    image: "/products/macbook.jpg",
    rating: 5,
    reviews: 124,
  },
  {
    id: 2,
    title: "Velvet Accent Chair",
    price: "$245",
    image: "/products/chair.jpg",
    rating: 4,
    reviews: 42,
  },
  {
    id: 3,
    title: "Sony Alpha A7 IV",
    price: "$1850",
    image: "/products/camera.jpg",
    rating: 5,
    reviews: 89,
  },
  {
    id: 4,
    title: "Designer Sneakers",
    price: "$320",
    image: "/products/shoes.jpg",
    rating: 4,
    reviews: 31,
  },
];

export default function FeaturedDeals() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">
              Featured Deals
            </h2>

            <p className="text-default-500">
              Top-rated items from trusted sellers
            </p>
          </div>

          <Button
            variant="light"
            color="primary"
          >
            View All
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-[4/3] w-full object-cover"
        />

        <button className="absolute top-3 right-3 bg-white rounded-full p-2">
          <Heart />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mt-2">
          {Array(product.rating)
            .fill()
            .map((_, i) => (
              <StarFill
                key={i}
                className="w-4 h-4 text-yellow-500"
              />
            ))}
          <span className="text-sm text-default-500">
            ({product.reviews})
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-xl text-primary">
            {product.price}
          </span>

          <Button
            isIconOnly
            color="primary"
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
}