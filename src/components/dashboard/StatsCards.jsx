import { ShoppingCart, Heart, CreditCard } from "@gravity-ui/icons";

const cards = [
  {
    title: "Total Orders",
    value: "24",
    icon: ShoppingCart,
    color: "bg-blue-100",
  },
  {
    title: "Wishlist Count",
    value: "12",
    icon: Heart,
    color: "bg-green-100",
  },
  {
    title: "Recent Purchases",
    value: "$850.00",
    icon: CreditCard,
    color: "bg-orange-100",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-5 border shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <h3 className="mt-4 text-gray-500">{card.title}</h3>

            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}