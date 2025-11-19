import Link from "next/link";
import SectionContainer from "./SectionContainer";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload your documents",
      description: "Securely upload your birth certificate, diploma, marriage certificate, or any document needing certification."
    },
    {
      number: "2",
      title: "Get instant pricing",
      description: "See transparent pricing immediately. $29 per page for certified translations. Pay securely with Stripe."
    },
    {
      number: "3",
      title: "Vetted translator assigned",
      description: "A certified human translator (no AI) is matched to your document type and language pair."
    },
    {
      number: "4",
      title: "Download your certified translation",
      description: "Receive your USCIS-ready translation with official certification in 24–48 hours. Guaranteed acceptance."
    }
  ];

  return (
    <SectionContainer background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          How CertifiedTranslatorPros works
        </h2>
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
