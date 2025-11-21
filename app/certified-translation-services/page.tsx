import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certified Translation Services – $29/Page | CertifiedTranslatorPros",
  description: "Professional certified translation services for courts, schools, employers, and banks. Flat $29/page, human translators, 24–48 hour delivery.",
};

export default function CertifiedTranslationServicesPage() {
  return (
    <SEOPageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Certified Translation Services – $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Professional certified translations for USCIS, courts, universities, employers, and more.
            Fast, accurate, and accepted everywhere.
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
        {/* What is Certified Translation */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            What is a Certified Translation?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              A certified translation is a translated document accompanied by a signed statement from the translator
              certifying that the translation is accurate and complete. This certification is recognized by government
              agencies, courts, schools, and businesses worldwide.
            </p>
            <p>
              Unlike regular translations, certified translations carry legal weight and are required for official purposes
              such as immigration applications, court proceedings, university admissions, and employment verification.
            </p>
          </div>
        </section>

        {/* Where You Need Certified Translations */}
        <section className="mb-16 bg-background p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Where You Need Certified Translations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Government & Immigration</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>USCIS (Green Card, Citizenship, Visas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>State Department (Passport applications)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Immigration Court proceedings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>DMV (Driver's license applications)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Courts & Legal</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Court proceedings and evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Legal contracts and agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Adoption documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Power of attorney documents</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Education</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>University admissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Academic transcripts and diplomas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Professional certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Student visa applications</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Business & Employment</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Employment verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>HR and background checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Business contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Financial documents for banks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            How Our Process Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Document</h3>
                  <p className="text-gray-600">Submit your document online (photo, scan, or PDF)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant Quote</h3>
                  <p className="text-gray-600">See your flat $29/page price and pay securely online</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Translation</h3>
                  <p className="text-gray-600">Vetted human translator prepares and certifies your document</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Receive Certified Translation</h3>
                  <p className="text-gray-600">Get your signed PDF (optional notarization available)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            Simple, Transparent Pricing
          </h2>
          <div className="bg-white border-2 border-accent rounded-lg p-8 shadow-lg max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-accent mb-2">$29</div>
              <div className="text-gray-600">per page (up to 250 words)</div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>No hidden fees</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Includes certification</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Free corrections (14 days)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Acceptance guarantee</span>
              </li>
            </ul>
            <div className="text-center mt-6">
              <Button href="/order/certified">Get Started</Button>
            </div>
          </div>
        </section>

        {/* Turnaround */}
        <section className="mb-16 bg-background p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            Fast Turnaround Times
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg text-center shadow">
              <div className="text-2xl font-bold text-accent mb-2">24–48 Hours</div>
              <div className="text-gray-600">1–2 pages</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow">
              <div className="text-2xl font-bold text-accent mb-2">3–5 Days</div>
              <div className="text-gray-600">3–10 pages</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow">
              <div className="text-2xl font-bold text-accent mb-2">Custom</div>
              <div className="text-gray-600">10+ pages</div>
            </div>
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
                What makes a translation "certified"?
              </h3>
              <p className="text-gray-700">
                A certified translation includes a signed statement from the translator certifying that the translation
                is accurate and complete. The translator must be competent in both languages.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Is notarization required?
              </h3>
              <p className="text-gray-700">
                It depends on where you're submitting. USCIS does not require notarization, but courts and some
                schools may. We offer optional notarization for all translations.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                What documents can you translate?
              </h3>
              <p className="text-gray-700">
                We translate all types of documents: birth certificates, marriage certificates, diplomas, transcripts,
                legal contracts, medical records, business documents, and more.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Do you work with all languages?
              </h3>
              <p className="text-gray-700">
                Yes. We have vetted translators for 100+ language pairs, including Spanish, French, Mandarin,
                Arabic, Russian, Portuguese, German, and many more.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Are your translations accepted by courts and universities?
              </h3>
              <p className="text-gray-700">
                Yes. Our certified translations are accepted by USCIS, state and federal courts, universities,
                employers, and government agencies. We back this with our acceptance guarantee.
              </p>
            </div>
          </div>
        </section>

        {/* Document Types */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            Popular Document Types
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/birth-certificate-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Birth Certificates</h3>
            </Link>
            <Link href="/marriage-certificate-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Marriage Certificates</h3>
            </Link>
            <Link href="/diploma-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Diplomas</h3>
            </Link>
            <Link href="/academic-transcript-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Academic Transcripts</h3>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Certified Translation Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Professional, fast, and accepted everywhere. Order in under 5 minutes.
          </p>
          <Button href="/order/certified" variant="primary">
            Start Your Order
          </Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
