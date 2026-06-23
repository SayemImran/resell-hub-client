"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  InputGroup,
  Label,
  FieldError,
  Select,
  ListBox,
} from "@heroui/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Books",
  "Sports",
  "Accessories",
];
const conditions = ["Used", "Like New", "Refurbished"];

export default function EditProductForm({ product }) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      title: product.title,
      description: product.description,
      category: product.category,
      condition: product.condition,
      price: product.price,
      stock: product.stock,
      status: product.status,
      imageUrl: product.imageUrl,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/edit/${product._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.success("Product updated successfully!");
      router.push("/dashboard/seller/products");
      router.refresh();
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-xl"
    >
      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Title</Label>
            <InputGroup>
              <InputGroup.Input {...field} className="w-full" />
            </InputGroup>
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

      <Controller
        name="imageUrl"
        control={control}
        rules={{ required: "Image URL is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Image URL</Label>
            <InputGroup>
              <InputGroup.Input {...field} className="w-full" />
            </InputGroup>
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Description</Label>
            <InputGroup>
              <InputGroup.Input {...field} className="w-full" />
            </InputGroup>
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

  <div className="grid gap-5 md:grid-cols-2">
        {/* CATEGORY SELECT */}
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder="Select Category"
              name={field.name}
              selectedKey={field.value || null}
              onSelectionChange={(value) => field.onChange(value)}
              isInvalid={fieldState.invalid}
            >
              <Label>Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {categories.map((category) => (
                    <ListBox.Item key={category} id={category} textValue={category}>
                      {category}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Select>
          )}
        />

        {/* CONDITION SELECT */}
        <Controller
          name="condition"
          control={control}
          rules={{ required: "Condition is required" }}
          render={({ field, fieldState }) => (
            <Select
              className="w-full"
              placeholder="Select Condition"
              name={field.name}
              selectedKey={field.value || null}
              onSelectionChange={(value) => field.onChange(value)}
              isInvalid={fieldState.invalid}
            >
              <Label>Condition</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {conditions.map((condition) => (
                    <ListBox.Item key={condition} id={condition} textValue={condition}>
                      {condition}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          }}
          render={({ field, fieldState }) => (
            <TextField className="w-full" isInvalid={fieldState.invalid}>
              <Label>Price</Label>
              <InputGroup>
                <InputGroup.Input {...field} type="number" className="w-full" />
              </InputGroup>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </TextField>
          )}
        />

        <Controller
          name="stock"
          control={control}
          rules={{
            required: "Stock is required",
            min: { value: 0, message: "Stock must be positive" },
          }}
          render={({ field, fieldState }) => (
            <TextField className="w-full" isInvalid={fieldState.invalid}>
              <Label>Stock</Label>
              <InputGroup>
                <InputGroup.Input {...field} type="number" className="w-full" />
              </InputGroup>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </TextField>
          )}
        />
      </div>

      <Button
        type="submit"
        color="primary"
        className="w-full"
        isDisabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}