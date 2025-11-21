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
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <Button href="/order/certified" variant="primary">Start Your Order</Button>
        </section>
      </div>
    </SEOPageLayout>
  );
}
