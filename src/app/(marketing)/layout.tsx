import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { AttributionCapture } from "@/components/analytics/attribution-capture";
import { RevealObserver } from "@/components/marketing/reveal-observer";
import { HEADER_NAV } from "@/content/navigation";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header items={HEADER_NAV} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-16 outline-none">
        {children}
      </main>
      <Footer />
      <AttributionCapture />
      <RevealObserver />
    </>
  );
}
