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
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await authClient.updateUser({
        name: data.name,
        image: data.profile,
      });

      if (error) {
        throw new Error(error.message);
      }

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
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
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
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
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