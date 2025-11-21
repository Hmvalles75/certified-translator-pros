import { CheckCircle2 } from "lucide-react";
import Button from "./Button";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the service that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          {/* Certified Translation Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-accent p-8 lg:p-10 relative">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-md">
                USCIS-Ready Certified Translation
              </span>
            </div>

            <div className="mb-6 pt-4 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Flat Rate Pricing
              </h3>
              <div className="flex items-baseline gap-2 mb-4 justify-center">
                <span className="text-5xl font-bold text-primary">$29.00</span>
                <span className="text-xl text-gray-600">/ page</span>
              </div>
              <p className="text-gray-600">
                Up to 250 words per page. For official documents requiring certification (USCIS, courts, schools)
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  USCIS, IRCC, legal, and academic acceptance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Official certification statement and signature
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Translated by vetted human professionals (no AI)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  24–48 hour turnaround available
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">100% acceptance guarantee</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  No hidden fees, no confusing word counts
                </span>
              </li>
            </ul>

            <Button href="/order/certified" variant="primary" className="w-full">
              Order Certified Translation
            </Button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need help choosing?{" "}
            <a href="#faq" className="text-accent hover:underline font-medium">
              Check our FAQ
            </a>{" "}
            or{" "}
            <a href="/find-a-translator" className="text-accent hover:underline font-medium">
              find a local translator
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
