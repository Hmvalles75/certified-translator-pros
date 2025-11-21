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
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Trusted by 1,200+ applicants in 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-2">4.9/5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">100% USCIS Acceptance Guarantee</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/order/certified" variant="primary">Start Your Order (Takes 2 Minutes)</Button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-center">What's Included in Your $29/Page</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>USCIS-compliant certification statement</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Professional formatting</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Digital delivery in 24–48 hours</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Free revisions (14 days)</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <a
            href="/sample-certified-translation.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Sample Translation (PDF)
          </a>
          <p className="text-sm text-white/80 mt-2">See what your certified translation will look like</p>
        </div>

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
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">How Our Process Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Certificate</h3>
                  <p className="text-gray-600">Photo from your phone, scan, or PDF—we accept all formats</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant Pricing</h3>
                  <p className="text-gray-600">See your flat $29/page price—no surprises, no hidden fees</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Translation</h3>
                  <p className="text-gray-600">Vetted translator prepares and certifies your translation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Receive Certified PDF</h3>
                  <p className="text-gray-600">Download your USCIS-ready translation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-6">Quick Answers</h3>
          <div className="space-y-4">
            <details className="bg-background p-6 rounded-lg cursor-pointer">
              <summary className="font-semibold text-lg text-primary">Do you accept photos from my phone?</summary>
              <p className="mt-3 text-gray-700">Yes! As long as the photo is clear and all text is readable, we can work with it. We accept photos, scans, and PDFs.</p>
            </details>
            <details className="bg-background p-6 rounded-lg cursor-pointer">
              <summary className="font-semibold text-lg text-primary">Does USCIS accept your translations?</summary>
              <p className="mt-3 text-gray-700">Yes. Our certified translations meet all USCIS, IRCC, court, and university requirements. We back this with our 100% acceptance guarantee.</p>
            </details>
            <details className="bg-background p-6 rounded-lg cursor-pointer">
              <summary className="font-semibold text-lg text-primary">How fast can I get it?</summary>
              <p className="mt-3 text-gray-700">Most translations are completed within 24-48 hours. Rush service available for urgent deadlines.</p>
            </details>
          </div>
        </section>

        <section className="mb-16 bg-white border-2 border-gray-200 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            We Translate All Marriage Certificates
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Spanish:</strong> Mexico, Colombia, Peru, Spain, Venezuela, etc.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Chinese:</strong> PRC formats, Taiwan formats, Hong Kong formats</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Arabic:</strong> Saudi Arabia, Egypt, Jordan, Lebanon, UAE formats</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>European:</strong> Italian, French, German, Polish, Russian formats</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Asian:</strong> Korean, Japanese, Hindi, Vietnamese, Tagalog formats</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>100+ more languages</strong> from every country worldwide</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Real Customer Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "Carlos needed his Mexican marriage certificate for his K-1 visa. Fast turnaround and accepted by the embassy without questions."
              </p>
              <p className="text-sm text-gray-600">— K-1 fiancé visa</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "Sofia's Italian marriage certificate was translated perfectly for her I-130 petition. USCIS approved without any RFEs."
              </p>
              <p className="text-sm text-gray-600">— Spousal sponsorship</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "We needed our Philippine marriage certificate for adjustment of status. Professional translation made the process smooth."
              </p>
              <p className="text-sm text-gray-600">— Green card application</p>
            </div>
          </div>
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
          <Button href="/order/certified" variant="primary">Upload & Get Pricing Instantly</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
