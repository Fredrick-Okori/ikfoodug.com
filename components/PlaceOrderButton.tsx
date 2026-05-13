"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import OrderModal from "./OrderModal";

interface Props {
  variant?: "dark" | "gold";
  icon?: "arrow-right" | "arrow-up-right";
  className?: string;
}

export default function PlaceOrderButton({ variant = "dark", icon = "arrow-up-right", className }: Props) {
  const [open, setOpen] = useState(false);
  const Icon = icon === "arrow-right" ? ArrowRight : ArrowUpRight;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className ?? (variant === "gold" ? "btn-gold group" : "btn-dark group")}
      >
        Place Order
        <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </button>
      <OrderModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
