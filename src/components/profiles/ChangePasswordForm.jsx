"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  InputGroup,
  Label,
  FieldError,
} from "@heroui/react";
import { Lock } from "@gravity-ui/icons";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data) => {
    try {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Password changed successfully!");
      reset();
    } catch (err) {
      console.error("Failed to change password:", err);
      toast.error(err.message || "Failed to change password. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-xl"
    >
      <h2 className="text-lg font-semibold">Change Password</h2>

      {/* Current password */}
      <Controller
        name="currentPassword"
        control={control}
        rules={{ required: "Current password is required" }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Current Password</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Lock className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input {...field} type="password" placeholder="••••••••" className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      {/* New password */}
      <Controller
        name="newPassword"
        control={control}
        rules={{
          required: "New password is required",
          validate: {
            min: (v) => v.length >= 6 || "Must be at least 6 characters",
            upper: (v) => /[A-Z]/.test(v) || "Must contain an uppercase letter",
            lower: (v) => /[a-z]/.test(v) || "Must contain a lowercase letter",
            number: (v) => /[0-9]/.test(v) || "Must contain a number",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>New Password</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Lock className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input {...field} type="password" placeholder="••••••••" className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      {/* Confirm new password */}
      <Controller
        name="confirmNewPassword"
        control={control}
        rules={{
          required: "Please confirm your new password",
          validate: (v) => v === newPasswordValue || "Passwords must match",
        }}
        render={({ field, fieldState }) => (
          <TextField className="w-full" isInvalid={fieldState.invalid}>
            <Label>Confirm New Password</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Lock className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input {...field} type="password" placeholder="••••••••" className="w-full" />
            </InputGroup>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </TextField>
        )}
      />

      <Button
        type="submit"
        color="primary"
        className="w-full"
        isDisabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Changing..." : "Change Password"}
      </Button>
    </form>
  );
}