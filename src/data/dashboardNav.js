// src/data/dashboardNav.js

import {
  LayoutCells,
  Person,
  Boxes3,
  ChartColumn,
  ShoppingBag,
  Heart,
  Gear,
  Plus,
  CircleQuestion,
} from "@gravity-ui/icons";

export const dashboardNav = {
  admin: [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: LayoutCells,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Person,
    },
    {
      title: "Products",
      href: "/dashboard/admin/products",
      icon: Boxes3,
    },
    {
      title: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: ChartColumn,
    },
  ],

  seller: [
    {
      title: "Overview",
      href: "/dashboard/seller",
      icon: LayoutCells,
    },
    {
      title: "My Products",
      href: "/dashboard/seller/products",
      icon: Boxes3,
    },
    {
      title: "Add Product",
      href: "/dashboard/seller/add-product",
      icon: Plus,
    },
    {
      title: "Orders",
      href: "/dashboard/seller/orders",
      icon: ShoppingBag,
    },
    {
      title: "Settings",
      href: "/dashboard/seller/settings",
      icon: Gear,
    },
  ],

  buyer: [
    {
      title: "Overview",
      href: "/dashboard/buyer",
      icon: LayoutCells,
    },
    {
      title: "Orders",
      href: "/dashboard/buyer/orders",
      icon: ShoppingBag,
    },
    {
      title: "Wishlist",
      href: "/dashboard/buyer/wishlist",
      icon: Heart,
    },
    {
      title: "Settings",
      href: "/dashboard/buyer/settings",
      icon: Gear,
    },
  ],
};
