import type { Metadata } from "next";
import SEOPageLayout from "../components/SEOPageLayout";
import Button from "../components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spanish to English Certified Translation – $29/Page | CertifiedTranslatorPros",
  description: "Expert Spanish to English certified translations for USCIS, courts, and universities. Flat $29/page, human translators, 24–48 hour delivery.",
};

export default function SpanishToEnglishPage() {
  return (
    <SEOPageLayout>
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Spanish to English Certified Translation – $29/Page
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Expert Spanish→English certified translations by native-level translators. USCIS-ready, court-ready, and accepted everywhere.
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
          <h2 className="text-3xl font-bold text-primary mb-6">Spanish→English: The Most Common USCIS Request</h2>
          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">
              Spanish is the most common language for certified translation requests in the United States. Whether you're
              applying for a green card, citizenship, or family visa, we translate Spanish civil documents, academic records,
              and legal papers with expert precision.
            </p>
            <p>
              Our translators are native-level English speakers with expertise in Spanish from all regions—Mexico, Central
              America, South America, Spain, and the Caribbean. We understand regional variations, legal terminology,
              and official document formats.
            </p>
          </div>
        </section>

        <section className="mb-16 bg-background p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-6">Common Spanish Documents We Translate</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Civil Registry Documents</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Birth certificates (Acta de Nacimiento)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Marriage certificates (Acta de Matrimonio)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Divorce decrees (Sentencia de Divorcio)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Death certificates (Acta de Defunción)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Academic Documents</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Diplomas (Título/Diploma)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Transcripts (Certificado de Estudios)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Degree certificates (Cédula Profesional)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>School records (Boletas de Calificaciones)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Legal & Immigration</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Police clearance (Carta de No Antecedentes Penales)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Power of attorney (Poder Notarial)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Court documents (Documentos Judiciales)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Adoption papers (Documentos de Adopción)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent mb-4">Other Documents</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Medical records (Historiales Médicos)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Employment letters (Cartas Laborales)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Bank statements (Estados de Cuenta)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span><span>Business contracts (Contratos)</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Why Choose CertifiedTranslatorPros for Spanish→English</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Native-Level English:</strong> All translations are done by translators with native-level English proficiency</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Regional Expertise:</strong> We understand Spanish from all regions—Mexico, Colombia, Argentina, Spain, and beyond</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Legal Terminology:</strong> Expert knowledge of Latin American civil registry systems and legal documents</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>USCIS Standards:</strong> We follow all USCIS requirements for certified translations</span></li>
              <li className="flex items-start gap-3"><span className="text-accent text-xl">✓</span><span><strong>Acceptance Guarantee:</strong> If rejected due to translation error, we fix or refund</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">How Our Process Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Upload Your Spanish Document</h3>
                  <p className="text-gray-600">Photo, scan, or PDF—all formats accepted</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant Pricing</h3>
                  <p className="text-gray-600">See your flat $29/page price instantly</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Translation</h3>
                  <p className="text-gray-600">Native-level translator prepares your document</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Receive Certified PDF</h3>
                  <p className="text-gray-600">USCIS-ready certified translation</p>
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
            Spanish Documents We Translate
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Mexican documents:</strong> Actas, Certificados, legal papers from Mexico</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Central American:</strong> Documents from Guatemala, El Salvador, Honduras</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>South American:</strong> Colombian, Venezuelan, Peruvian, Argentine documents</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Caribbean:</strong> Dominican, Puerto Rican, Cuban documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>Spanish from Spain:</strong> European Spanish civil and legal documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">→</span>
                <span><strong>All document types:</strong> Birth, marriage, diplomas, transcripts, contracts</span>
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
                "Translated my Mexican documents for I-485. USCIS accepted everything without questions. Fast and professional service."
              </p>
              <p className="text-sm text-gray-600">— Green card application</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "Needed Colombian birth and marriage certificates for spousal visa. Both translations were perfect, approved quickly."
              </p>
              <p className="text-sm text-gray-600">— Family visa</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-gray-700 mb-4 italic">
                "Spanish university diploma translated for job in US. Employer accepted it immediately, professional presentation."
              </p>
              <p className="text-sm text-gray-600">— Employment verification</p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-background p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Pricing & Turnaround</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Flat Rate Pricing</h3>
              <div className="text-5xl font-bold text-accent mb-2">$29</div>
              <div className="text-gray-600 mb-6">per page (up to 250 words)</div>
              <ul className="text-left space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>No per-word pricing</span></li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>No hidden fees</span></li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span><span>Includes certification</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Delivery Times</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-background p-3 rounded">
                  <span className="font-medium">1–2 pages</span>
                  <span className="text-accent font-bold">24–48 hours</span>
                </div>
                <div className="flex items-center justify-between bg-background p-3 rounded">
                  <span className="font-medium">3–10 pages</span>
                  <span className="text-accent font-bold">3–5 days</span>
                </div>
                <div className="flex items-center justify-between bg-background p-3 rounded">
                  <span className="font-medium">10+ pages</span>
                  <span className="text-accent font-bold">Custom quote</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Are your Spanish→English translations accepted by USCIS?</h3>
              <p className="text-gray-700">
                Yes. Our certified Spanish to English translations meet all USCIS requirements and are accepted for
                all immigration applications including green cards, citizenship, and visas.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Do you handle regional Spanish variations?</h3>
              <p className="text-gray-700">
                Yes. We have expertise in Spanish from all regions—Mexico, Central America, South America, Spain,
                and the Caribbean. We understand regional terminology and document formats.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Can you translate handwritten Spanish documents?</h3>
              <p className="text-gray-700">
                Yes. Many Latin American civil registry documents are handwritten. Our translators are experienced
                in reading and translating handwritten Spanish documents.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Do you translate Mexican birth certificates?</h3>
              <p className="text-gray-700">
                Yes. Mexican birth certificates (Acta de Nacimiento) are one of our most common requests. We're
                familiar with all Mexican state registry formats and requirements.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">What about Colombian, Venezuelan, or other Latin American documents?</h3>
              <p className="text-gray-700">
                We translate documents from all Spanish-speaking countries including Colombia, Venezuela, Peru, Ecuador,
                Guatemala, El Salvador, Honduras, Argentina, Chile, and more.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Related Document Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/birth-certificate-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Birth Certificates →</h3>
            </Link>
            <Link href="/marriage-certificate-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Marriage Certificates →</h3>
            </Link>
            <Link href="/diploma-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Diplomas →</h3>
            </Link>
            <Link href="/academic-transcript-translation" className="bg-background p-4 rounded-lg hover:shadow-lg transition text-center group">
              <h3 className="font-semibold text-primary group-hover:text-accent">Transcripts →</h3>
            </Link>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Order Your Spanish→English Translation</h2>
          <p className="text-xl mb-8">Expert translations by native-level English translators. Fast, certified, and accepted everywhere.</p>
          <Button href="/order/certified" variant="primary">Upload & Get Pricing Instantly</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
