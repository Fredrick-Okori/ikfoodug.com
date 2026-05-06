"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown,
  BookOpen, ImageIcon, ArrowUpRight, Phone, Mail,
} from "lucide-react";
import Image from "next/image";
import OrderModal from "./OrderModal";

const links = [
  { href: "/",             label: "Home" },
  { href: "/about",        label: "About" },
  { href: "/impact",       label: "Impact" },
  { href: "/products",     label: "Products" },
  { href: "/case-studies", label: "Case Studies" },
  {
    label: "Resources",
    children: [
      { href: "/blog",       label: "Blog",  Icon: BookOpen,  desc: "Insights on vanilla, farming & export" },
      { href: "/blog#media", label: "Media", Icon: ImageIcon, desc: "Press kits, photos & media assets" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [resOpen,    setResOpen]    = useState(false);
  const [orderOpen,  setOrderOpen]  = useState(false);
  const resRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = el.scrollHeight === el.clientHeight
        ? 0
        : (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(pct);
      setScrolled(el.scrollTop > 48);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); setResOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resRef.current && !resRef.current.contains(e.target as Node)) {
        setResOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => pathname === href;

  const desktopLink = (active: boolean) =>
    `relative group/link flex items-center gap-1 px-1 py-1 text-sm font-medium transition-colors duration-200 focus-visible:outline-none
     ${active ? "text-gold-400" : "text-gold-400/45 hover:text-gold-400"}`;

  return (
    <>
      {/* ── Scroll progress bar ─────────────────────────── */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gold-400 transition-all duration-100 pointer-events-none"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* ── Header bar ──────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-forest-900 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold-400/15 shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            : "border-b border-gold-400/8"
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-16 md:h-20"}`}>

            {/* ── Logo ── */}
            <Link
              href="/"
              className="shrink-0 group/logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-0.5"
              aria-label="IK Food Uganda — Home"
            >
              <Image
                src="/logo_clean.webp"
                alt="IK Food Uganda"
                width={110}
                height={44}
                className={`object-contain transition-all duration-300 group-hover/logo:opacity-90 ${scrolled ? "h-11" : "h-14"} w-auto`}
                priority
              />
            </Link>

            {/* ── Desktop nav links ── */}
            <ul className="hidden md:flex items-center gap-5 lg:gap-6" role="list">
              {links.map((link) =>
                link.children ? (
                  <li key={link.label} className="relative" ref={resRef}>
                    <button
                      onClick={() => setResOpen((o) => !o)}
                      aria-expanded={resOpen}
                      aria-haspopup="true"
                      className={`${desktopLink(false)} pr-0`}
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover/link:w-full" aria-hidden="true" />
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 mt-px text-gold-400/45 ${resOpen ? "rotate-180 !text-gold-400" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* ── Resources panel ── */}
                    {resOpen && (
                      <div
                        className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[272px] bg-forest-900 border border-gold-400/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                        role="menu"
                      >
                        {/* lime top bar */}
                        <div className="h-[2px] bg-gold-400" aria-hidden="true" />
                        {/* image strip */}
                        <div className="relative h-20 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=520&q=80"
                            alt=""
                            className="w-full h-full object-cover opacity-30"
                            aria-hidden="true"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-forest-900 to-transparent" aria-hidden="true" />
                          <p className="absolute bottom-2.5 left-4 text-[10px] text-gold-400/60 uppercase tracking-widest font-semibold">
                            Resources
                          </p>
                        </div>
                        {/* links */}
                        <div className="p-2" role="none">
                          {link.children.map(({ href, label, Icon, desc }) => (
                            <Link
                              key={href}
                              href={href}
                              role="menuitem"
                              className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gold-400/8 group/item transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0 group-hover/item:bg-gold-400 transition-colors mt-0.5">
                                <Icon className="w-3.5 h-3.5 text-gold-400 group-hover/item:text-forest-950 transition-colors" aria-hidden="true" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gold-400/80 group-hover/item:text-gold-400 transition-colors leading-none mb-0.5">
                                  {label}
                                </p>
                                <p className="text-xs text-gold-400/35 leading-snug">{desc}</p>
                              </div>
                              <ArrowUpRight className="w-3 h-3 text-gold-400/20 group-hover/item:text-gold-400 transition-all ml-auto mt-0.5 shrink-0 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                        <div className="pb-1" />
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href!}
                      aria-current={isActive(link.href!) ? "page" : undefined}
                      className={desktopLink(isActive(link.href!))}
                    >
                      <span className="relative">
                        {link.label}
                        <span
                          className={`absolute -bottom-0.5 left-0 h-px bg-gold-400 transition-all duration-300
                            ${isActive(link.href!) ? "w-full" : "w-0 group-hover/link:w-full"}`}
                          aria-hidden="true"
                        />
                      </span>
                      {isActive(link.href!) && (
                        <span
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* ── CTA + mobile toggle ── */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOrderOpen(true)}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide border border-gold-400 text-forest-950 bg-gold-400 hover:bg-gold-300 hover:border-gold-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-900 shadow-[0_0_20px_rgba(156,232,0,0.15)] hover:shadow-glow-gold"
              >
                Place Order
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 text-gold-400 hover:bg-gold-400/10"
              >
                <span
                  className={`absolute transition-all duration-300 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
                  aria-hidden="true"
                >
                  <X className="w-5 h-5" />
                </span>
                <span
                  className={`absolute transition-all duration-300 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
                  aria-hidden="true"
                >
                  <Menu className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Full-screen mobile overlay ───────────────────── */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden flex flex-col bg-forest-900 transition-all duration-500 ease-spring
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* lime top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-400" aria-hidden="true" />

        <div className="h-16 shrink-0" aria-hidden="true" />

        {/* Main nav links */}
        <nav className="flex-1 overflow-y-auto px-6 pt-8 pb-4" aria-label="Mobile navigation">
          <ul className="space-y-0" role="list">
            {links.map((link, i) =>
              link.children ? (
                <li key={link.label}>
                  <p
                    className={`label-tag text-gold-400/40 pt-6 pb-3 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: open ? `${(i + 1) * 60}ms` : "0ms" }}
                  >
                    {link.label}
                  </p>
                  {link.children.map((c, ci) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`flex items-center gap-3 py-2.5 text-base text-gold-400/45 hover:text-gold-400 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: open ? `${(i + ci + 2) * 60}ms` : "0ms" }}
                    >
                      <c.Icon className="w-4 h-4 text-gold-400/50 shrink-0" aria-hidden="true" />
                      {c.label}
                    </Link>
                  ))}
                </li>
              ) : (
                <li
                  key={link.href}
                  className={`transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={link.href!}
                    aria-current={isActive(link.href!) ? "page" : undefined}
                    className={`flex items-center justify-between py-4 border-b text-2xl font-bold font-heading transition-all
                      ${isActive(link.href!)
                        ? "text-gold-400 border-gold-400/20 pl-3"
                        : "text-gold-400/40 hover:text-gold-400 border-gold-400/8 pl-0 hover:pl-1"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      {isActive(link.href!) && (
                        <span className="w-1 h-6 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
                      )}
                      {link.label}
                    </span>
                    {isActive(link.href!) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Bottom: CTA + contact */}
        <div
          className={`px-6 py-8 border-t border-gold-400/10 space-y-5 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: open ? "380ms" : "0ms" }}
        >
          <button
            onClick={() => { setOpen(false); setOrderOpen(true); }}
            className="btn-gold w-full justify-center text-base py-4"
          >
            Place Order
          </button>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a
              href="tel:+256776341713"
              className="flex items-center gap-2 text-gold-400/35 text-sm hover:text-gold-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              +256 776 341 713
            </a>
            <a
              href="mailto:sales@ikfooduganda.com"
              className="flex items-center gap-2 text-gold-400/35 text-sm hover:text-gold-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              sales@ikfooduganda.com
            </a>
          </div>
        </div>
      </div>

      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
