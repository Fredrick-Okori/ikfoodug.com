"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      aria-label="Newsletter subscription form"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Enter your email address"
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-white text-sm"
        required
        aria-required="true"
      />
      <button type="submit" className="btn-white shrink-0 text-sm py-3">
        Subscribe
      </button>
    </form>
  );
}
