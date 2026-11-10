"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export const languages = [
  { code: "en", label: "English", translateCode: "" },
  { code: "fr", label: "Français", translateCode: "fr" },
  { code: "ar", label: "العربية", translateCode: "ar" },
  { code: "es", label: "Español", translateCode: "es" },
  { code: "zh-CN", label: "中文", translateCode: "zh-CN" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

interface TranslateElementOptions {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (options: TranslateElementOptions, elementId: string) => unknown;
      };
    };
  }
}

const STORAGE_KEY = "ikfood-language";
const LanguageContext = createContext<{
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
} | null>(null);

function readLanguage(): LanguageCode {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return languages.find(({ code }) => code === saved)?.code ?? "en";
}

function updateDocumentLanguage(language: LanguageCode) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

/** Every domain level a `googtrans` cookie can sit on: Google Translate also writes copies on the
 *  parent domain (e.g. `.ikfoodug.com` as well as `www.ikfoodug.com`). */
function cookieDomains(hostname: string): string[] {
  if (hostname === "localhost" || /^[\d.]+$/.test(hostname) || hostname.includes(":")) return [];
  const parts = hostname.split(".");
  const domains: string[] = [];
  for (let i = 0; i <= parts.length - 2; i++) domains.push(parts.slice(i).join("."));
  return domains;
}

function updateTranslationCookie(language: LanguageCode) {
  const translateCode = languages.find(({ code }) => code === language)?.translateCode ?? "";
  const value = translateCode ? `/en/${translateCode}` : "";
  // Clear every copy first, or a leftover parent-domain copy keeps the previous language.
  const expired = "googtrans=; max-age=0; path=/; SameSite=Lax";
  document.cookie = expired;
  for (const domain of cookieDomains(window.location.hostname)) {
    document.cookie = `${expired}; domain=${domain}`;
    document.cookie = `${expired}; domain=.${domain}`;
  }
  if (value) document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;
  return value;
}

function readTranslationCookie() {
  return document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/)?.[1] ?? "";
}

function applyTranslation(language: LanguageCode) {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) return false;
  const translateCode = languages.find(({ code }) => code === language)?.translateCode ?? "";
  // English is the page's own language: never drive Google's menu for it. Setting the menu to ""
  // (not one of its options) makes Google fall back to its first language, Arabic.
  if (!translateCode) return true;
  if (!Array.from(combo.options).some((option) => option.value === translateCode)) return false;
  combo.value = translateCode;
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function applyTranslationWhenReady(language: LanguageCode) {
  let attempts = 0;
  const tryApply = () => {
    applyTranslation(language);
    attempts += 1;
    if (attempts < 10) window.setTimeout(tryApply, 500);
  };
  window.setTimeout(tryApply, 500);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = readLanguage();
    setLanguageState(saved);
    updateDocumentLanguage(saved);
    const expectedCookie = languages.find(({ code }) => code === saved)?.translateCode
      ? `/en/${languages.find(({ code }) => code === saved)?.translateCode}`
      : "";
    if (readTranslationCookie() !== expectedCookie) {
      updateTranslationCookie(saved);
      if (readTranslationCookie() === expectedCookie) {
        window.location.reload();
        return;
      }
    }

    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (!TranslateElement) return;
      new TranslateElement(
        { pageLanguage: "en", includedLanguages: "fr,ar,es,zh-CN", autoDisplay: false },
        "google_translate_element",
      );
      applyTranslationWhenReady(readLanguage());
    };

    if (!document.querySelector('script[data-ikfood-translate]')) {
      const script = document.createElement("script");
      script.dataset.ikfoodTranslate = "true";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }

  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (readLanguage() !== "en") window.location.reload();
  }, [pathname]);

  const setLanguage = (selected: LanguageCode) => {
    window.localStorage.setItem(STORAGE_KEY, selected);
    setLanguageState(selected);
    updateDocumentLanguage(selected);
    updateTranslationCookie(selected);
    // Back to English: reload the untouched original instead of asking Google to "translate" to it.
    if (selected === "en") {
      window.location.reload();
      return;
    }
    applyTranslationWhenReady(selected);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
      <div id="google_translate_element" className="pointer-events-none fixed left-[-10000px] top-0" aria-hidden="true" />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}