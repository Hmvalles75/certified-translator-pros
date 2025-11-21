import Link from "next/link";

export default function PopularServices() {
  const services = [
    {
      title: "USCIS Certified Translation",
      href: "/uscis-certified-translation",
      description: "USCIS-ready certified translations for all immigration applications",
      icon: "🛂"
    },
    {
      title: "Birth Certificate Translation",
      href: "/birth-certificate-translation",
      description: "Certified birth certificate translations for green cards and citizenship",
      icon: "👶"
    },
    {
      title: "Marriage Certificate Translation",
      href: "/marriage-certificate-translation",
      description: "Certified marriage certificate translations for spousal visas",
      icon: "💍"
    },
    {
      title: "Spanish to English Translation",
      href: "/spanish-to-english-certified-translation",
      description: "Expert Spanish→English certified translations by native speakers",
      icon: "🌐"
    },
    {
      title: "Diploma Translation",
      href: "/diploma-translation",
      description: "Certified diploma translations for universities and employers",
      icon: "🎓"
    },
    {
      title: "Academic Transcript Translation",
      href: "/academic-transcript-translation",
      description: "Certified transcript translations for admissions and credential evaluation",
      icon: "📝"
    },
    {
      title: "All Certified Translation Services",
      href: "/certified-translation-services",
      description: "Professional certified translations for courts, schools, and businesses",
      icon: "✓"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Popular Translation Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional certified translations for USCIS, courts, universities, and employers.
            Flat $29/page with 24–48 hour delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 group border border-gray-100"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 text-accent font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
