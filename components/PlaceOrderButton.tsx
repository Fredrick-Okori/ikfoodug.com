"use client";

interface Props {
  variant?: "dark" | "gold";
  className?: string;
  label?: string;
}

/** Opens the order drawer (listened for in Navbar). */
export default function PlaceOrderButton({ variant = "dark", className, label = "Place an order" }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-order-modal"))}
      className={className ?? (variant === "gold" ? "btn-gold" : "btn-dark")}
    >
      {label}
    </button>
  );
}
