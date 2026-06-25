"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, CircleXmark } from "@gravity-ui/icons";

export default function OrderSuccessClient({ success }) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (!success) return;

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [success]);

  useEffect(() => {
    if (success && seconds <= 0) {
      router.push("dashboard/buyer/orders");
    }
  }, [seconds, success, router]);

  if (!success) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <CircleXmark width={56} className="text-danger" />
        <h1 className="text-2xl font-bold text-danger">Payment Not Confirmed</h1>
        <p className="text-default-500">
          We couldn't verify your payment. If you were charged, please contact support.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
      <CircleCheck width={56} className="text-success" />
      <h1 className="text-2xl font-bold text-primary">Payment Successful!</h1>
      <p className="text-default-500">Your order has been confirmed.</p>
      <p className="text-sm text-default-400">
        Redirecting to your orders in {seconds}...
      </p>
    </section>
  );
}