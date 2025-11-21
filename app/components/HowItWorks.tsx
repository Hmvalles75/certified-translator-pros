import Link from "next/link";
import SectionContainer from "./SectionContainer";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload your documents",
      description: "Photo, scan, or PDF—we accept all formats. Secure upload with bank-level encryption."
    },
    {
      number: "2",
      title: "See your price instantly",
      description: "Flat $29 per page. No surprises, no word counts. Pay securely via Stripe."
    },
    {
      number: "3",
      title: "Human translator gets to work",
      description: "Certified, vetted translator (never AI) prepares and certifies your document."
    },
    {
      number: "4",
      title: "Download your certified PDF",
      description: "USCIS-ready translation with official certification delivered to your email."
    }
  ];

  return (
    <SectionContainer background="gray">
      <div id="how-it-works" className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          How CertifiedTranslatorPros works
        </h2>
        <p className="text-gray-600 text-sm">Takes about 2 minutes to order</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {steps.map((step) => (
          <div key={step.number} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/order" className="text-accent font-semibold hover:underline inline-flex items-center gap-2">
          Start Your Order →
        </Link>
      </div>
    </SectionContainer>
  );
}
