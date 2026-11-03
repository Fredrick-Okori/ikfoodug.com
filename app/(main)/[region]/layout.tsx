import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTranslateSwitcher from "@/components/GoogleTranslateSwitcher";
import RegionBanner from "@/components/RegionBanner";
import { RegionProvider } from "@/components/RegionProvider";
import { regions, regionCodes, regionUrl, isRegion, SITE_URL } from "@/lib/regions";
import { Analytics } from "@vercel/analytics/next";

const GOOGLE_ADS_ID = "AW-18553971208";

export const dynamicParams = false;

export function generateStaticParams() {
  return regionCodes.map((region) => ({ region }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  if (region === "ug" || !isRegion(region)) return {};
  const r = regions[region];
  return {
    title: { default: r.name, template: `%s | ${r.name}` },
    ...(!r.live && { robots: { index: false, follow: false } }),
  };
}

export default async function MainLayout({ children, params }: { children: React.ReactNode; params: Promise<{ region: string }> }) {
  const { region } = await params;
  if (!isRegion(region)) notFound();
  const r = regions[region];

  // The root layout already describes the Ugandan business; other regions add their own location.
  const localBusiness = region !== "ug" && {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${regionUrl(region, "/")}#localbusiness`,
    name: r.name,
    legalName: r.legalName,
    url: regionUrl(region, "/"),
    telephone: r.phone.href.replace("tel:", ""),
    email: r.email,
    image: `${SITE_URL}/og-image.jpg`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: r.address.lines.join(", "),
      addressLocality: r.address.locality,
      addressRegion: r.address.regionName,
      postalCode: r.address.postalCode,
      addressCountry: r.countryCode,
    },
    currenciesAccepted: r.currency,
  };

  return (
    <RegionProvider region={region}>
      {localBusiness && r.live && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      )}
      <Navbar />
      <GoogleTranslateSwitcher />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer region={region} />
      <RegionBanner />
      <Analytics />
      {region === "ug" && (
        <>
          {/* Google Ads tag (gtag.js), Uganda site only */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
          <Script id="google-ads-gtag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
          </Script>
        </>
      )}
    </RegionProvider>
  );
}
