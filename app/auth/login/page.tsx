"use client";

import { useState } from "react";
import { login } from "../../actions/auth";
import Link from "next/link";

type FieldErrors = Partial<{
  email: string;
  password: string;
  general: string;
}>;

export default function LoginPage() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setFieldErrors({});

    const result = await login(formData);

    if (!result.success) {
      setFieldErrors(result.errors );
    } else {
      setSuccess(true);
      
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-100">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F7A3F] mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to your KhetConnect account</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            <p className="font-medium">Login successful! Redirecting to dashboard...</p>
          </div>
        )}

        {/* General Error */}
        {fieldErrors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p className="text-sm font-medium">{fieldErrors.general}</p>
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F7A3F] focus:bg-white transition"
              suppressHydrationWarning={true}
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-sm mt-2">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F7A3F] focus:bg-white transition"
            />
            {fieldErrors.password && (
              <p className="text-red-600 text-sm mt-2">{fieldErrors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1F7A3F] text-white font-bold py-2.5 rounded-lg hover:bg-[#186a35] transition duration-200 mt-6"
          >
            Sign In
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6 border-t pt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#1F7A3F] font-semibold hover:text-[#186a35] transition">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}