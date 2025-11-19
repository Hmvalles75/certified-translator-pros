"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Upload, FileText } from "lucide-react";
import Button from "@/app/components/Button";

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese (Simplified)",
  "Chinese (Traditional)", "Japanese", "Korean", "Arabic", "Russian", "Hindi",
  "Vietnamese", "Tagalog", "Polish", "Turkish", "Dutch", "Swedish", "Greek",
  "Hebrew", "Thai", "Persian (Farsi)", "Ukrainian", "Romanian", "Czech",
  "Hungarian", "Danish", "Finnish", "Norwegian", "Urdu", "Bengali", "Punjabi",
  "Tamil", "Telugu", "Other"
];

const DOCUMENT_TYPES = [
  "Birth Certificate",
  "Marriage Certificate",
  "Divorce Decree",
  "Death Certificate",
  "Diploma/Transcript",
  "Driver's License",
  "Passport",
  "Police Certificate",
  "Medical Records",
  "Legal Document",
  "Business Document",
  "Immigration Document",
  "Other"
];

// Helper function to calculate price (centralized logic)
const calculatePrice = (pageCount: number, turnaround: string) => {
  const basePrice = 29.0;
  const rushMultiplier = turnaround === "rush" ? 1.5 : 1.0;
  return pageCount * basePrice * rushMultiplier;
};

export default function CertifiedOrderPage() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    source_language: "",
    target_language: "",
    document_type: "",
    page_count: 1,
    turnaround: "standard",
    notes: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isInspectingPDF, setIsInspectingPDF] = useState(false);
  const [pdfInfo, setPdfInfo] = useState<{
    pageCount: number;
    wordCount?: number;
  } | null>(null);

  // Calculate price in real-time
  const basePrice = 29.0;
  const totalPrice = calculatePrice(formData.page_count, formData.turnaround);
  const priceCents = Math.round(totalPrice * 100);

  // Smart language defaults: auto-fill English when one is selected
  const handleSourceLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSource = e.target.value;
    setFormData((prev) => ({
      ...prev,
      source_language: newSource,
      // If target is empty, default to English
      target_language: prev.target_language || (newSource ? "English" : ""),
    }));
  };

  const handleTargetLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTarget = e.target.value;
    setFormData((prev) => ({
      ...prev,
      target_language: newTarget,
      // If source is empty, default to English
      source_language: prev.source_language || (newTarget ? "English" : ""),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "page_count" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  // Inspect PDF and auto-fill page count
  const inspectPDF = async (file: File) => {
    setIsInspectingPDF(true);
    setUploadError("");
    setPdfInfo(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/file/inspect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to inspect PDF");
      }

      // Update page count and show PDF info
      setPdfInfo({
        pageCount: data.pageCount,
        wordCount: data.wordCount,
      });

      setFormData((prev) => ({
        ...prev,
        page_count: data.pageCount,
      }));
    } catch (err: any) {
      console.error("PDF inspection error:", err);
      setUploadError(
        err.message || "We couldn't read this file. Please enter the page count manually."
      );
    } finally {
      setIsInspectingPDF(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Reset previous PDF info and errors
      setPdfInfo(null);
      setUploadError("");

      // Auto-inspect if it's a PDF or DOCX
      const isPDF = selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf");
      const isDOCX =
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selectedFile.name.endsWith(".docx");

      if (isPDF || isDOCX) {
        await inspectPDF(selectedFile);
      } else {
        // For other file types, show a message that auto-detection is only for PDF and DOCX
        setUploadError("Auto-detection only works for PDF and DOCX files. Please enter the page count manually.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.customer_name || !formData.customer_email) {
      setError("Please fill in your name and email.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.source_language || !formData.target_language) {
      setError("Please select both source and target languages.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout/certified", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price_cents: priceCents,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Order Certified Translation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get USCIS-ready, court-approved certified translations delivered in 24-48 hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form - Left Side */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      required
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      required
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Translation Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">Translation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="source_language" className="block text-sm font-medium text-gray-700 mb-2">
                      Source Language *
                    </label>
                    <select
                      id="source_language"
                      name="source_language"
                      required
                      value={formData.source_language}
                      onChange={handleSourceLanguageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="target_language" className="block text-sm font-medium text-gray-700 mb-2">
                      Target Language *
                    </label>
                    <select
                      id="target_language"
                      name="target_language"
                      required
                      value={formData.target_language}
                      onChange={handleTargetLanguageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="document_type" className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type
                    </label>
                    <select
                      id="document_type"
                      name="document_type"
                      value={formData.document_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select type</option>
                      {DOCUMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="page_count" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Pages *
                    </label>
                    <input
                      type="number"
                      id="page_count"
                      name="page_count"
                      required
                      min="1"
                      value={formData.page_count}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Turnaround Time */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">Turnaround Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.turnaround === "standard"
                        ? "border-accent bg-accent/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="turnaround"
                      value="standard"
                      checked={formData.turnaround === "standard"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-primary">Standard</div>
                        <div className="text-sm text-gray-600">3-5 business days</div>
                        <div className="text-lg font-bold text-primary mt-2">$29/page</div>
                      </div>
                      {formData.turnaround === "standard" && (
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                      )}
                    </div>
                  </label>

                  <label
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.turnaround === "rush"
                        ? "border-accent bg-accent/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="turnaround"
                      value="rush"
                      checked={formData.turnaround === "rush"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-primary">Rush</div>
                        <div className="text-sm text-gray-600">24-48 hours</div>
                        <div className="text-lg font-bold text-primary mt-2">$43.50/page</div>
                      </div>
                      {formData.turnaround === "rush" && (
                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">Upload Document</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-accent transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-accent font-medium hover:underline">
                      Click to upload
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>

                  {/* File name display */}
                  {file && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
                      <FileText className="w-4 h-4" />
                      <span>{file.name}</span>
                    </div>
                  )}

                  {/* File inspection loading */}
                  {isInspectingPDF && (
                    <div className="mt-4 text-sm text-accent">
                      Analyzing document...
                    </div>
                  )}

                  {/* PDF info display */}
                  {pdfInfo && !isInspectingPDF && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        Detected: {pdfInfo.pageCount} page{pdfInfo.pageCount !== 1 ? "s" : ""}
                        {pdfInfo.wordCount && pdfInfo.wordCount > 0 && (
                          <span> (approx. {pdfInfo.wordCount.toLocaleString()} words)</span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Upload error display */}
                  {uploadError && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">{uploadError}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-8">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Any special instructions or requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white font-bold py-4 px-6 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>
          </div>

          {/* Price Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Base Price</span>
                  <span>${basePrice.toFixed(2)}/page</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Pages</span>
                  <span>{formData.page_count}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Turnaround</span>
                  <span className="capitalize">{formData.turnaround}</span>
                </div>
                {formData.turnaround === "rush" && (
                  <div className="flex justify-between text-accent font-medium">
                    <span>Rush Fee (1.5x)</span>
                    <span>+50%</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-bold text-primary">Total</span>
                  <span className="text-3xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">USD, one-time payment</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>USCIS acceptance guaranteed</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Certified by human translators</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Includes certification statement</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Secure and confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
