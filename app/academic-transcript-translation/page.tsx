import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Academic Transcript Translation – USCIS Certified, $29/Page | CertifiedTranslatorPros",
  description: "Certified academic transcript translation for universities and USCIS. Flat $29/page, 24–48 hour delivery, acceptance guarantee.",
};

export default function AcademicTranscriptTranslationPage() {
  return (
    <SEOPageLayout>
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Academic Transcript Translation – USCIS Certified, $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Get your academic transcripts translated and certified for university admissions, credential evaluation, and immigration applications.
          </p>
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">When You Need Transcript Translation</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>University Admissions:</strong> Graduate school, undergraduate transfer applications</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Credential Evaluation:</strong> WES, ECE, NACES evaluation services</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Immigration Applications:</strong> Student visas, work visas, green cards</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Professional Licensing:</strong> State boards, certification agencies</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Employment Verification:</strong> Academic background checks</span></li>
          </ul>
        </section>

        <section className="mb-16 bg-background p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-6">Why Accuracy Matters for Transcripts</h2>
          <p className="text-gray-700 mb-4">Academic transcripts contain complex information including course titles, grading systems, credit hours, and GPA calculations. Universities and evaluation services require precise translations that preserve academic integrity.</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Accurate course titles and descriptions</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Proper grading scale conversion explanations</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Credit hours and semester systems clearly translated</span></li>
            <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span>Academic honors and distinctions preserved</span></li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Transcripts</h3>
                  <p className="text-gray-600">Photo, scan, or PDF—we accept all formats</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant Quote</h3>
                  <p className="text-gray-600">$29/page flat rate</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Translation</h3>
                  <p className="text-gray-600">Academic specialist translates your transcripts</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Receive Certified Translation</h3>
                  <p className="text-gray-600">Signed PDF ready for submission</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Pricing</h2>
          <div className="bg-white border-2 border-accent rounded-lg p-8 max-w-md mx-auto text-center">
            <div className="text-5xl font-bold text-accent mb-2">$29</div>
            <div className="text-gray-600 mb-6">per page (up to 250 words)</div>
            <ul className="text-left space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Multi-page transcripts: same flat rate</span></li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Includes certification statement</span></li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>24–48 hour delivery (1–5 pages)</span></li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Acceptance guarantee</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">FAQ</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Are your translations accepted by WES and other evaluation services?</h3>
              <p className="text-gray-700">Yes. Our certified translations meet the requirements of WES, ECE, IERF, and all major NACES member evaluation services.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Do you translate grading scales and credit systems?</h3>
              <p className="text-gray-700">Yes. We translate all elements of your transcript including grading scales, credit hours, and GPA systems. We note when direct equivalents don't exist.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">How long does it take for multi-page transcripts?</h3>
              <p className="text-gray-700">1–5 pages: 24–48 hours. 6–15 pages: 3–5 business days. Larger documents: contact us for a custom quote and timeline.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/diploma-translation" className="bg-background p-6 rounded-lg hover:shadow-lg transition group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Diploma Translation →</h3>
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
          <h2 className="text-3xl font-bold mb-4">Order Your Transcript Translation</h2>
          <p className="text-xl mb-8">Fast, accurate, and accepted by universities worldwide.</p>
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
