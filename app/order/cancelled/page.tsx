"use client";

import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Button from "@/app/components/Button";

export default function OrderCancelledPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Cancelled Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 text-center">
          {/* Cancelled Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-4">
              <XCircle className="w-16 h-16 text-gray-400" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Order Cancelled
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your order was cancelled and no payment was charged. You can return to the order form to try again.
          </p>

          {/* Reasons Section */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h2 className="text-xl font-bold text-primary mb-6">Common Reasons for Cancellation</h2>

            <div className="space-y-4 text-left bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  Changed your mind about the order details
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  Need to update document or order information
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  Payment method issue or want to use a different card
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  Need more time to review the order details
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button href="/order/certified" variant="primary">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Order Form
            </Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-primary mb-2">Need Help?</h3>
                <p className="text-gray-700 mb-3">
                  If you're having trouble completing your order or have questions about our services, we're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:support@certifiedtranslatorpros.com"
                    className="text-accent hover:underline font-medium text-sm"
                  >
                    Email Support
                  </a>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <a
                    href="/faq"
                    className="text-accent hover:underline font-medium text-sm"
                  >
                    View FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your information is secure and has not been saved. Feel free to start a new order whenever you're ready.
          </p>
        </div>
      </div>
    </div>
  );
}
