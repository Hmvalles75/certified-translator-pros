import SectionContainer from "./SectionContainer";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The translation was perfect and arrived faster than expected. USCIS accepted my documents without any issues. Highly recommend!",
      name: "Maria Rodriguez",
      role: "Green card applicant",
      documents: "Birth & marriage certificates"
    },
    {
      quote: "As a law firm, we need accurate translations we can trust. CertifiedTranslatorPros delivers every time with professional quality.",
      name: "David Chen",
      role: "Immigration attorney",
      documents: "Court & USCIS filings"
    },
    {
      quote: "Super fast turnaround and the pricing was straightforward—no hidden fees or word count confusion. Got my diploma translated in 2 days.",
      name: "Sarah Johnson",
      role: "Graduate student",
      documents: "Diploma & transcripts"
    }
  ];

  return (
    <SectionContainer background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Real results from immigration applicants and attorneys
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
              <p className="text-xs text-gray-500 mt-1">
                {testimonial.documents}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
