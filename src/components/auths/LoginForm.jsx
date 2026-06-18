"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Login submitted:", data);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-blue-700">
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co.com/NnV3dhPM/Gemini-Generated-Image-6zah4o6zah4o6zah.png"
            alt="Marketplace"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-md w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">
              SaaS Marketplace
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-white leading-tight">
            Join the largest circular economy.
          </h2>

          <p className="text-lg text-white/90">
            Buy and sell with confidence in a marketplace designed for
            professional resellers and enterprise partners.
          </p>

          <div className="mt-8 flex gap-4">
            <div className="flex -space-x-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0aVSX6apusSr8mAC9nWZGsLPGseefJmxUWwAlrp9Li3YnaQz1hnm4dBbUY-qe6GXuEWXEmiWisTFNI9Yog7iXjnCl_vYym4ExrBoqas7wx7eZ-D1kZlotMxxvdO3gaAku8cmpnaizkNLB9jKJ9WXk78oAwCpbduY5WAvvgOubOXYhklxoecCHWgypo_qNgcQ1vzoZks6ejS3efJL1FiNBiLzWEyVK9rb-YMj9_vMZzxnym7fhRfDhb5ukdsy59lRTdHPpBS00SvRc"
                alt=""
                className="h-10 w-10 rounded-full border-2 border-white/20 object-cover"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf_PSu-dJVOFGrohEvfD3RzItN1JpnslwBatSNKHJSyWWzcuohl7sbTXC02PNXlB1x9g_PCipCRrgBOKd2y5vg9MkOJpKTN7qJkxSc85pCCuTITp8rUyBdSeuNXd-f8FzlWLorjld1GeveaqAgRYd1jnjHQYyVi6EfQSXTkWHtVd72HCp3EdKfETjfasUmqAujsUYmRAGMUTNDf1M5EIXU-muwUA_jPVw9t-inYzQL0qyrDiDrwzIHYX4ird3PSD3MbUjO_dvm6G-u"
                alt=""
                className="h-10 w-10 rounded-full border-2 border-white/20 object-cover"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVU17FQbHlFeLw7E4zzuQUDa7DOFGVpjcfUZpSocG4BbR4le2oyfljrR23j2apQQxjMHA-WnB7d0N-kICLKts-SS99j4siw-z6GNMcKeq-JyQmOXKeWb86YqlHLmn1ppjjgGW1MIRj8NHVsYOYe9y4M_Nfy7R62W2xDL3l-IyKlNehszq_hz3kTLIe1RqQkD-JnGndM2mykewVB08ct26ZIyc1yrY032IfCaMR1SVlAU3E4GMU7uNizKOq-eO_0u-WlV7GxDUqVZc"
                alt=""
                className="h-10 w-10 rounded-full border-2 border-white/20 object-cover"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-white/70">
                Trusted By
              </p>
              <p className="font-semibold text-white">
                10k+ Global Partners
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
    {/* Right Panel */}
<div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-12 py-6">
  <div className="w-full max-w-md">
    {/* Mobile Logo */}
    <div className="mb-8 text-center lg:hidden">
      <h1 className="text-2xl font-bold text-blue-600">
        SaaS Marketplace
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Welcome back
      </p>
    </div>

    {/* Form Card */}
    <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Log in to your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 transition-all duration-700 ${
          mounted
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
        }`}
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-base transition focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <a
              href="#"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters",
                },
              })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 pr-12 text-base transition focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login */}
        <button
          type="submit"
          className="h-14 w-full rounded-xl bg-blue-600 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-4 text-xs font-medium text-gray-500">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09A6.96 6.96 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>

          Continue with Google
        </button>
      </form>
    </div>

    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="#"
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </a>
      </p>
    </div>

    <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Settings</a>
    </div>
  </div>
</div>
    </div>
  );
}