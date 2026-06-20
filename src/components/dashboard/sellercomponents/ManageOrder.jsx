"use client";

import { useMemo, useState } from "react";
import { Button, Input } from "@heroui/react";
import Image from "next/image";

const demoOrders = [
  {
    _id: "ORD-1001",
    product: "MacBook Pro M2",
    buyer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555 1234",
    },
    quantity: 1,
    total: 1200,
    status: "Pending",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
  },
  {
    _id: "ORD-1002",
    product: "Nike Air Max",
    buyer: {
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+1 555 5678",
    },
    quantity: 2,
    total: 300,
    status: "Processing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

const statuses = ["Pending", "Accepted", "Processing", "Shipped", "Delivered"];

export default function ManageOrders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState(demoOrders);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.product.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "all" ? true : order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const acceptOrder = (id) => {
    updateStatus(id, "Accepted");
  };

  const rejectOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order._id !== id));
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Orders</h1>

        <p className="mt-2 text-default-500">
          Handle customer orders and track delivery progress.
        </p>
      </div>

      {/* Search & Filter */}
      <div
        className="
          rounded-3xl
          border border-white/20
          bg-white/10
          p-5
          backdrop-blur-xl
          shadow-xl
        "
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              rounded-xl
              border border-white/20
              bg-white/10
              px-4
              py-3
              outline-none
            "
          >
            <option value="all">All Status</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="
              rounded-3xl
              border border-white/20
              bg-white/10
              p-6
              backdrop-blur-xl
              shadow-xl
            "
          >
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Product */}
              <div className="lg:col-span-1">
                <img
                  src={order.image}
                  alt={order.product}
                  className="
                    h-36
                    w-full
                    rounded-2xl
                    object-cover
                  "
                />
              </div>

              {/* Info */}
              <div className="space-y-4 lg:col-span-2">
                <div>
                  <h3 className="text-xl font-semibold">{order.product}</h3>

                  <p className="text-sm text-default-500">
                    Order ID: {order._id}
                  </p>
                </div>

                {/* Buyer */}
                <div>
                  <h4 className="font-medium">Buyer Information</h4>

                  <p>{order.buyer.name}</p>
                  <p>{order.buyer.email}</p>
                  <p>{order.buyer.phone}</p>
                </div>

                {/* Order Details */}
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-default-500">Quantity</p>

                    <p>{order.quantity}</p>
                  </div>

                  <div>
                    <p className="text-xs text-default-500">Total</p>

                    <p className="font-semibold">${order.total}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-primary/10
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-primary
                  "
                >
                  {order.status}
                </span>

                {/* Pending Actions */}
                {order.status === "Pending" && (
                  <div className="space-y-2">
                    <Button
                      color="primary"
                      className="w-full"
                      onClick={() => acceptOrder(order._id)}
                    >
                      Accept
                    </Button>

                    <Button
                      color="danger"
                      variant="flat"
                      className="w-full"
                      onClick={() => rejectOrder(order._id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {/* Delivery Status */}
                {order.status !== "Pending" && order.status !== "Delivered" && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      const currentIndex = statuses.indexOf(order.status);

                      updateStatus(order._id, statuses[currentIndex + 1]);
                    }}
                  >
                    Next Status
                  </Button>
                )}
              </div>
            </div>

            {/* Status Flow */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                {statuses.map((status, index) => {
                  const active = statuses.indexOf(order.status) >= index;

                  return (
                    <div
                      key={status}
                      className="
                          flex
                          items-center
                          gap-2
                        "
                    >
                      <div
                        className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              active
                                ? "bg-green-500 text-white"
                                : "bg-default-200"
                            }
                          `}
                      >
                        {status}
                      </div>

                      {index < statuses.length - 1 && (
                        <div
                          className="
                              h-[2px]
                              w-8
                              bg-default-300
                            "
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div
          className="
            rounded-3xl
            border border-dashed
            border-white/20
            p-16
            text-center
          "
        >
          <h3 className="text-xl font-semibold">No Orders Found</h3>

          <p className="mt-2 text-default-500">
            There are no orders matching your search criteria.
          </p>
        </div>
      )}
    </section>
  );
}
