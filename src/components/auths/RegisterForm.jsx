"use client";

import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      role: "buyer",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const role = watch("role");
  const password = watch("password", "");
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.15),_transparent_28%)] text-on-background flex items-center justify-center px-4 py-8">
      <main className="w-full max-w-6xl">
        <div className="mx-auto rounded-[32px] border border-white/20 bg-white/15 shadow-2xl backdrop-blur-xl p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.5fr] items-start">
            <div className="rounded-[28px] border border-white/20 bg-white/40 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Password requirements
              </h2>
              <p className="text-sm text-gray-700 mb-6">
                Your password must include all of the following while typing.
              </p>
              <ul className="space-y-4 text-sm text-gray-800">
                <li className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${hasMinLength ? "bg-green-500" : "bg-gray-300"}`}>
                    {hasMinLength ? "✔" : "✕"}
                  </span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${hasNumber ? "bg-green-500" : "bg-gray-300"}`}>
                    {hasNumber ? "✔" : "✕"}
                  </span>
                  At least one number
                </li>
                <li className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${hasUppercase ? "bg-green-500" : "bg-gray-300"}`}>
                    {hasUppercase ? "✔" : "✕"}
                  </span>
                  At least one uppercase letter
                </li>
                <li className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${hasSpecialChar ? "bg-green-500" : "bg-gray-300"}`}>
                    {hasSpecialChar ? "✔" : "✕"}
                  </span>
                  At least one special character
                </li>
              </ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full flex items-center justify-center px-6 py-10 overflow-y-auto">
              <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-sm text-gray-500 mb-6">
              Join our marketplace community
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          
            

              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className="w-full border p-3 rounded-xl mt-1 focus:outline-blue-500"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full border p-3 rounded-xl mt-1 focus:outline-blue-500"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      validate: (value) =>
                        /\d/.test(value)
                          ? /[A-Z]/.test(value)
                            ? /[!@#$%^&*(),.?":{}|<>]/.test(value)
                              ? true
                              : "Password must contain at least one special character"
                            : "Password must contain at least one uppercase letter"
                          : "Password must contain at least one number",
                    })}
                    className="w-full border p-3 rounded-xl mt-1 focus:outline-blue-500"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Confirm</label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="w-full border p-3 rounded-xl mt-1 focus:outline-blue-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* IMAGE URL */}
              <div>
                <label className="text-sm font-medium">Profile Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  {...register("image")}
                  className="w-full border p-3 rounded-xl mt-1 focus:outline-blue-500"
                />
              </div>
                  {/* ROLE */}
                <div>
                <label className="block text-sm font-medium mb-2">
                  Select Role
                </label>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="buyer"
                      {...register("role")}
                      checked={role === "buyer"}
                    />
                    Buyer
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="seller"
                      {...register("role")}
                      checked={role === "seller"}
                    />
                    Seller
                  </label>
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-sm font-medium">Location</label>
                <select
                  {...register("location")}
                  className="w-full border p-3 rounded-xl mt-1 bg-white focus:outline-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold transition hover:bg-blue-700"
              >
                Register
              </button>

              {/* GOOGLE */}
              <button
                type="button"
                className="w-full border py-3 rounded-xl flex items-center justify-center gap-2 transition hover:bg-gray-50"
              >
                Continue with Google
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-500">
              Already have an account?{" "}
              <a className="text-blue-600 font-medium hover:underline" href="#">
                Login
              </a>
            </p>
          </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}