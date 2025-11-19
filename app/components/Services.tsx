import SectionContainer from "./SectionContainer";

export default function Services() {
  const services = [
    {
      title: "USCIS Certified Translations",
      description: "Immigration documents certified for USCIS applications and green card processes."
    },
    {
      title: "Birth & Marriage Certificates",
      description: "Official vital records translated and certified for legal and immigration use."
    },
    {
      title: "Academic Transcripts & Diplomas",
      description: "Educational documents certified for university admissions and credential evaluations."
    },
    {
      title: "Legal & Court Documents",
      description: "Contracts, affidavits, court orders, and other legal documents with certified translations."
    },
    {
      title: "Medical Records",
      description: "Patient records, prescriptions, and medical reports translated with accuracy and confidentiality."
    },
    {
      title: "Business & Employment Documents",
      description: "HR documents, contracts, and business correspondence certified for official use."
    }
  ];

  return (
    <SectionContainer background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Certified translation services for real-world documents
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-primary mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
