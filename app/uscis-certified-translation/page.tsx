import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "USCIS Certified Translation – $29/Page | CertifiedTranslatorPros",
  description: "Flat $29/page USCIS certified translations with 24–48 hour delivery. Human translators only, acceptance guarantee, secure online ordering.",
};

export default function USCISCertifiedTranslationPage() {
  return (
    <SEOPageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            USCIS Certified Translation – Flat $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Get USCIS-ready certified translations delivered in 24–48 hours by vetted human translators.
            No hidden fees, no per-word pricing—just straightforward, professional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/order/certified" variant="primary">
              Start Your Order
            </Button>
            <Button href="mailto:support@certifiedtranslatorpros.com" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why You Need Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Why You Need a USCIS Certified Translation
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              USCIS requires that any document not in English be accompanied by a certified translation.
              This isn't just a formality—your immigration application can be delayed or rejected if
              your translations don't meet USCIS standards.
            </p>
            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Avoid Rejections:</strong> DIY or uncertified translations will be rejected by USCIS</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Prevent Delays:</strong> Incorrect translations can delay your case by months</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>No Google Translate:</strong> Machine translations are explicitly not accepted</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Professional Standard:</strong> USCIS expects accuracy, formatting, and proper certification</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 bg-background p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            How CertifiedTranslatorPros Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Document</h3>
                  <p className="text-gray-600">Photo, scan, or PDF—we accept all formats</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">See Your Flat Price</h3>
                  <p className="text-gray-600">$29/page (up to 250 words), no surprises</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">We Translate & Certify</h3>
                  <p className="text-gray-600">Vetted human translator prepares your document</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Receive Signed PDF</h3>
                  <p className="text-gray-600">Optional notarization and hard copy available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button href="/order/certified">Get Started Now</Button>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Transparent Pricing
          </h2>
          <div className="bg-white border-2 border-accent rounded-lg p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-accent mb-2">$29</div>
              <div className="text-gray-600">per page (up to 250 words)</div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>No hidden fees or per-word charges</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Includes certification statement and signature</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Free corrections for 14 days (names, dates, typos)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Acceptance guarantee—we fix or refund if rejected</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Turnaround Time */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Turnaround Time
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-accent mb-2">24–48 Hours</div>
              <div className="text-gray-600">1–2 pages</div>
            </div>
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-accent mb-2">3–5 Days</div>
              <div className="text-gray-600">3–10 pages</div>
            </div>
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-accent mb-2">Custom Quote</div>
              <div className="text-gray-600">10+ pages</div>
            </div>
          </div>
        </section>

        {/* What You Receive */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            What You Receive
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Certified PDF:</strong> Digitally signed and ready to submit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Certification Statement:</strong> Signed declaration of accuracy by the translator</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Complete Translation:</strong> All relevant fields translated into English</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Formatted Document:</strong> Professional layout matching USCIS requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Optional Notarization:</strong> Add notarization for court or other requirements</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="mb-16 bg-background p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Common USCIS Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Green Card Applications (I-485)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Citizenship Applications (N-400)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Marriage-Based Visas (I-130, CR-1, K-1)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Work Visas (H-1B, L-1, O-1)</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Family-Sponsored Visas (I-130)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Adjustment of Status</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Consular Processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <span>Asylum Applications</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                What is a USCIS certified translation?
              </h3>
              <p className="text-gray-700">
                A USCIS certified translation is a translation accompanied by a signed statement from the translator
                certifying that the translation is accurate and complete. The translator must be competent in both
                languages and cannot be the applicant.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Do I need to notarize my translation for USCIS?
              </h3>
              <p className="text-gray-700">
                No. USCIS does not require notarization of translations—only the certification statement. However,
                notarization may be required for other purposes (courts, schools), and we offer it as an optional service.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                How long does it take?
              </h3>
              <p className="text-gray-700">
                Most 1–2 page documents are completed within 24–48 hours. Larger documents (3–10 pages) take
                3–5 business days. For urgent requests, contact us for rush service availability.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                What if USCIS rejects my translation?
              </h3>
              <p className="text-gray-700">
                If USCIS rejects your translation due to an error on our part, we'll fix it for free or provide a full refund.
                This is our acceptance guarantee.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Can I translate my own documents for USCIS?
              </h3>
              <p className="text-gray-700">
                No. USCIS explicitly states that you cannot translate your own documents if you are the applicant.
                The translation must be done by someone competent in both languages who is not the applicant.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Do you translate from all languages?
              </h3>
              <p className="text-gray-700">
                Yes. We have vetted translators for 100+ language pairs, including Spanish, French, Mandarin, Arabic,
                Russian, Portuguese, and many more. All translations are certified and ready for USCIS submission.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Is my information secure?
              </h3>
              <p className="text-gray-700">
                Absolutely. All documents are encrypted during upload and storage. We never share your information
                with third parties, and translators sign confidentiality agreements.
              </p>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            Related Translation Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/birth-certificate-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">
                Birth Certificate Translation →
              </h3>
              <p className="text-gray-600">USCIS-ready birth certificate translations in 24–48 hours</p>
            </Link>
            <Link href="/marriage-certificate-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">
                Marriage Certificate Translation →
              </h3>
              <p className="text-gray-600">Certified marriage certificate translations for immigration</p>
            </Link>
            <Link href="/spanish-to-english-certified-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">
                Spanish to English Translation →
              </h3>
              <p className="text-gray-600">Expert Spanish→English certified translations</p>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Order your USCIS certified translation in under 5 minutes.
          </p>
          <Button href="/order/certified" variant="primary">
            Start Your Order Now
          </Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
