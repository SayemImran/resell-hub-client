import MyProducts from "@/components/dashboard/sellercomponents/MyProducts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const Products = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session.user.role !== "Seller") {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 p-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Lock Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Text Context */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">
              Restricted Access
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
              You don't have the required account permissions to view this
              dashboard page.
            </p>
          </div>

          {/* Action Redirect */}
          <button
            type="button"
            className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-98"
          >
            <Link href="/">Return Home</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MyProducts />
    </div>
  );
};

export default Products;
