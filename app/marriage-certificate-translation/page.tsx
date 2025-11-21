import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marriage Certificate Translation for USCIS – $29/Page | CertifiedTranslatorPros",
  description: "USCIS-certified marriage certificate translation for visa applications. Flat $29/page, 24–48 hour delivery, acceptance guarantee.",
};

export default function MarriageCertificateTranslationPage() {
  return (
    <SEOPageLayout>
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Marriage Certificate Translation – USCIS Certified, $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Get your marriage certificate translated and certified for USCIS in 24–48 hours. Required for spousal visas, green cards, and family petitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/order/certified" variant="primary">Start Your Order</Button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">When You Need a Marriage Certificate Translation</h2>
          <div className="prose prose-lg text-gray-700">
            <p>Marriage certificates are essential for spousal visa applications, green card petitions, and family reunification cases.</p>
            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>K-1 Fiancé(e) Visa:</strong> Proof of relationship intent</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>CR-1/IR-1 Spousal Visa:</strong> Marriage-based immigration</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>I-130 Family Petition:</strong> Sponsoring your spouse</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Adjustment of Status:</strong> Green card application</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Name Changes:</strong> After marriage for immigration</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-16 bg-background p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-6">Why Certified Translation Matters</h2>
          <p className="text-gray-700 mb-4">Marriage-based visa cases have high scrutiny. USCIS requires certified translations of all foreign marriage certificates. Using an uncertified translation or DIY approach can delay your case by months.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-red-500 text-xl">✗</span><span>You cannot translate your own marriage certificate</span></li>
            <li className="flex items-start gap-3"><span className="text-red-500 text-xl">✗</span><span>Notaries are not certified translators</span></li>
            <li className="flex items-start gap-3"><span className="text-red-500 text-xl">✗</span><span>Google Translate is explicitly rejected by USCIS</span></li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Pricing and Turnaround</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-accent rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-accent mb-2">$29</div>
              <div className="text-gray-600 mb-6">per page (up to 250 words)</div>
              <ul className="text-left space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Includes certification</span></li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>No hidden fees</span></li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Acceptance guarantee</span></li>
              </ul>
            </div>
            <div className="bg-background rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Delivery</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded"><span className="font-bold text-accent">24–48 hours</span> for standard certificates</div>
                <div className="bg-white p-4 rounded"><span className="font-bold text-accent">3–5 days</span> for multiple documents</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Is this accepted for K-1 and CR-1 visas?</h3>
              <p className="text-gray-700">Yes. Our certified translations are accepted by USCIS for all marriage-based visa applications including K-1, CR-1, IR-1, and I-130 petitions.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Do I need notarization for USCIS?</h3>
              <p className="text-gray-700">No, USCIS does not require notarization of translations. However, we offer optional notarization for court or other purposes.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">What if my certificate has stamps or seals?</h3>
              <p className="text-gray-700">We translate all text including stamps, seals, and government markings. Visual elements are described in the translation.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/birth-certificate-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Birth Certificate Translation →</h3>
            </Link>
            <Link href="/uscis-certified-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">USCIS Certified Translation →</h3>
            </Link>
            <Link href="/spanish-to-english-certified-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Spanish to English →</h3>
            </Link>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">Order your USCIS-ready marriage certificate translation now.</p>
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
