import Link from "next/link";
import Button from "./Button";

interface SEOPageLayoutProps {
  children: React.ReactNode;
}

export default function SEOPageLayout({ children }: SEOPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="bg-primary text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-accent transition">
            CertifiedTranslatorPros
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/uscis-certified-translation" className="hover:text-accent transition">
              USCIS
            </Link>
            <Link href="/certified-translation-services" className="hover:text-accent transition">
              Services
            </Link>
            <Link href="/order/certified" className="hover:text-accent transition font-semibold">
              Order Now
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CertifiedTranslatorPros</h3>
              <p className="text-sm text-white/80">
                USCIS-ready certified translations by human translators. Fast, reliable, and secure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/" className="hover:text-accent transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/uscis-certified-translation" className="hover:text-accent transition">
                    USCIS Certified Translation
                  </Link>
                </li>
                <li>
                  <Link href="/certified-translation-services" className="hover:text-accent transition">
                    Certified Translation Services
                  </Link>
                </li>
                <li>
                  <Link href="/order/certified" className="hover:text-accent transition">
                    Order Now
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Document Types</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/birth-certificate-translation" className="hover:text-accent transition">
                    Birth Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/marriage-certificate-translation" className="hover:text-accent transition">
                    Marriage Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/diploma-translation" className="hover:text-accent transition">
                    Diplomas
                  </Link>
                </li>
                <li>
                  <Link href="/academic-transcript-translation" className="hover:text-accent transition">
                    Academic Transcripts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
            © {new Date().getFullYear()} CertifiedTranslatorPros. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
