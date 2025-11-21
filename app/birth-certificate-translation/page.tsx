import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Birth Certificate Translation for USCIS – $29/Page | CertifiedTranslatorPros",
  description: "USCIS-ready certified birth certificate translation. Flat $29/page, 24–48 hour delivery, human translators, acceptance guarantee.",
};

export default function BirthCertificateTranslationPage() {
  return (
    <SEOPageLayout>
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Birth Certificate Translation – USCIS Certified, $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Get your birth certificate translated and certified for USCIS in 24–48 hours. Accepted for
            green cards, citizenship, and all immigration applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/order/certified" variant="primary">Start Your Order</Button>
            <Button href="mailto:support@certifiedtranslatorpros.com" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">Contact Support</Button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            When You Need a Birth Certificate Translation
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Birth certificates are one of the most commonly required documents for U.S. immigration. If your birth
              certificate is in any language other than English, USCIS requires a certified translation.
            </p>
            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Green Card Applications (I-485):</strong> Proof of identity and age</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Citizenship Applications (N-400):</strong> Required supporting document</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Marriage-Based Visas (K-1, CR-1):</strong> Essential for proving relationship timelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Family Sponsorship (I-130):</strong> Establishing family relationships</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Work Visas & Student Visas:</strong> Identity verification</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 bg-background p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Why DIY or Local Notaries Aren't Enough
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Many people attempt to save money by translating their own birth certificate or asking a bilingual
              friend. <strong>This is a costly mistake.</strong>
            </p>
            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">✗</span>
                <span><strong>You can't translate your own documents:</strong> USCIS explicitly prohibits applicants from translating their own documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">✗</span>
                <span><strong>Notaries aren't translators:</strong> A notary seal doesn't make a translation certified—it must be done by a competent translator</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">✗</span>
                <span><strong>Google Translate is rejected:</strong> Machine translations are not accepted by USCIS</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">✗</span>
                <span><strong>Formatting matters:</strong> USCIS expects proper formatting and professional presentation</span>
              </li>
            </ul>
            <p className="mt-4">
              Using an uncertified or improperly certified translation can result in your application being rejected,
              costing you months of delays and additional fees.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            How Our Process Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Birth Certificate</h3>
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
                  <p className="text-gray-600">Download your USCIS-ready translation (optional notarization available)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Pricing and Turnaround
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-accent rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">Pricing</h3>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-accent mb-2">$29</div>
                <div className="text-gray-600">per page (up to 250 words)</div>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Includes certification statement</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>No hidden fees or word counts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Free corrections (14 days)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Acceptance guarantee</span>
                </li>
              </ul>
            </div>
            <div className="bg-background rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Turnaround Time</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded">
                  <span className="font-medium">Standard birth certificate</span>
                  <span className="text-accent font-bold">24–48 hours</span>
                </div>
                <div className="flex items-center justify-between bg-white p-4 rounded">
                  <span className="font-medium">Multiple pages</span>
                  <span className="text-accent font-bold">3–5 days</span>
                </div>
                <div className="flex items-center justify-between bg-white p-4 rounded">
                  <span className="font-medium">Rush service</span>
                  <span className="text-accent font-bold">Contact us</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-background p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            What's Included in Your Birth Certificate Translation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Complete Translation:</strong> All fields translated into English</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Certification Statement:</strong> Signed declaration of accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Translator Information:</strong> Name and contact details included</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Professional Formatting:</strong> Clean, readable layout</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Digital Signature:</strong> Electronically signed PDF</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span><strong>Optional Notarization:</strong> Available for courts/schools</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Common Use Cases for Birth Certificate Translations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent mb-3">Immigration</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Green card applications</li>
                <li>• Citizenship (naturalization)</li>
                <li>• Marriage-based visas</li>
                <li>• Family sponsorship</li>
                <li>• Work and student visas</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent mb-3">Other Purposes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Passport applications</li>
                <li>• School enrollment</li>
                <li>• Employment verification</li>
                <li>• Name change proceedings</li>
                <li>• Adoption proceedings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Does USCIS accept birth certificate translations from CertifiedTranslatorPros?
              </h3>
              <p className="text-gray-700">
                Yes. Our certified translations meet all USCIS requirements and are accepted for all immigration
                applications. We back this with our acceptance guarantee.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Do I need to submit the original birth certificate too?
              </h3>
              <p className="text-gray-700">
                Yes. USCIS requires both the original document (or a certified copy) and the certified translation.
                They must be submitted together.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                What if my birth certificate has stamps or seals?
              </h3>
              <p className="text-gray-700">
                Our translators translate all text on the document, including stamps, seals, and marginal notes.
                We describe any visual elements (seals, watermarks) in the translation.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Can I use a photo from my phone?
              </h3>
              <p className="text-gray-700">
                Yes! As long as the photo is clear and all text is readable, we can work with it. We accept
                photos, scans, and PDFs.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                What languages do you translate from?
              </h3>
              <p className="text-gray-700">
                We translate birth certificates from 100+ languages, including Spanish, French, Mandarin, Arabic,
                Russian, Portuguese, German, Italian, Japanese, Korean, and many more.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Is my information kept confidential?
              </h3>
              <p className="text-gray-700">
                Absolutely. All documents are encrypted and stored securely. Translators sign confidentiality
                agreements, and we never share your information with third parties.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            Related Translation Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/marriage-certificate-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">Marriage Certificate Translation →</h3>
              <p className="text-gray-600">For marriage-based visa applications</p>
            </Link>
            <Link href="/uscis-certified-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">USCIS Certified Translation →</h3>
              <p className="text-gray-600">All USCIS translation requirements</p>
            </Link>
            <Link href="/spanish-to-english-certified-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent">Spanish to English Translation →</h3>
              <p className="text-gray-600">Expert Spanish→English certified translations</p>
            </Link>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Your Birth Certificate Translated?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Order now and receive your USCIS-ready certified translation in 24–48 hours.
          </p>
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
