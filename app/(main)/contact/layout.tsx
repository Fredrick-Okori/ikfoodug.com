import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IK Food Uganda | Order Vanilla & Natural Products",
  description:
    "Get in touch with IK Food Uganda — one of the top vanilla companies in Uganda. Place orders for premium natural vanilla beans for export to your country.",
  keywords: [
    "contact vanilla supplier Uganda",
    "order vanilla beans Uganda",
    "buy natural vanilla Uganda",
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "IK Food Uganda contact",
    "vanilla export enquiry Uganda",
  ],
  openGraph: {
    title: "Contact IK Food Uganda | Order Vanilla & Natural Products",
    description: "Place an order or enquire about premium natural vanilla and agricultural products from Uganda.",
    url: "https://ikfoodug.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
