"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  InputGroup,
  Label,
  FieldError,
} from "@heroui/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function EditProfileForm({ user }) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user.name,
      profile: user.profile,
      phone: user.phone || "",
      address: user.address || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await authClient.updateUser({
        name: data.name,
        image: data.profile,
        phone: data.phone,
        address: data.address,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Keep embedded seller_info in products collection in sync
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/sync-seller/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: user.email }),
      });

      toast.success("Profile updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-xl"
    >
      <h2 className="text-lg font-semibold">Profile Information</h2>

      {/* Name */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Name</Label>
            <InputGroup>
              <InputGroup.Input {...field} className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      {/* Profile image URL */}
      <Controller
        name="profile"
        control={control}
        rules={{ required: "Profile image URL is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Profile Image URL</Label>
            <InputGroup>
              <InputGroup.Input {...field} className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^[0-9+\-\s()]{6,20}$/,
            message: "Enter a valid phone number",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Phone Number</Label>
            <InputGroup>
              <InputGroup.Input {...field} type="tel" placeholder="+880 1XXXXXXXXX" className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      {/* Address */}
      <Controller
        name="address"
        control={control}
        rules={{ required: "Address is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Address</Label>
            <InputGroup>
              <InputGroup.Input {...field} placeholder="Street, City, Country" className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      {/* Email - read only */}
      <TextField className="w-full" isDisabled>
        <Label>Email</Label>
        <InputGroup>
          <InputGroup.Input value={user.email} readOnly className="w-full" />
        </InputGroup>
      </TextField>

      {/* Role - read only */}
      <TextField className="w-full" isDisabled>
        <Label>Role</Label>
        <InputGroup>
          <InputGroup.Input value={user.role} readOnly className="w-full" />
        </InputGroup>
      </TextField>

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