"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function serverAuthFetch(url, options = {}) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    throw new Error("Authentication error. No session found.");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
