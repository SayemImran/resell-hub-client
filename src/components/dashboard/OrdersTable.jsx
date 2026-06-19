const orders = [
  {
    id: "#RH-9021",
    item: "Sony WH-1000XM5",
    price: "$349.99",
    status: "Shipped",
  },
  {
    id: "#RH-8854",
    item: "Mechanical Keyboard",
    price: "$120.00",
    status: "Accepted",
  },
  {
    id: "#RH-8722",
    item: "Linen Minimalist Shirt",
    price: "$45.00",
    status: "Pending",
  },
  {
    id: "#RH-8611",
    item: "Smart Coffee Mug",
    price: "$89.99",
    status: "Cancelled",
  },
];

const statusColor = {
  Shipped: "bg-green-100 text-green-700",
  Accepted: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div className="flex justify-between mb-5">
        <h2 className="font-semibold text-lg">Recent Orders</h2>
        <button className="text-blue-600">View All</button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>Item</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="py-4">{order.id}</td>
              <td>{order.item}</td>
              <td>{order.price}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColor[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}