"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";

interface Props {
  variant?: "dark" | "gold";
  icon?: "arrow-right" | "arrow-up-right";
  className?: string;
  label?: string;
}

export default function PlaceOrderButton({ variant = "dark", icon = "arrow-up-right", className, label = "Place Order" }: Props) {
  const Icon = icon === "arrow-right" ? ArrowRight : ArrowUpRight;

  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-order-modal"))}
      className={className ?? (variant === "gold" ? "btn-gold group" : "btn-dark group")}
    >
      {label}
      <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
