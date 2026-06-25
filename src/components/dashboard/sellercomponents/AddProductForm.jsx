"use client";

import { useState } from "react";
import { Button, Input, TextArea, Select, ListBox, Label } from "@heroui/react";
import { clientAuthFetch } from "@/lib/clientAuthFetch";

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Books",
  "Sports",
  "Accessories",
];

const conditions = ["Used", "Like New", "Refurbished"];

export default function AddProductForm({ currentUser }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    stock: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await clientAuthFetch(`${API_URL}/api/product/add`, {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          imageUrl: formData.imageUrl,
          description: formData.description,
          category: formData.category,
          condition: formData.condition,
          price: Number(formData.price),
          stock: Number(formData.stock),
          status: "available",
          seller_info: {
            seller_id: currentUser?.id || "",
            name: currentUser?.name || "",
            email: currentUser?.email || "",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to add product");
      }

      alert("Product added successfully!");

      setFormData({
        title: "",
        imageUrl: "",
        description: "",
        category: "",
        condition: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Add New Product
        </h1>

        <p className="mt-2 text-default-500">
          Create a professional listing for your customers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Form */}
        <div className="xl:col-span-2 rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Product Title"
              placeholder="MacBook Pro M2 16GB"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />

            <Input
              label="Product Image URL"
              placeholder="https://example.com/product.jpg"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
            />

            <TextArea
              label="Description"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            {/* Category & Condition */}
            <div className="grid gap-5 md:grid-cols-2">
              <Select
                className="w-full"
                placeholder="Select Category"
                name="category"
                selectedKey={formData.category || null}
                onSelectionChange={(value) => handleChange("category", value)}
              >
                <Label>Category</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {categories.map((category) => (
                      <ListBox.Item
                        key={category}
                        id={category}
                        textValue={category}
                      >
                        {category}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select
                className="w-full"
                placeholder="Select Condition"
                name="condition"
                selectedKey={formData.condition || null}
                onSelectionChange={(value) => handleChange("condition", value)}
              >
                <Label>Condition</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {conditions.map((condition) => (
                      <ListBox.Item
                        key={condition}
                        id={condition}
                        textValue={condition}
                      >
                        {condition}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Price & Stock */}
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                type="number"
                label="Price"
                placeholder="499"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />

              <Input
                type="number"
                label="Stock Quantity"
                placeholder="10"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              className="w-full min-h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-white"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </Button>
          </form>
        </div>

        {/* Preview */}
        <div className="h-fit rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          <h3 className="mb-4 text-lg font-semibold">Product Preview</h3>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="aspect-square w-full bg-default-100">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt={formData.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-default-500">
                  No Preview Image
                </div>
              )}
            </div>

            <div className="space-y-2 p-4">
              <h4 className="truncate font-semibold">
                {formData.title || "Product Name"}
              </h4>

              <p className="line-clamp-3 text-sm text-default-500">
                {formData.description || "Product description preview."}
              </p>

              <p className="font-bold text-primary">
                ${formData.price ? Number(formData.price).toFixed(2) : "0.00"}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-4">
            <p className="text-sm text-default-600">
              Products with clear photos, accurate descriptions, and realistic
              pricing usually convert better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
