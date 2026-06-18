import { Button } from "@heroui/react";
import { Check } from "@gravity-ui/icons";

const sellers = [
  {
    name: "TechVault Solutions",
    role: "Enterprise Partner",
    sales: "1.2k+",
    rating: "4.9",
    image: "/sellers/seller1.jpg",
  },
  {
    name: "Urban Vintage",
    role: "Power Seller",
    sales: "850",
    rating: "4.8",
    image: "/sellers/seller2.jpg",
  },
  {
    name: "Global Exports",
    role: "Verified Merchant",
    sales: "2.4k+",
    rating: "5.0",
    image: "/sellers/seller3.jpg",
  },
  {
    name: "Modern Finds",
    role: "Top Curated",
    sales: "430",
    rating: "4.7",
    image: "/sellers/seller4.jpg",
  },
];

export default function TrustedSellers() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Top Verified Sellers
          </h2>

          <p className="text-default-500">
            Shop with confidence from our best sellers
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <SellerCard
              key={seller.name}
              seller={seller}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SellerCard({ seller }) {
  return (
    <div className="border rounded-2xl p-5 text-center hover:shadow-lg transition">
      <div className="relative w-20 h-20 mx-auto">
        <img
          src={seller.image}
          alt={seller.name}
          className="w-full h-full rounded-full object-cover border-4 border-primary/20"
        />

        <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
          <Check className="w-3 h-3" />
        </div>
      </div>

      <h4 className="font-semibold mt-4">
        {seller.name}
      </h4>

      <p className="text-primary text-sm">
        {seller.role}
      </p>

      <p className="mt-3 text-sm">
        ⭐ {seller.rating} ({seller.sales} sales)
      </p>

      <Button
        fullWidth
        variant="flat"
        className="mt-4"
      >
        Visit Store
      </Button>
    </div>
  );
}