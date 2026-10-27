"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleTranslate } from "@zyther/ggl-translate";
import { Check, ChevronDown, Globe2 } from "lucide-react";

const languages = [
  { code: "en", name: "English", abbreviation: "Eng" },
  { code: "nl", name: "Nederlands", abbreviation: "NL" },
  { code: "sw", name: "Kiswahili", abbreviation: "SW" },
  { code: "ru", name: "Русский", abbreviation: "RUS" },
  { code: "fr", name: "Français", abbreviation: "FR" },
  { code: "de", name: "Deutsch", abbreviation: "DE" },
  { code: "he", name: "עברית", abbreviation: "HE" },
  { code: "it", name: "Italiano", abbreviation: "IT" },
  { code: "da", name: "Dansk", abbreviation: "DA" },
  { code: "es", name: "Español", abbreviation: "ES" },
  { code: "ar", name: "العربية", abbreviation: "AR" },
  { code: "zh-cn", name: "中文", abbreviation: "ZH" },
  { code: "ja", name: "日本語", abbreviation: "JA" },
  { code: "pt", name: "Português", abbreviation: "PT" },
];
const languageCodes = languages.map(({ code }) => code);

const countryLanguages: Record<string, string> = {
  UG: "lg", KE: "sw", TZ: "sw", NL: "nl", IL: "he", IT: "it", DK: "da",
  CD: "fr", CG: "fr", GA: "fr", MG: "fr", ML: "fr", NE: "fr", BF: "fr",
  TG: "fr", BJ: "fr", DJ: "fr", CF: "fr", GQ: "fr", RW: "fr", BI: "fr",
  FR: "fr", BE: "fr", LU: "fr", SN: "fr", CI: "fr", CM: "fr", CH: "de",
  DE: "de", AT: "de", GT: "es", HN: "es", SV: "es", NI: "es", CR: "es",
  PA: "es", CU: "es", DO: "es", VE: "es", PE: "es", BO: "es", EC: "es",
  PY: "es", UY: "es", ES: "es", MX: "es", AR: "es", CO: "es", CL: "es",
  IQ: "ar", JO: "ar", LB: "ar", SY: "ar", YE: "ar", OM: "ar", QA: "ar",
  KW: "ar", BH: "ar", TN: "ar", DZ: "ar", LY: "ar", SD: "ar", PS: "ar",
  SA: "ar", AE: "ar", EG: "ar", MA: "ar", CN: "zh-cn", TW: "zh-cn",
  HK: "zh-cn", JP: "ja", PT: "pt", AO: "pt", MZ: "pt", BR: "pt",
};

interface TranslatorSetup {
  domain: string;
}

// Synchronous cookie getter (safe for lazy state init)
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

function saveTranslationCookie(targetLanguage: string, currentLanguage: string, domain: string) {
  if (targetLanguage === "en") {
    const pastDate = "Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = `googtrans=; ${pastDate}; path=/;`;
    if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
      document.cookie = `googtrans=; ${pastDate}; path=/; domain=${domain}`;
      document.cookie = `googtrans=; ${pastDate}; path=/; domain=.${domain}`;
    }
    return;
  }

  const sourceLang = currentLanguage && currentLanguage !== targetLanguage ? currentLanguage : "en";
  const cookieVal = `googtrans=/${sourceLang}/${targetLanguage}; path=/; max-age=31536000; samesite=lax`;

  // Clear stale cookies
  document.cookie = `googtrans=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
    document.cookie = `googtrans=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
  }

  // Set fresh cookie
  if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
    document.cookie = `${cookieVal}; domain=.${domain}`;
  } else {
    document.cookie = cookieVal;
  }
}

export default function GoogleTranslateSwitcher() {
  const [setup, setSetup] = useState<TranslatorSetup | null>(null);
  const [status, setStatus] = useState("");
  // Lazy state initialization ensures the initial state is ALREADY the saved cookie language on 1st render
  const [language, setLanguage] = useState<string>(() => getTranslationCookieLanguage());
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const domain = window.location.hostname;
    const activeCookieLang = getTranslationCookieLanguage();

    const initialize = async () => {
      // If user already has a saved cookie, do NOT run location detection
      if (activeCookieLang !== "en") {
        if (!cancelled) {
          setSetup({ domain });
        }
        return;
      }

      // Geo-IP detection ONLY runs if no language preference was saved yet
      try {
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(4000),
        });
        if (!response.ok) throw new Error(`Country lookup failed (${response.status})`);

        const result: { country_code?: string } = await response.json();
        const detectedLanguage = countryLanguages[result.country_code ?? ""] ?? "en";

        if (!cancelled && detectedLanguage !== "en") {
          saveTranslationCookie(detectedLanguage, "en", domain);
          setLanguage(detectedLanguage);
          window.location.reload();
          return;
        }
      } catch {
        setStatus("Automatic location detection is unavailable. English is selected.");
      } finally {
        if (!cancelled) setSetup({ domain });
      }
    };

    void initialize();
    return () => {
      cancelled = true;
    };
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
    if (code === language) {
      setOpen(false);
      return;
    }

    const domain = setup?.domain ?? window.location.hostname;
    saveTranslationCookie(code, language, domain);
    setLanguage(code);
    setOpen(false);
    window.location.reload();
  };

  const selectedLanguage =
    languages.find(({ code }) => code === language) ?? languages[0];

  return (
    <>
      {setup && (
        <GoogleTranslate
          domain={setup.domain}
          defaultLanguage="en"
          supportedLanguages={languageCodes.join(",")}
          enableAutoDetection={false}
          showNativeNames={false}
          showStatus={false}
          theme={{ mode: "dark" }}
          className="ik-google-translate"
          placeholder="Choose language"
          onLanguageChange={(nextLanguage) => {
            const nextCode = nextLanguage.toLowerCase();
            if (nextCode !== language && languageCodes.includes(nextCode)) {
              setLanguage(nextCode);
            }
          }}
        />
      )}
      <div
        ref={switcherRef}
        className="ik-language-switcher fixed right-4 bottom-5 z-[55] sm:right-6 sm:bottom-7"
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
          title={status || "Choose site language"}
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
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
    </>
  );
}