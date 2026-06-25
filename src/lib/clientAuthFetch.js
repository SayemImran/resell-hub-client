"use client";

import { authClient } from "@/lib/auth-client";

export async function clientAuthFetch(url, options = {}) {
  const { data: tokenData, error } = await authClient.token();

  if (error || !tokenData?.token) {
    console.error("Failed to get auth token:", error);
    throw new Error("Authentication error. Please log in again.");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${tokenData.token}`,
      "Content-Type": "application/json",
    },
  });
}
