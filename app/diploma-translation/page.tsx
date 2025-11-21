import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diploma Translation – USCIS Certified, $29/Page | CertifiedTranslatorPros",
  description: "Certified diploma translation for USCIS, universities, and employers. Flat $29/page, 24–48 hour delivery, acceptance guarantee.",
};

export default function DiplomaTranslationPage() {
  return (
    <SEOPageLayout>
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Diploma Translation – USCIS Certified, $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Get your diploma translated and certified for USCIS, universities, or employers in 24–48 hours.
          </p>
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">When You Need a Diploma Translation</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>University Admissions:</strong> Graduate school, undergraduate transfer</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Employment Verification:</strong> HR departments, professional licensing</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Immigration Applications:</strong> Work visas (H-1B, O-1), green cards</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Professional Credentials:</strong> State licensing boards, certification agencies</span></li>
          </ul>
        </section>

        <section className="mb-16 bg-background p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-6">Why Professional Translation Matters</h2>
          <p className="text-gray-700 mb-4">Diplomas contain specialized terminology, institutional details, and degree classifications that require expert translation. Universities and employers expect accurate, professional translations that preserve the meaning and credentials.</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Accurate degree titles and classifications</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Proper translation of honors, distinctions, and academic awards</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Institutional seals and stamps described</span></li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Pricing & Delivery</h2>
          <div className="bg-white border-2 border-accent rounded-lg p-8 max-w-md mx-auto text-center">
            <div className="text-5xl font-bold text-accent mb-2">$29</div>
            <div className="text-gray-600 mb-6">per page</div>
            <ul className="text-left space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>24–48 hour delivery</span></li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Includes certification</span></li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Acceptance guarantee</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">FAQ</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Are diploma translations accepted by universities?</h3>
              <p className="text-gray-700">Yes. Our certified translations are accepted by universities, colleges, and evaluation services like WES, ECE, and NACES members.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Do I need to translate my transcripts too?</h3>
              <p className="text-gray-700">Often yes. Universities typically require both diploma and transcript translations. We can translate both documents together.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/academic-transcript-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Academic Transcript Translation →</h3>
            </Link>
            <Link href="/uscis-certified-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">USCIS Certified Translation →</h3>
            </Link>
            <Link href="/certified-translation-services" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">All Services →</h3>
            </Link>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Order Your Diploma Translation</h2>
          <p className="text-xl mb-8">Fast, certified, and accepted everywhere.</p>
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
