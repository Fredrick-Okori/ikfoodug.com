import Link from "next/link";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const nav = {
  company:  [
    { href: "/about",        label: "About Us" },
    { href: "/products",     label: "Products" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog",         label: "Blog" },
    { href: "/contact",      label: "Contact" },
  ],
  products: [
    { href: "/products#vanilla",     label: "Ugandan Vanilla" },
    { href: "/products#coffee",      label: "Robusta Coffee" },
    { href: "/products#cocoa",       label: "Organic Cocoa" },
    { href: "/products#avocado",     label: "Hass Avocado" },
    { href: "/products#garden-eggs", label: "Garden Eggs" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white" aria-label="Site footer">
      {/* Top divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto container-px py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-5 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
              aria-label="IK Food Uganda — Home"
            >
              <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-forest-950" aria-hidden="true" />
              </div>
              <div className="leading-none">
                <span className="font-heading text-lg font-bold text-white block leading-none">IK Food</span>
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/40">Uganda</span>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-[220px]">
              Pure Ugandan Vanilla, Perfected for the World. Sustainably grown,
              globally distributed since 2015.
            </p>
            <span className="chip bg-gold-400/10 text-gold-400 border border-gold-400/25">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
              HORTIFRESH Member
            </span>
          </div>

          {/* Company */}
          <div>
            <h3 className="label-tag text-white/35 mb-5">Company</h3>
            <ul className="space-y-3" role="list">
              {nav.company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/55 hover:text-white text-sm transition-colors link-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest-400 rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="label-tag text-white/35 mb-5">Products</h3>
            <ul className="space-y-3" role="list">
              {nav.products.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/55 hover:text-white text-sm transition-colors link-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest-400 rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label-tag text-white/35 mb-5">Contact</h3>
            <ul className="space-y-4" role="list">
              <li>
                <a href="tel:+256776341713" className="flex items-start gap-3 text-white/55 hover:text-white text-sm transition-colors group focus-visible:outline-none focus-visible:underline">
                  <Phone className="w-4 h-4 mt-0.5 text-gold-400 group-hover:text-gold-300 shrink-0" aria-hidden="true" />
                  +256 776 341 713
                </a>
              </li>
              <li>
                <a href="mailto:sales@ikfooduganda.com" className="flex items-start gap-3 text-white/55 hover:text-white text-sm transition-colors group focus-visible:outline-none focus-visible:underline">
                  <Mail className="w-4 h-4 mt-0.5 text-gold-400 group-hover:text-gold-300 shrink-0" aria-hidden="true" />
                  sales@ikfooduganda.com
                </a>
              </li>
              <li>
                <address className="flex items-start gap-3 text-white/55 text-sm not-italic">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" aria-hidden="true" />
                  Kampala, Uganda
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} IK Food Uganda. All rights reserved.
          </p>
          <p className="text-white/20 text-xs italic">
            &ldquo;Agriculture is our wisest pursuit.&rdquo; — Thomas Jefferson
          </p>
        </div>
      </div>
    </footer>
  );
}
