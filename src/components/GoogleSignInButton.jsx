"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";

export function GoogleSignInButton() {
  return (
    <Button onClick={() => authClient.signIn.social({ provider: "google" })}>
      Continue with Google <FaGoogle/>
    </Button>
  );
}
