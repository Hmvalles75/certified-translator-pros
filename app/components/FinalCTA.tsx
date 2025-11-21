import Button from "./Button";

export default function FinalCTA() {
  return (
    <section className="bg-primary text-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get your documents translated?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Join people who trust CertifiedTranslatorPros for fast, accurate, and USCIS-ready certified translations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/order/certified" variant="primary">
            Start Your Certified Translation
          </Button>
          <Button
            href="/find-a-translator"
            variant="outline"
            className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
          >
            Find a Local Translator
          </Button>
        </div>
      </div>
    </section>
  );
}
