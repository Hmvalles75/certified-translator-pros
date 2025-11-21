import Button from "./Button";
import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image with Navy Overlay - Behind Everything */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-image.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/60 to-primary/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Text Content */}
          <div className="text-white px-6 sm:px-8 lg:px-12 py-12">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-accent/20 border border-accent/40 text-accent px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                Certified Translation Services
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Certified translations you can actually trust.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              USCIS-ready, court-ready, and school-ready translations
              delivered in 24–48 hours by vetted human translators.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button href="/order/certified" variant="primary" className="text-lg px-8 py-4">
                Order Certified Translation
              </Button>
              <Button
                href="/find-a-translator"
                variant="outline"
                className="bg-white/10 border-white/50 text-white hover:bg-white/20 text-base"
              >
                Find a Local Translator
              </Button>
            </div>

            {/* Micro-trust line */}
            <p className="text-sm text-white/80 mb-8 flex flex-wrap items-center gap-2">
              <span className="font-medium">USCIS acceptance guarantee</span>
              <span className="text-white/40">•</span>
              <span>Secure payment via Stripe</span>
              <span className="text-white/40">•</span>
              <span>24–48 hour delivery</span>
            </p>

            {/* Trust Row */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>100+ languages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Human translators only</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>No hidden fees</span>
              </div>
            </div>
          </div>

          {/* Right Side: Pricing Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Certified Translation
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">$29.00</span>
                <span className="text-xl text-gray-600">/ page</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  USCIS, IRCC, legal, and academic acceptance guaranteed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Certified by vetted human translators (no AI)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Includes certification statement and translator signature
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Fast 24–48 hour turnaround available
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Secure upload and confidential handling
                </span>
              </li>
            </ul>

            <Button href="/order/certified" variant="primary" className="w-full">
              Get Started Now
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Need standard translation?{" "}
              <a href="#pricing" className="text-accent hover:underline font-medium">
                See pricing options
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
