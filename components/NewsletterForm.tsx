"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      aria-label="Newsletter subscription form"
      className="flex items-end gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        className="h-14 min-w-0 flex-1 border-0 border-b-2 border-cream/25 bg-transparent px-0 text-xl font-bold text-cream outline-none transition-colors placeholder:font-medium placeholder:text-cream/30 focus:border-gold-400 sm:text-2xl"
      />
      <button type="submit" className="btn-gold mb-1 shrink-0">
        {done ? "Subscribed" : "Subscribe"}
      </button>
    </form>
  );
}
