import { RegionLink as Link } from "./RegionProvider";
import PlaceOrderButton from "./PlaceOrderButton";
import { regions, type Region, type RegionCode } from "@/lib/regions";

const US_SITE = "https://us.ikfoodug.com";

const columnTitle = "text-lg font-extrabold tracking-[-0.03em] text-cream";
const footerLink = "font-semibold text-parchment/65 transition-colors hover:text-gold-400";

const company = [
  { href: "/about",        label: "About us" },
  { href: "/products",     label: "Products" },
  { href: "/impact",       label: "Impact" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/gallery",      label: "Gallery" },
  { href: "/blog",         label: "Blog" },
  { href: "/contact",      label: "Contact" },
];

const products = [
  { href: "/products#grade-a",        label: "Grade A beans" },
  { href: "/products#grade-b",        label: "Grade B beans" },
  { href: "/products#split-beans",    label: "Split beans" },
  { href: "/products#vanilla-powder", label: "Vanilla powder" },
  { href: "/products#vanilla-paste",  label: "Vanilla paste" },
  { href: "/products#vanilla-caviar", label: "Vanilla caviar" },
];

export default function Footer({ region = "ug" }: { region?: RegionCode }) {
  const r = regions[region];

  return (
    <footer className="overflow-hidden bg-forest-950 text-parchment" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        {/* Call to action */}
        <div className="grid gap-12 border-b border-white/10 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="h-display text-[clamp(2.75rem,6.5vw,5.75rem)] text-cream">
              Source Ugandan vanilla<span className="text-[#dccba0]">.</span>
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-parchment/65">
              Grade A and B beans, splits, powder, paste and caviar, shipped with full export paperwork.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-8 lg:justify-end">
            <PlaceOrderButton variant="gold" label="Place an order" />
            <a href={`mailto:${r.email}`} className="link-line-light break-all">
              {r.email}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 text-base md:grid-cols-4 lg:py-20">
          <div>
            <h2 className={columnTitle}>Company</h2>
            <ul className="mt-5 space-y-3">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLink}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={columnTitle}>Products</h2>
            <ul className="mt-5 space-y-3">
              {products.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLink}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {region === "ug" ? (
            <>
              <Location title={regions.us.name} r={regions.us} showEmail={false} href={US_SITE} />
              <Location title={r.name} r={r} />
            </>
          ) : (
            <>
              <Location title={r.name} r={r} />
              <Location title={regions.ug.name} r={regions.ug} />
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-parchment/50 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} {r.legalName}. Member of HORTIFRESH.</p>
          <p>Kampala, Uganda · Est. 2015</p>
        </div>
      </div>

      {/* Giant wordmark */}
      <p
        data-footer-mark
        aria-hidden
        className="select-none whitespace-nowrap px-3 pb-[0.04em] text-center text-[clamp(4rem,19vw,20rem)] font-extrabold leading-[0.9] tracking-[-0.06em] text-cream"
      >
        IK Food<span className="text-gold-400">.</span>
      </p>
    </footer>
  );
}

function Location({ title, r, showEmail = true, href }: { title: string; r: Region; showEmail?: boolean; href?: string }) {
  return (
    <div>
      <h2 className={columnTitle}>
        {href ? (
          <a href={href} className="transition-colors hover:text-gold-400">
            {title} <span aria-hidden>&#8599;</span>
          </a>
        ) : (
          title
        )}
      </h2>
      <address className="mt-5 space-y-3 not-italic leading-relaxed text-parchment/65">
        <p>
          {r.address.lines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          {r.locationLabel}
        </p>
        <p>
          <a href={r.phone.href} className={footerLink}>{r.phone.display}</a>
        </p>
        {showEmail && (
          <p>
            <a href={`mailto:${r.email}`} className={`${footerLink} break-all`}>{r.email}</a>
          </p>
        )}
      </address>
    </div>
  );
}
