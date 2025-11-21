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
          <Button href="/order/certified" variant="primary">Start Your Order (Takes 2 Minutes)</Button>
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
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">How Our Process Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Diploma</h3>
                  <p className="text-gray-600">Photo, scan, or PDF—we accept all formats</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant Pricing</h3>
                  <p className="text-gray-600">See your flat $29/page price—no surprises</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Translation</h3>
                  <p className="text-gray-600">Academic specialist translates your diploma</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Receive Certified PDF</h3>
                  <p className="text-gray-600">Download your certified translation</p>
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
            We Translate All Diplomas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Spanish:</strong> Mexican degrees, Colombian titles, Spanish diplomas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Chinese:</strong> Bachelor's, Master's, and PhD certificates from China</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Arabic:</strong> Degrees from Middle Eastern universities</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>European:</strong> Italian Laurea, French Licence, German degrees</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Asian:</strong> Indian degrees, Philippine diplomas, Vietnamese certificates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>All degree levels:</strong> Bachelor's, Master's, PhD, professional degrees</span>
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
                "Needed my Mexican engineering degree translated for a state licensing board. Delivered fast and accepted without issues."
              </p>
              <p className="text-sm text-gray-600">— Professional licensing</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "My Indian MBA was translated for graduate school admissions in the US. Perfect translation, accepted by three universities."
              </p>
              <p className="text-sm text-gray-600">— University admission</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "Submitted my Chinese bachelor's degree translation for H-1B visa. USCIS approved without any questions."
              </p>
              <p className="text-sm text-gray-600">— Work visa application</p>
            </div>
          </div>
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
          <Button href="/order/certified" variant="primary">Upload & Get Pricing Instantly</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
