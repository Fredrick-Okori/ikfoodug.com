"use client";

import { languages, useLanguage } from "./LanguageProvider";

export default function LanguageSelector({ theme = "light" }: { theme?: "light" | "dark" }) {
  const { language, setLanguage } = useLanguage();
  const dark = theme === "dark";

  return (
    // Just the language switcher: no visible label (the select keeps an accessible name).
    // translate="no" stops Google from translating the language names themselves.
    <label translate="no" className="notranslate block">
      <span className="sr-only">Choose language. Translations provided by Google Translate</span>
      <select
        aria-label="Choose language"
        value={language}
        onChange={(event) => setLanguage(event.target.value as (typeof languages)[number]["code"])}
        className={`h-11 min-w-32 cursor-pointer rounded-full border px-4 text-sm font-bold shadow-xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
          dark
            ? "border-cream/20 bg-forest-950 text-cream"
            : "border-forest-950/15 bg-cream text-forest-950"
        }`}
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </label>
  );
}
