"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { RegionLink as Link, useRegion } from "./RegionProvider";
import { stripRegion } from "@/lib/regions";
import { setSmoothScrollPaused } from "./SmoothScroll";
import OrderModal from "./OrderModal";
import LanguageSelector from "./LanguageSelector";

const links = [
  { href: "/",             label: "Home" },
  { href: "/about",        label: "About" },
  { href: "/products",     label: "Products" },
  { href: "/impact",       label: "Impact" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/gallery",      label: "Gallery" },
  { href: "/contact",      label: "Contact" },
];

function Logo({ className = "h-14" }: { className?: string }) {
  const region = useRegion();
  return (
    <Image
      src="/logo_clean.webp"
      alt={region.name}
      width={2163}
      height={863}
      priority
      className={`${className} w-auto shrink-0 object-contain`}
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // Flips true right after mount so the bars slide down from above the screen on load.
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const pathname = usePathname();
  const region = useRegion();
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => stripRegion(pathname) === href;

  // Close the menu on every route change (including Back/Forward).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    // "Scrolled" as soon as scrolling starts; the header slides away and the floating menu takes over.
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const handler = () => setOrderOpen(true);
    window.addEventListener("open-order-modal", handler);
    return () => window.removeEventListener("open-order-modal", handler);
  }, []);

  // While the menu is open: lock scroll, focus the panel, keep Tab inside, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const body = document.body;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    setSmoothScrollPaused(true);
    const frame = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return setMenuOpen(false);
      if (event.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !focusables.includes(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;

    return () => {
      cancelAnimationFrame(frame);
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      setSmoothScrollPaused(false);
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  // Staggered entrance for the menu items.
  let order = 0;
  const stagger = () => {
    const i = order++;
    return {
      className: `transition-all duration-500 ease-out motion-reduce:transition-none ${
        menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
      }`,
      style: { transitionDelay: menuOpen ? `${180 + i * 45}ms` : "0ms" },
    };
  };

  const openOrder = () => {
    setMenuOpen(false);
    setOrderOpen(true);
  };

  return (
    <>
      {/* Floating menu button: always on mobile, replaces the header on desktop once scrolled. */}
      <button
        ref={toggleRef}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        className={`fixed left-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-forest-950 text-cream shadow-xl ring-2 ring-gold-400/60 transition-all duration-300 hover:bg-forest-800 sm:left-6 sm:h-16 sm:w-16 ${
          menuOpen || scrolled
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-75 opacity-0 max-lg:pointer-events-auto max-lg:scale-100 max-lg:opacity-100"
        }`}
      >
        <span aria-hidden className="relative block h-5 w-7">
          <span className={`absolute left-0 h-[3px] w-7 rounded-full bg-current transition-all duration-300 ${menuOpen ? "top-[8.5px] rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-[8.5px] h-[3px] w-7 rounded-full bg-current transition-all duration-200 ${menuOpen ? "scale-x-0 opacity-0" : "opacity-100"}`} />
          <span className={`absolute left-0 h-[3px] w-7 rounded-full bg-current transition-all duration-300 ${menuOpen ? "top-[8.5px] -rotate-45" : "top-[17px]"}`} />
        </span>
      </button>

      {/* Mobile: a slim brand strip that floats over the top of the hero, slides in on load and
          scrolls away with the page. */}
      <div
        className={`absolute inset-x-0 top-0 z-40 flex h-[88px] items-center justify-center border-b border-forest-950/10 bg-parchment transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-24 lg:hidden ${
          entered ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link href="/" aria-label={`${region.name} home`}>
          <Logo />
        </Link>
      </div>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-forest-950/50 backdrop-blur-sm transition-opacity duration-500 motion-reduce:transition-none ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Full-screen menu that drops down from above */}
      <aside
        id="site-menu"
        ref={panelRef}
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        tabIndex={-1}
        className={`fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-y-auto overscroll-contain bg-cream shadow-2xl outline-none transition-[transform,visibility] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          menuOpen ? "visible translate-y-0" : "invisible -translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-24 w-full max-w-2xl shrink-0 items-center justify-end border-b border-[#ebdfc0] px-5 sm:h-28">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label={`${region.name} home`} {...stagger()}>
            <span className="block rounded-full bg-forest-950 px-4 py-2">
              <Logo className="h-11" />
            </span>
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-5 py-6">
          <nav aria-label="Main navigation" className="flex flex-col gap-2">
            {links.map((link, index) => {
              const s = stagger();
              const current = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={current ? "page" : undefined}
                  style={s.style}
                  className={`${s.className} group flex items-center gap-5 rounded-full px-6 py-4 active:scale-[0.98] ${
                    current ? "bg-forest-950 text-cream" : "bg-[#ebdfc0]/80 text-forest-950 hover:bg-[#ebdfc0]"
                  }`}
                >
                  <span className={`w-6 shrink-0 text-xs font-bold tabular-nums ${current ? "text-gold-400" : "text-forest-900/70"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          <div style={stagger().style} className={`${menuOpen ? "opacity-100" : "opacity-0"} space-y-4 transition-opacity duration-500`}>
            <button type="button" onClick={openOrder} className="btn-gold w-full py-5 text-base">
              Place an order
            </button>
            <div className="flex flex-col gap-2 px-2 text-sm font-semibold text-forest-900/70 sm:flex-row sm:gap-6">
              <a href={region.phone.href} className="hover:text-forest-950">{region.phone.display}</a>
              <a href={`mailto:${region.email}`} className="break-all hover:text-forest-950">{region.email}</a>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop header: floats over the hero (so the hero photo runs to the top of the screen),
          slides down on load, and slides back up out of view as soon as scrolling starts (returning
          at the top). The fixed wrapper ignores clicks so the hidden header never blocks the page. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden lg:block">
        <header
          className={`relative transition-[transform,visibility] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            entered && !scrolled ? "pointer-events-auto visible translate-y-0" : "invisible -translate-y-full"
          }`}
        >
          <div className="border-b border-forest-950/10 bg-[#ebdfc0] px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-forest-900/75">
            Growing and exporting Ugandan vanilla since 2015
            <span aria-hidden="true" className="mx-3 text-forest-900/30">|</span>
            Buying in volume?{" "}
            <button type="button" onClick={() => setOrderOpen(true)} className="font-bold text-forest-950 underline decoration-gold-500 decoration-2 underline-offset-2 hover:decoration-forest-950">
              Request a quote
            </button>
          </div>

          <div className="border-b border-forest-950/10 bg-parchment/95 shadow-[0_8px_30px_-12px_rgba(25,29,31,0.25)] backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-10">
              <Link href="/" aria-label={`${region.name} home`} className="flex shrink-0 items-center">
                <Logo />
              </Link>

              <nav aria-label="Main navigation" className="flex items-center gap-1">
                {links.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-forest-900/80 transition hover:bg-forest-950/5 hover:text-forest-950 aria-[current=page]:bg-forest-950 aria-[current=page]:text-cream"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setOrderOpen(true)}
                className="h-10 rounded-full bg-forest-950 px-5 text-sm font-extrabold text-cream transition hover:bg-forest-800"
              >
                Place order
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[70] sm:right-6">
        <LanguageSelector />
      </div>

      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
