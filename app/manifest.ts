import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IK Food Uganda — #1 Vanilla Company in Uganda",
    short_name: "IK Food Uganda",
    description:
      "Uganda's leading natural vanilla exporter. Premium vanilla beans, exporting to Europe & Asia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1a0f",
    theme_color: "#0a1a0f",
    orientation: "portrait-primary",
    categories: ["food", "agriculture", "business"],
    lang: "en-UG",
    dir: "ltr",
    icons: [
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-32x32.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Our Products", short_name: "Products", description: "Browse premium vanilla products", url: "/products", icons: [{ src: "/favicon-32x32.png", sizes: "32x32" }] },
      { name: "Contact Us", short_name: "Contact", description: "Get in touch with our sales team", url: "/contact", icons: [{ src: "/favicon-32x32.png", sizes: "32x32" }] },
    ],
  };
}
