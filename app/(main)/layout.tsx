import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTranslateSwitcher from "@/components/GoogleTranslateSwitcher";
import { Analytics } from "@vercel/analytics/next";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <GoogleTranslateSwitcher />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
