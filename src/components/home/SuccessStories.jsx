const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Eco-conscious Buyer",
    image: "/users/user1.jpg",
    text: "I furnished my entire apartment using ReSell Hub and saved nearly $2,500.",
  },
  {
    name: "David Lawson",
    role: "Power Seller",
    image: "/users/user2.jpg",
    text: "Selling electronics has never been easier. The analytics are fantastic.",
  },
  {
    name: "Elena Rodriguez",
    role: "Verified Merchant",
    image: "/users/user3.jpg",
    text: "My business has grown 40% year-on-year thanks to this marketplace.",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Stories from the Community
          </h2>

          <p className="text-default-500 mt-2">
            Join thousands of users making a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              testimonial={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">
            {testimonial.name}
          </h4>

          <p className="text-sm text-default-500">
            {testimonial.role}
          </p>
        </div>
      </div>

      <p className="italic text-default-600">
        "{testimonial.text}"
      </p>
    </div>
  );
}