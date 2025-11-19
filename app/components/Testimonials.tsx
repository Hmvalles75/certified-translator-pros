import SectionContainer from "./SectionContainer";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The translation was perfect and arrived faster than expected. USCIS accepted my documents without any issues. Highly recommend!",
      name: "Maria Rodriguez",
      role: "Immigration Applicant"
    },
    {
      quote: "As a law firm, we need accurate translations we can trust. CertifiedTranslatorPros delivers every time with professional quality.",
      name: "David Chen",
      role: "Immigration Attorney"
    },
    {
      quote: "The local translator option was perfect for us. We met in person, got our documents certified, and had everything we needed in 48 hours.",
      name: "Sarah Johnson",
      role: "Parent & Educator"
    }
  ];

  return (
    <SectionContainer background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          What our clients say
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-accent text-4xl mb-4">"</div>
            <p className="text-gray-700 mb-6 italic">
              {testimonial.quote}
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="font-semibold text-primary">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-600">
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
