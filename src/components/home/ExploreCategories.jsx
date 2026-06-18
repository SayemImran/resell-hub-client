import {
  Display,
  ClockFill,
  Car,
  Person,
  Smartphone,
} from "@gravity-ui/icons";

const categories = [
  {
    title: "Electronics",
    icon: Display,
  },
  {
    title: "Furniture",
    icon: ClockFill,
  },
  {
    title: "Vehicles",
    icon: Car,
  },
  {
    title: "Fashion",
    icon: Person,
  },
  {
    title: "Mobile Phones",
    icon: Smartphone,
  },
];

export default function ExploreCategories() {
  return (
    <section className="py-16 bg-default-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            Explore Categories
          </h2>

          <p className="text-default-500">
            Find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((item) => (
            <CategoryCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ title, icon: Icon }) {
  return (
    <div className="group text-center cursor-pointer">
      <div className="aspect-square rounded-3xl bg-white flex items-center justify-center shadow hover:bg-primary hover:text-white transition">
        <Icon className="w-10 h-10" />
      </div>

      <p className="mt-3 font-medium">
        {title}
      </p>
    </div>
  );
}