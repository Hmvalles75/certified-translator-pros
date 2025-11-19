import SectionContainer from "./SectionContainer";

export default function QualitySecurity() {
  const features = [
    {
      title: "Vetted human translators only",
      description: "Every translator is certified, background-checked, and proven in their language pairs. No AI, no shortcuts."
    },
    {
      title: "Confidential & secure handling",
      description: "Your documents are encrypted, stored securely, and handled with strict confidentiality protocols."
    },
    {
      title: "Format-accurate translations",
      description: "We preserve the original formatting, layout, and structure of your documents for seamless acceptance."
    },
    {
      title: "Free corrections until accepted",
      description: "If you need any adjustments or corrections, we'll make them at no additional cost until you're satisfied."
    }
  ];

  return (
    <SectionContainer background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Quality and security come first
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-background p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-primary mb-2 flex items-start gap-2">
              <span className="text-accent text-xl">✓</span>
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
