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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Certified Translation Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-accent p-8 lg:p-10 relative">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-md">
                Most Popular
              </span>
            </div>

            <div className="mb-6 pt-4">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Certified Translation
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-primary">$29.00</span>
                <span className="text-xl text-gray-600">/ page</span>
              </div>
              <p className="text-gray-600">
                For official documents requiring certification (USCIS, courts, schools)
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
                  Translated by vetted human professionals
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
            </ul>

            <Button href="/order/certified" variant="primary" className="w-full">
              Order Certified Translation
            </Button>
          </div>

          {/* Standard Translation Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Standard Translation
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-primary">$0.12</span>
                <span className="text-xl text-gray-600">/ word</span>
              </div>
              <p className="text-gray-600">
                For business documents, websites, and general content
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Professional human translation (no AI)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Perfect for business and personal use
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Quality-checked for accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Fast turnaround times</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Secure and confidential handling
                </span>
              </li>
            </ul>

            <Button href="/order" variant="outline" className="w-full">
              Order Standard Translation
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
