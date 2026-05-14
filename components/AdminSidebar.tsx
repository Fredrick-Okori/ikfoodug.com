"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Package, Newspaper, Images, Settings, Menu, X,
  LogOut, ChevronRight, BarChart3, Mail, Sun, Moon,
} from "lucide-react";
import { logout } from "@/app/admin/actions";
import { useAdminTheme } from "@/components/AdminThemeProvider";

const nav = [
  {
    section: "Manage",
    items: [
      { href: "/admin",           label: "Orders",    icon: Package,    exact: true,  soon: false },
      { href: "/admin/enquiries", label: "Enquiries", icon: Mail,       exact: false, soon: true  },
    ],
  },
  {
    section: "Content",
    items: [
      { href: "/admin/blog",    label: "Blog Posts", icon: Newspaper, exact: false, soon: true },
      { href: "/admin/gallery", label: "Gallery",    icon: Images,    exact: false, soon: true },
    ],
  },
  {
    section: "Analytics",
    items: [
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false, soon: true },
    ],
  },
  {
    section: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings, exact: false, soon: true },
    ],
  },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useAdminTheme();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo + theme toggle */}
      <div className="px-5 py-6 border-b border-gray-200 dark:border-white/6">
        <div className="flex items-center justify-between">
          <Link href="/admin" onClick={() => setOpen(false)}>
            <Image src="/logo_clean.webp" alt="IK Food Uganda" width={80} height={32} className="h-8 w-auto object-contain opacity-90" />
          </Link>
          <button
            onClick={toggle}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all"
          >
            {theme === "dark"
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />
            }
          </button>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-white/25 uppercase tracking-widest mt-2 pl-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {nav.map(({ section, items }) => (
          <div key={section}>
            <p className="text-[10px] font-semibold text-gray-400 dark:text-white/20 uppercase tracking-widest px-3 mb-2">{section}</p>
            <ul className="space-y-0.5">
              {items.map(({ href, label, icon: Icon, exact, soon }) => {
                const active = !soon && isActive(href, exact);
                return (
                  <li key={href}>
                    {soon ? (
                      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl opacity-40 cursor-not-allowed select-none">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-gray-400 dark:text-white/50 shrink-0" />
                          <span className="text-sm text-gray-500 dark:text-white/50">{label}</span>
                        </div>
                        <span className="text-[9px] text-gray-400 dark:text-white/30 uppercase tracking-wider border border-gray-200 dark:border-white/15 rounded px-1.5 py-0.5">
                          Soon
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                          active
                            ? "bg-gold-400/15 text-gold-600 dark:text-gold-400"
                            : "text-gray-600 dark:text-white/45 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 shrink-0 ${
                            active
                              ? "text-gold-500 dark:text-gold-400"
                              : "text-gray-400 dark:text-white/40 group-hover:text-gray-700 dark:group-hover:text-white"
                          }`} />
                          <span className="text-sm font-medium">{label}</span>
                        </div>
                        {active && <ChevronRight className="w-3.5 h-3.5 text-gold-500/60 dark:text-gold-400/60" />}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-white/6 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 dark:text-white/35 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
          View Live Site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 dark:text-white/35 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/5 transition-all text-sm"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white dark:bg-[#0a0f14] border-r border-gray-200 dark:border-white/6 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center bg-white dark:bg-forest-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white shadow-sm"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-56 z-50 bg-white dark:bg-[#0a0f14] border-r border-gray-200 dark:border-white/6 flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
          <SidebarContent />
        </aside>
      </div>
    </>
  );
}
