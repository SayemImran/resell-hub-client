"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  InputGroup,
  Label,
  Radio,
  RadioGroup,
  FieldError,
} from "@heroui/react";
import { Envelope, Lock, Person } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import NavLink from "../navlink/NavLink";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "seeker",
      profile: "",
    },
    mode: "onChange",
  });

  // Watch values for live checklist evaluations
  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");

  // Evaluation criteria for the password checklist
  const checks = {
    min: passwordValue.length >= 6,
    upper: /[A-Z]/.test(passwordValue),
    lower: /[a-z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
  };

  const isMatching = passwordValue && passwordValue === confirmPasswordValue;

  const onSubmit = async (data) => {
    const { error } = await signUp.email({
      ...data,
      autoSignIn: false,
    });
    if (!error) {
      toast.success("Account created successfully! Please log in.");
      router.push("/auth/login");
      router.refresh();
    } else {
      toast.error(
        error.message || "Failed to create account. Please try again.",
      );
    }
    console.log("Form Submitted Successfully:", data);
    console.log("Sign Up Result:", { error });
  };

  // Reusable component for the validation list indicators
  const ChecklistItem = ({ ok, text }) => (
    <div className="flex items-center gap-2 text-sm mt-1 transition-colors duration-200">
      <div
        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
          ok ? "bg-green-500 border-green-500" : "border-gray-400"
        }`}
      />
      <span className={ok ? "text-green-500 font-medium" : "text-gray-400"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-default-50 to-default-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-default-500">
            Join and start applying for jobs
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Full name is required" }}
            render={({ field, fieldState }) => (
              <TextField className="mb-4 w-full" isInvalid={fieldState.invalid}>
                <Label>Full Name</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Person />
                  </InputGroup.Prefix>
                  <InputGroup.Input {...field} placeholder="full name" />
                </InputGroup>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Profile image link */}
          <Controller
            name="profile"
            control={control}
            render={({ field, fieldState }) => (
              <TextField className="mb-4 w-full" isInvalid={fieldState.invalid}>
                <Label>Profile Image Link</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Person />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    {...field}
                    placeholder="https://example.com/..."
                  />
                </InputGroup>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </TextField>
            )}
          />

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
                    <Envelope />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    {...field}
                    type="email"
                    placeholder="name@email.com"
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
              validate: {
                min: (v) => v.length >= 6 || "Must be at least 6 characters",
                upper: (v) =>
                  /[A-Z]/.test(v) || "Must contain an uppercase letter",
                lower: (v) =>
                  /[a-z]/.test(v) || "Must contain a lowercase letter",
                number: (v) => /[0-9]/.test(v) || "Must contain a number",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField className="mb-2 w-full" isInvalid={fieldState.invalid}>
                <Label>Password</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Lock />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                  />
                </InputGroup>
              </TextField>
            )}
          />

          {/* PASSWORD CHECKLIST */}
          <div className="mb-4">
            <ChecklistItem ok={checks.min} text="At least 6 characters" />
            <ChecklistItem ok={checks.upper} text="One uppercase letter" />
            <ChecklistItem ok={checks.lower} text="One lowercase letter" />
            <ChecklistItem ok={checks.number} text="One number" />
          </div>

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (v) => v === passwordValue || "Passwords must match",
            }}
            render={({ field, fieldState }) => (
              <TextField className="mb-2 w-full" isInvalid={fieldState.invalid}>
                <Label>Confirm Password</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Lock />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                  />
                </InputGroup>
              </TextField>
            )}
          />

          {/* Match check */}
          <div className="mb-4">
            <ChecklistItem ok={isMatching} text="Passwords must match" />
          </div>

          {/* Role Radio */}
          <div className="flex flex-col gap-2 mb-6">
            <Label>Account type</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  orientation="horizontal"
                  aria-label="Select account type"
                  className="flex justify-between"
                >
                  <Radio value="Buyer">
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Buyer
                    </Radio.Content>
                  </Radio>
                  <Radio value="Seller">
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Seller
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            color="primary"
            isDisabled={!isValid}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-default-500 mt-6">
          Already have an account?{" "}
          <NavLink href="/auth/login" className="text-primary hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
