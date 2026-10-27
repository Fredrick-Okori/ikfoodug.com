"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { languageCodes, languages } from "@/lib/languages";

declare global {
  interface Window {
    __ikTranslateHydrated?: () => void;
  }
}

function getTranslationCookieLanguage(): string {
  if (typeof document === "undefined") return "en";
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("googtrans="))
    ?.slice("googtrans=".length);

  if (!cookie) return "en";
  const code = decodeURIComponent(cookie).split("/").pop()?.toLowerCase();
  return code && languageCodes.includes(code) ? code : "en";
}

function saveTranslationCookie(targetLanguage: string) {
  const domain = window.location.hostname;
  const isLocal = domain === "localhost" || domain === "127.0.0.1";
  const expired = "Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

  // Google Translate may also have written host and dot-domain copies; clear them all.
  document.cookie = `googtrans=; ${expired}`;
  if (!isLocal) {
    document.cookie = `googtrans=; ${expired}; domain=${domain}`;
    document.cookie = `googtrans=; ${expired}; domain=.${domain}`;
  }
  if (targetLanguage === "en") return;

  // The page source is always English, so the pair is always /en/<target>.
  const cookieVal = `googtrans=/en/${targetLanguage}; path=/; max-age=31536000; samesite=lax`;
  document.cookie = isLocal ? cookieVal : `${cookieVal}; domain=.${domain}`;
}

export default function GoogleTranslateSwitcher() {
  const [language, setLanguage] = useState("en");
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  // Runs after hydration: sync the selector with the cookie and let the
  // head boot script start translating.
  useEffect(() => {
    setLanguage(getTranslationCookieLanguage());
    window.__ikTranslateHydrated?.();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !switcherRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const changeLanguage = (code: string) => {
    setOpen(false);
    if (code === language) return;

    saveTranslationCookie(code);
    setLanguage(code);
    window.location.reload();
  };

  const selectedLanguage =
    languages.find(({ code }) => code === language) ?? languages[0];

  return (
    <div
      ref={switcherRef}
      className="ik-language-switcher notranslate fixed right-4 bottom-5 z-[55] sm:right-6 sm:bottom-7"
    >
      {open && (
        <div
          id="language-switcher-options"
          className="absolute right-0 bottom-full mb-3 max-h-[min(70vh,28rem)] w-56 overflow-y-auto rounded-2xl border border-white/10 bg-forest-900 p-2 shadow-2xl"
          role="menu"
          aria-label="Choose language"
        >
          {languages.map(({ code, name }) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={language === code}
              onClick={() => changeLanguage(code)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              {name}
              {language === code && (
                <Check className="h-4 w-4 text-gold-400" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls="language-switcher-options"
        aria-label={`Language: ${selectedLanguage.name}. ${open ? "Close" : "Choose"} language`}
        title="Choose site language"
        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-gold-400/40 bg-forest-900 px-4 text-sm font-semibold text-gold-400 shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-gold-400 hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <Globe2 className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{selectedLanguage.abbreviation}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
