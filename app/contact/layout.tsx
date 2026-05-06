import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IK Food Uganda | Order Vanilla & Organic Products",
  description:
    "Get in touch with IK Food Uganda — one of the top vanilla companies in Uganda. Place orders for premium organic vanilla beans, coffee, cocoa, avocado and garden eggs for export to your country.",
  keywords: [
    "contact vanilla supplier Uganda",
    "order vanilla beans Uganda",
    "buy organic vanilla Uganda",
    "IK Food Uganda contact",
    "vanilla export enquiry Uganda",
  ],
  openGraph: {
    title: "Contact IK Food Uganda | Order Vanilla & Organic Products",
    description: "Place an order or enquire about premium organic vanilla and agricultural products from Uganda.",
    url: "https://ikfoodug.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
