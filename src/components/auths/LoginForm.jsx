"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  InputGroup,
  Label,
  FieldError,
} from "@heroui/react";
import { Envelope, Lock } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (!error) {
      toast.success("Logged in successfully!");
      window.location.href = "/"; // full reload — guarantees fresh cookie + fresh session everywhere
    } else {
      toast.error(error.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-default-50 to-default-100 px-4">
      {/* Glass Card */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-default-500">
            Login to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField className="mb-4 w-full" isInvalid={fieldState.invalid}>
                <Label>Email</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Envelope className="size-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    {...field}
                    type="email"
                    placeholder="name@email.com"
                    className="w-full"
                  />
                </InputGroup>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
            render={({ field, fieldState }) => (
              <TextField className="mb-2 w-full" isInvalid={fieldState.invalid}>
                <Label>Password</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Lock className="size-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                  />
                </InputGroup>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full"
            color="primary"
            isDisabled={!isValid}
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-default-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
